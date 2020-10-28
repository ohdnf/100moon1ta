from django.urls import path, include
from .views import StaffManagement, BanManagement, Nickname, GitHubLogin

urlpatterns = [
    path('', include("rest_auth.urls")),
    path('signup/', include('rest_auth.registration.urls')),
    path('nickname-duplicated/<str:nickname>/', Nickname.as_view()),
    path('social/', GitHubLogin.as_view() ),
    path('all-auth/', include('allauth.urls')),
    path('mng/staff/<int:uid>/',StaffManagement.as_view()),
    path('mng/ban/<int:uid>/', BanManagement.as_view()),

]