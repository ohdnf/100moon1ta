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

from .serializers import UserListSerializer

from django.views.decorators.cache import never_cache

# Create your views here.

class Nickname(APIView):
    def get(self, request, nickname):
        # nickname = request.GET.get('nickname',0)
        User = get_user_model()
        if nickname:
            return Response({"possible" : not User.objects.filter(username=nickname).exists()})   
        # else:
        #     return Res

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

    def get(self, request):
        user = request.user
        bookmark = user.subscribed_source
        return Response({"sources" : bookmark.values()})  
   
    def post(self, request):
        sid = request.data.get('source_id')
        user = request.user
        source = get_object_or_404(Source, pk=sid)
        if source.subscribers.filter(pk=user.pk).exists():
            source.subscribers.remove(user)
            bookmark_status = "북마크 취소"
        else:
            source.subscribers.add(user)
            bookmark_status = "북마크됨"
        return Response({"sources" : bookmark_status})   

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

class GitHubLogin(SocialLoginView):
    adapter_class = github_views.GitHubOAuth2Adapter
    client_class = OAuth2Client

    @property
    def callback_url(self):
        # use the same callback url as defined in your GitHub app, this url
        # must be absolute:
        return self.request.build_absolute_uri(reverse('github_callback'))

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
            if not ban.is_staff: # user만 밴가능
                ban.is_ban = not ban.is_ban
                ban.save()
            else:
                return Response(status=200)
        return  Response(status=403)