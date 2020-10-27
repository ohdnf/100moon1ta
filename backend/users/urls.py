from django.urls import path
from .views import StaffManagement, BanManagement
urlpatterns = [
    path('mng/staff/<int:uid>/',StaffManagement.as_view()),
    path('mng/ban/<int:uid>/', BanManagement.as_view()),

]