from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser # get_user_model?

from allauth.socialaccount.providers.github import views as github_views
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.urls import reverse
from rest_auth.registration.views import SocialLoginView
# Create your views here.

class Username(APIView):
    def get(self, request):
        username = request.GET.get('username',0)
        if username:
            return Response({"duplicate" : CustomUser.objects.filter(username=username).exists()})
    
class GitHubLogin(SocialLoginView):
    adapter_class = github_views.GitHubOAuth2Adapter
    client_class = OAuth2Client

    @property
    def callback_url(self):
        # use the same callback url as defined in your GitHub app, this url
        # must be absolute:
        return self.request.build_absolute_uri(reverse('github_callback'))