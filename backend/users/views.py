from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser # get_user_model?
# Create your views here.

class Username(APIView):
    def get(self, request):
        username = request.GET.get('username',0)
        if username:
            return Response({"duplicate" : CustomUser.objects.filter(username=username).exists()})
    
 