from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from allauth.socialaccount.providers.github import views as github_views
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.urls import reverse
from rest_auth.registration.views import SocialLoginView

from games.models import GameHistory, Source
from django.contrib.auth import get_user_model
from django.db.models import Sum

from .serializers import UserListSerializer, BookmarkSerializer

from django.views.decorators.cache import never_cache, cache_page
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.core.cache import cache
from django.conf import settings

from allauth.socialaccount.helpers import complete_social_login
from allauth.account.adapter import get_adapter
# from django.http import HttpResponseRedirect, JsonResponse
# from rest_framework.request import Request as rest_request
from django.http import HttpResponse, HttpResponseRedirect
from allauth.socialaccount.providers.oauth2.views import OAuth2View, OAuth2LoginView, OAuth2Adapter, OAuth2CallbackView

import requests
from decouple import config


CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)


class Nickname(APIView):
    def get(self, request, nickname):
        User = get_user_model()
        if nickname:
            return Response({"possible" : not User.objects.filter(username=nickname).exists()})


class UserList(APIView):
    permission_classes = [IsAdminUser]
    @never_cache
    def get(self, request):
        User = get_user_model()
        users = User.objects.prefetch_related('emailaddress_set')
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data, status=200)


class Record(APIView):
    def get(self, request):
        total_point = GameHistory.objects.filter(user=request.user).aggregate(Sum('points'))
        if total_point['points__sum']:
            return Response({"총점" : total_point})
        else:
            return Response('플레이한 게임이 없습니다.', status=404)


# login으로 redirect 시킴, login_url='/example url you want redirect/' 로 지정가능
class Bookmark(APIView):
    permission_classes = [IsAuthenticated] # 이걸로 login 판별
    @never_cache
    def get(self, request):
        user = request.user
        bookmark = user.subscribed_source
        serializer = BookmarkSerializer(bookmark, many=True)
        return Response(serializer.data, status=200) 

    def post(self, request):
        sid = request.data.get('source_id')
        user = request.user
        source = get_object_or_404(Source, pk=sid)
        if source.subscribers.filter(pk=user.pk).exists():
            source.subscribers.remove(user)
            bookmark_status = False
        else:
            source.subscribers.add(user)
            bookmark_status = True
        return Response({"sources" : bookmark_status}, status=200)


class Like(APIView):
    def post(self,request):
        sid = request.data.get('source_id')
        user = request.user
        source = get_object_or_404(Source, pk=sid)
        if source.likers.filter(pk=user.pk).exists():
            source.likers.remove(user)
            like_status = "좋아요 취소"
        else:
            source.likers.add(user)
            like_status = "좋아요!"
        return Response({"sources" : like_status})   

# 권한 세부화
class StaffManagement(APIView):
    def patch(self, request, uid):
        User = get_user_model()
        if request.user.is_superuser:
            staff = User.objects.get(pk=uid)
            staff.is_staff = not staff.is_staff
            staff.save()
            return  Response(status=200)
        return Response(status=403)


# 권한 세부화
class BanManagement(APIView):
    def patch(self, request, uid):
        User = get_user_model()
        if request.user.is_staff:
            ban = User.objects.get(pk=uid)
            if not ban.is_staff:
                ban.is_ban = not ban.is_ban
                ban.save()
            else:
                return Response(status=200)
        return  Response(status=403)



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

        complete_social_login(request, login)
        
        redirect_url = config('EMAIL_REDIRECT_URL')
        return HttpResponseRedirect(f'{redirect_url}/login-complete/?access_token={token}')
        
class GitHubLogin(SocialLoginView):
    
    adapter_class = github_views.GitHubOAuth2Adapter
    client_class = OAuth2Client

GitHubCallback = CustomOAuth2CallbackView.adapter_view(github_views.GitHubOAuth2Adapter)
