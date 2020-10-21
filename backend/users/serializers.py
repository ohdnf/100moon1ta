from rest_framework import serializers
from users.models import CustomUser


# 보내는 값 변경
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'email','username','profile_image']


from rest_auth.serializers import LoginSerializer as RestAuthLoginSerializer

class LoginSerializer(RestAuthLoginSerializer):
    username = None