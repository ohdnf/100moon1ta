from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.shortcuts import render,redirect
from django.urls import reverse
from allauth.account.adapter import get_adapter as get_account_adapter
class SocialAccountAdapter(DefaultSocialAccountAdapter):
     
    def save_user(self, request, sociallogin, form=None):
        u = sociallogin.user
        u.set_unusable_password()
        if form:
            get_account_adapter().save_user(request, u, form)
        else:
            get_account_adapter().populate_username(request, u)
        sociallogin.save(request)
        return redirect('http://localhost:8000/')