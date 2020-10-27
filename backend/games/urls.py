from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'games'
urlpatterns = [
    path('', views.SourceList.as_view()),
    path('<int:pk>/', views.SourceDetail.as_view()),
    path('tags/', views.TagList.as_view()),
    path('tags/<int:pk>/', views.TagDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)