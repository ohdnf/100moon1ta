from rest_framework import serializers
from users.models import CustomUser


# 보내는 값 변경
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'email','username','profile_image', 'comment']


from rest_auth.serializers import LoginSerializer as RestAuthLoginSerializer

class LoginSerializer(RestAuthLoginSerializer):
    username = None


# from rest_auth.registration.serializers import RegisterSerializer
# from allauth.account import app_settings as allauth_settings
# class SignupSerializer(RegisterSerializer):
#     username = None
#     ncikname = serializers.CharField(
#         max_length=100,
#         required=allauth_settings.USERNAME_REQUIRED
#     )
    