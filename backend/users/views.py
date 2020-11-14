from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser # get_user_model?

from allauth.socialaccount.providers.github import views as github_views
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

from django.urls import reverse
from rest_auth.registration.views import SocialLoginView

import requests
from django.http import HttpResponse
from allauth.socialaccount.providers.oauth2.views import OAuth2View,OAuth2LoginView, OAuth2Adapter, OAuth2CallbackView
from allauth.socialaccount.providers.github.views import oauth2_login
from allauth.utils import build_absolute_uri
# Create your views here.
# from allauth.socialaccount.helpers import complete_social_login

from .helpers import complete_social_login
from allauth.account.adapter import get_adapter
from django.http import HttpResponseRedirect, JsonResponse
from rest_framework.request import Request as rest_request
from django.http.request import HttpRequest
# from allauth.account.
class Nickname(APIView):
    def get(self, request):
        nickname = request.GET.get('nickname',0)
        if nickname:
            return Response({"duplicate" : CustomUser.objects.filter(username=nickname).exists()})





class CustomOAuth2CallbackView(OAuth2CallbackView):

    def dispatch(self, request, *args, **kwargs):
        # ?code 가 없을경우의 에러처리
        # if "error" in request.GET or "code" not in request.GET:
        #     # Distinguish cancel from error
        #     auth_error = request.GET.get("error", None)
        #     if auth_error == self.adapter.login_cancelled_error:
        #         error = AuthError.CANCELLED
        #     else:
        #         error = AuthError.UNKNOWN
        #     return render_authentication_error(
        #         request, self.adapter.provider_id, error=error
        #     )
        app = self.adapter.get_provider().get_app(self.request)
        client = self.get_client(self.request, app)

        # access_token = client.get_access_token(request.GET["code"])
        access_token = self.adapter.get_access_token_data(request, app, client)
        token = self.adapter.parse_token(access_token)
        token.app = app
        login = self.adapter.complete_login(
            request, app, token, response=access_token
        )
        login.token = token

        return complete_social_login(request, login)
        

class GitHubTest(SocialLoginView):
    
    adapter_class = github_views.GitHubOAuth2Adapter
    client_class = OAuth2Client

GitHubCallback = CustomOAuth2CallbackView.adapter_view(github_views.GitHubOAuth2Adapter)