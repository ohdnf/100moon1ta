from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


urlpatterns = [
    path('', views.source_retrieve_create),
    path('today/', views.random_source),
    path('<int:pk>/', views.source_detail_update_destroy),
    path('history/', views.history_retrieve),
    path('<int:pk>/history/', views.history_create),
]

urlpatterns = format_suffix_patterns(urlpatterns)
