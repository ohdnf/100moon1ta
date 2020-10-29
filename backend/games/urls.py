from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
# from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path('', views.source_retrieve_create),
    path('<int:pk>/', views.source_detail_create_update_destroy),
    # path('<int:pk>/tags/', views.source_tag_retrieve),
    # path('<int:src_pk>/tags/<int:tag_pk>/', views.source_tag_create_destroy),
]

urlpatterns = format_suffix_patterns(urlpatterns)
