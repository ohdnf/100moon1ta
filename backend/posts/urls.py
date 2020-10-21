from django.urls import path
from . import views


app_name = 'posts'

urlpatterns = [
    path('', views.post_retrieve_create),
    path('<int:pk>/', views.post_detail_update_destroy),
    path('<int:pk>/comments/', views.comment_retrieve_create),
    path('<int:post_pk>/comments/<int:comment_pk>', views.comment_update_destroy),
    path('<int:pk>/tags/', views.tag_retrieve_create),
    path('<int:post_pk>/tags/<int:tag_id>/', views.tag_update_delete),
]
