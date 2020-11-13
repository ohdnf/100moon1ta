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
from allauth.socialaccount.helpers import complete_social_login

from .helpers import complete_social_login
from allauth.account.adapter import get_adapter
from django.http import HttpResponseRedirect, JsonResponse
from rest_framework.request import Request as rest_request
from django.http.request import HttpRequest
class Nickname(APIView):
    def get(self, request):
        nickname = request.GET.get('nickname',0)
        if nickname:
            return Response({"duplicate" : CustomUser.objects.filter(username=nickname).exists()})

class CustomGitHubAdapter(github_views.GitHubOAuth2Adapter):
    
    pass

# class CustomOAuth2LoginView(OAuth2LoginView):
#     # a = 100
#     def get_client(self, request, app):
#         callback_url = 'http://localhost:8000/api/rest-auth/social/callback/'
#         provider = self.adapter.get_provider()
#         scope = provider.get_scope(request)
#         client = self.adapter.client_class(
#             self.request,
#             app.client_id,
#             app.secret,
#             self.adapter.access_token_method,
#             self.adapter.access_token_url,
#             callback_url,
#             scope,
#             scope_delimiter=self.adapter.scope_delimiter,
#             headers=self.adapter.headers,
#             basic_auth=self.adapter.basic_auth,
#         )
#         return client




class CustomOAuth2CallbackView(OAuth2CallbackView):
    # pass
    def dispatch(self, request, *args, **kwargs):
        print(request)
        
        app = self.adapter.get_provider().get_app(self.request)
        client = self.get_client(self.request, app)
        access_token = client.get_access_token(request.GET["code"])
        token = self.adapter.parse_token(access_token)
        token.app = app
        login = self.adapter.complete_login(
            request, app, token, response=access_token
        )
        login.token = token
        # print(login)
        # print(dir(login))
        return complete_social_login(request, login)
        # return HttpResponseRedirect('http://localhost:8000/api/rest-auth/social/test/')
        # request = Request(method='post',data={'access_token':token})
        
        # request = rest_request(HttpRequest())
        # request.data={'access_token':token}
        # a =GitHubTest()
        # return token


        # SocialLoginView.process_login()
        # def process_login(self):
        #     get_adapter(self.request).login(self.request, self.user)
    
    #     if self.adapter.supports_state:
    #         login.state = SocialLogin.verify_and_unstash_state(
    #             request, get_request_param(request, "state")
    #         )
    #     else:
    #         login.state = SocialLogin.unstash_state(request)
    #     print(access_token, login.token)
    #     return complete_social_login(request, login)
# GitHubLogin = CustomOAuth2LoginView.adapter_view(github_views.GitHubOAuth2Adapter)

    # @property
    # def callback_url(self):
    #     # use the same callback url as defined in your GitHub app, this url
    #     # must be absolute:
    #     return self.request.build_absolute_uri(reverse('github_callback'))

    # def get(self, request):
    #     print(request.GET.get('code'))
    #     return HttpResponse(status=200)





# print(CustomOAuth2LoginView)






# SocialLoginView

class GitHubTest(SocialLoginView):
    
    adapter_class = github_views.GitHubOAuth2Adapter
    client_class = OAuth2Client
    # print('a')
    
     

    # def dispatch(self, request, *args, **kwargs):
    #     print(request)
        
    #     app = self.adapter.get_provider().get_app(self.request)
    #     client = self.get_client(self.request, app)
    #     access_token = client.get_access_token(request.GET["code"])
    #     token = self.adapter.parse_token(access_token)
    #     token.app = app
    #     login = self.adapter.complete_login(
    #         request, app, token, response=access_token
    #     )
    #     login.token = token
    #     # print(login)
    #     # print(dir(login))
    #     complete_social_login(request, login)
    #     # return HttpResponseRedirect('http://localhost:8000/api/rest-auth/social/test/')
    #     # request = Request(method='post',data={'access_token':token})
    #     print(1)
    #     request = rest_request(HttpRequest())
    #     # request.data={'access_token':token}
    #     a =GitHubTest()
    #     return token

    #     res=requests.post('http://localhost:8000/api/rest-auth/social/',data={'access_toekn':['asdasdf']})
    #     print(res)

    # callback_url = 'http://localhost:8000/api/rest-auth/social/asdf'

    # def post(self, request, *args, **kwargs):
    #     print('self',self)
    #     # HttpRequest()
    #     request = rest_request(HttpRequest())
    #     # a =rest_request(request)
    #     # print(a)
    #     self.request = request
    #     self.serializer = self.get_serializer(data=self.request.data,
    #                                           context={'request': request})
    #     self.serializer.is_valid(raise_exception=True)

    #     # self.login()

    #     return self.get_response()
    
    # def get(self,request):
    #     return JsonResponse( self.dispatch(request=request))

GitHubLogin = OAuth2LoginView.adapter_view(CustomGitHubAdapter)
GitHubCallback = CustomOAuth2CallbackView.adapter_view(CustomGitHubAdapter)