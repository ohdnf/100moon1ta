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
from users.views import Nickname, GitHubLogin
from games.views import tag_retrieve_create, tag_update_destroy, rank_retrieve

import debug_toolbar

from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/games/', include('games.urls')),
    path('api/v1/tags/', tag_retrieve_create),
    path('api/v1/tags/<int:pk>/', tag_update_destroy),
    path('api/v1/rank/', rank_retrieve),

    path('api/v1/rest-auth/', include("rest_auth.urls")),
    path('api/v1/rest-auth/nickname-duplicated/', Nickname.as_view()),
    path('api/v1/rest-auth/signup/', include('rest_auth.registration.urls')),
    path('api/v1/rest-auth/social/', GitHubLogin.as_view()),
    
    path('accounts/', include('allauth.urls')),
    # path('api-auth/', include('rest_framework.urls')),
    path('__debug__/', include(debug_toolbar.urls)),
    path('api/v1/accounts/', include("users.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # 개발자용에서만
# swagger_setting
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