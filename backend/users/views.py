from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser # get_user_model?

from allauth.socialaccount.providers.github import views as github_views
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.urls import reverse
from rest_auth.registration.views import SocialLoginView

# Create your views here.

class Nickname(APIView):
    def get(self, request, nickname):
        # nickname = request.GET.get('nickname',0)
        if nickname:
            return Response({"possible" : not CustomUser.objects.filter(username=nickname).exists()})
        # else:
        #     return Res

     
class GitHubLogin(SocialLoginView):
    adapter_class = github_views.GitHubOAuth2Adapter
    client_class = OAuth2Client

    @property
    def callback_url(self):
        # use the same callback url as defined in your GitHub app, this url
        # must be absolute:
        return self.request.build_absolute_uri(reverse('github_callback'))


class StaffManagement(APIView):
    def patch(self, request, uid):
        if request.user.is_superuser:
            staff = CustomUser.objects.get(pk=uid)
            staff.is_staff = not staff.is_staff
            staff.save()
        return  Response({"possible" : request.user.is_superuser })

class BanManagement(APIView):
    def patch(self, request, uid):
        if request.user.is_staff:
            ban = CustomUser.objects.get(pk=uid)
            if not ban.is_staff: # user만 밴가능
                ban.is_ban = not ban.is_ban
                ban.save()
            else:
                return Response({"possible" : not ban.is_staff })
        return  Response({"possible" : request.user.is_staff })