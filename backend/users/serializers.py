from rest_framework import serializers
from users.models import CustomUser
from rest_auth.serializers import LoginSerializer as RestAuthLoginSerializer

# 보내는 값 변경
class UserSerializer(serializers.ModelSerializer):
    record = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id', 'email','username','profile_image', 'comment', 'record']
        read_only_fields = ('email', )
    def get_record(self, obj):
        return 0


class LoginSerializer(RestAuthLoginSerializer):
    username = None

