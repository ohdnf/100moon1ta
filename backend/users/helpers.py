from django.contrib import messages
from django.forms import ValidationError
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse

from allauth.account import app_settings as account_settings
from allauth.account.adapter import get_adapter as get_account_adapter
from allauth.account.utils import complete_signup, user_username
from allauth.exceptions import ImmediateHttpResponse

from allauth.socialaccount import app_settings, signals
from allauth.socialaccount.adapter import get_adapter
from allauth.socialaccount.models import SocialLogin
from allauth.socialaccount.providers.base import AuthError, AuthProcess

import requests
from rest_auth.registration.views import SocialLoginView

def perform_login(
    request,
    user,
    email_verification,
    sociallogin=None,
    signal_kwargs=None,
    signup=False,
    email=None,
):
    """
    Keyword arguments:

    signup -- Indicates whether or not sending the
    email is essential (during signup), or if it can be skipped (e.g. in
    case email verification is optional and we are only logging in).
    """
    # Local users are stopped due to form validation checking
    # is_active, yet, adapter methods could toy with is_active in a
    # `user_signed_up` signal. Furthermore, social users should be
    # stopped anyway.
    adapter = get_account_adapter(request)
    if not user.is_active:
        return adapter.respond_user_inactive(request, user)

    # if email_verification == EmailVerificationMethod.NONE:
    #     pass
    # elif email_verification == EmailVerificationMethod.OPTIONAL:
    #     # In case of OPTIONAL verification: send on signup.
    #     if not _has_verified_for_login(user, email) and signup:
    #         send_email_confirmation(request, user, signup=signup, email=email)
    # elif email_verification == EmailVerificationMethod.MANDATORY:
    #     if not _has_verified_for_login(user, email):
    #         send_email_confirmation(request, user, signup=signup, email=email)
    #         return adapter.respond_email_verification_sent(request, user)
    try:
        adapter.login(request, user)
        # response = HttpResponse(sociallogin.token) # 여기에 시리얼 어쩌구
        response = HttpResponse(requests.post('http://localhost:8000/api/rest-auth/social/test/',data={'access_token':sociallogin.token}))
        
    
        # if signal_kwargs is None:
        #     signal_kwargs = {}
        # signals.user_logged_in.send(
        #     sender=user.__class__,
        #     request=request,
        #     response=response,
        #     user=user,
        #     **signal_kwargs,
        # )
        # adapter.add_message(
        #     request,
        #     messages.SUCCESS,
        #     "account/messages/logged_in.txt",
        #     {"user": user},
        # )
    except ImmediateHttpResponse as e:
        response = e.response
    return response


def _process_signup(request, sociallogin):
    auto_signup = get_adapter(request).is_auto_signup_allowed(request, sociallogin)
    if not auto_signup: # 내가 custom에서 중복이 발생 auto signup이 안되었음
        print(6)
        request.session["socialaccount_sociallogin"] = sociallogin.serialize()
        url = reverse("socialaccount_signup")
        ret = HttpResponseRedirect(url)
    else:
        print(7) # 여기는 처음 회원가입을 진행할 시, 일단 회원가입을 시키고 complete_social_signup으로 다시 보냄
        # Ok, auto signup it is, at least the e-mail address is ok.
        # We still need to check the username though...
        if account_settings.USER_MODEL_USERNAME_FIELD:
            username = user_username(sociallogin.user)
            try:
                get_account_adapter(request).clean_username(username)
            except ValidationError:
                # This username is no good ...
                user_username(sociallogin.user, "")
        # FIXME: This part contains a lot of duplication of logic
        # ("closed" rendering, create user, send email, in active
        # etc..)
        if not get_adapter(request).is_open_for_signup(request, sociallogin):
            return render(
                request,
                "account/signup_closed." + account_settings.TEMPLATE_EXTENSION,
            )
        get_adapter(request).save_user(request, sociallogin, form=None)
        
        # ret = complete_social_signup(request, sociallogin) # HttpResponse임 
        # response = HttpResponse(requests.post('http://localhost:8000/api/rest-auth/social/test/',data={'access_token':sociallogin.token}))
        ret = HttpResponseRedirect('http://localhost:8000/admin/')
    return ret


def _login_social_account(request, sociallogin):
    return perform_login(
        request,
        sociallogin.user,
        email_verification=app_settings.EMAIL_VERIFICATION,
        # redirect_url=sociallogin.get_redirect_url(request),
        sociallogin=sociallogin,
        signal_kwargs={"sociallogin": sociallogin},
    )


def render_authentication_error(
    request,
    provider_id,
    error=AuthError.UNKNOWN,
    exception=None,
    extra_context=None,
):
    try:
        if extra_context is None:
            extra_context = {}
        get_adapter(request).authentication_error(
            request,
            provider_id,
            error=error,
            exception=exception,
            extra_context=extra_context,
        )
    except ImmediateHttpResponse as e:
        return e.response
    if error == AuthError.CANCELLED:
        return HttpResponseRedirect(reverse("socialaccount_login_cancelled"))
    context = {
        "auth_error": {
            "provider": provider_id,
            "code": error,
            "exception": exception,
        }
    }
    context.update(extra_context)
    return render(
        request,
        "socialaccount/authentication_error." + account_settings.TEMPLATE_EXTENSION,
        context,
    )


def _add_social_account(request, sociallogin):
    if request.user.is_anonymous:
        # This should not happen. Simply redirect to the connections
        # view (which has a login required)
        return HttpResponseRedirect(reverse("socialaccount_connections"))
    level = messages.INFO
    message = "socialaccount/messages/account_connected.txt"
    action = None
    if sociallogin.is_existing:
        if sociallogin.user != request.user:
            # Social account of other user. For now, this scenario
            # is not supported. Issue is that one cannot simply
            # remove the social account from the other user, as
            # that may render the account unusable.
            level = messages.ERROR
            message = "socialaccount/messages/account_connected_other.txt"
        else:
            # This account is already connected -- we give the opportunity
            # for customized behaviour through use of a signal.
            action = "updated"
            message = "socialaccount/messages/account_connected_updated.txt"
            signals.social_account_updated.send(
                sender=SocialLogin, request=request, sociallogin=sociallogin
            )
    else:
        # New account, let's connect
        action = "added"
        sociallogin.connect(request, request.user)
        signals.social_account_added.send(
            sender=SocialLogin, request=request, sociallogin=sociallogin
        )
    default_next = get_adapter(request).get_connect_redirect_url(
        request, sociallogin.account
    )
    next_url = sociallogin.get_redirect_url(request) or default_next
    get_account_adapter(request).add_message(
        request,
        level,
        message,
        message_context={"sociallogin": sociallogin, "action": action},
    )
    return HttpResponseRedirect('http://localhost:8000/admin/')


def complete_social_login(request, sociallogin): # sociallogin.token
    assert not sociallogin.is_existing
    
    sociallogin.lookup()
    print(sociallogin.token)
    try:
        get_adapter(request).pre_social_login(request, sociallogin)
        signals.pre_social_login.send(
            sender=SocialLogin, request=request, sociallogin=sociallogin
        )
        process = sociallogin.state.get("process")
        if process == AuthProcess.REDIRECT:
            print(1)
            return _social_login_redirect(request, sociallogin)
        elif process == AuthProcess.CONNECT:
            print(2)
            return _add_social_account(request, sociallogin)
        else:
            print(3)
            return _complete_social_login(request, sociallogin)
    except ImmediateHttpResponse as e:
        return e.response


def _social_login_redirect(request, sociallogin):
    next_url = sociallogin.get_redirect_url(request) or "/"
    return HttpResponseRedirect('http://localhost:8000/admin/')


def _complete_social_login(request, sociallogin):
    if request.user.is_authenticated:
        get_account_adapter(request).logout(request)

    if sociallogin.is_existing:
        print(4)
        # Login existing user
        ret = _login_social_account(request, sociallogin)
        signals.social_account_updated.send(
            sender=SocialLogin, request=request, sociallogin=sociallogin
        )
    else:
        # New social user
        print(5)
        ret = _process_signup(request, sociallogin)
    return ret


def complete_social_signup(request, sociallogin):
    return complete_signup(
        request,
        sociallogin.user,
        app_settings.EMAIL_VERIFICATION,
        sociallogin.get_redirect_url(request),  # 이걸 바꾸면 됨
        signal_kwargs={"sociallogin": sociallogin},
    )


# TODO: Factor out callable importing functionality
# See: account.utils.user_display
def import_path(path):
    modname, _, attr = path.rpartition(".")
    m = __import__(modname, fromlist=[attr])
    return getattr(m, attr)
