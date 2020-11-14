"""l00moon1ta URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from rest_framework import  permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from users.views import Nickname, GitHubCallback, CustomOAuth2CallbackView, GitHubTest

urlpatterns = [
    path('admin/', admin.site.urls),
    path('posts/', include('posts.urls')),
    path('api/rest-auth/', include("rest_auth.urls")),
    path('api/rest-auth/nickname-duplicated/', Nickname.as_view()),
    path('api/rest-auth/signup/', include('rest_auth.registration.urls')),
    # path('api/v1/accounts/all-auth/github/login/', GitHubLogin ),
    path('api/v1/accounts/all-auth/github/login/callback/', GitHubCallback ),
    # path('accounts/github/login/',GitHubLogin),
    path('api/v1/accounts/all-auth/', include('allauth.urls')), # 이메일 발송에 사용됨
    path('api/rest-auth/social/test/',GitHubTest.as_view()),
]

# swagger setting
schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

if settings.DEBUG:
    urlpatterns += [
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
        re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')
    ]