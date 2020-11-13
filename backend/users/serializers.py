from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_auth.serializers import LoginSerializer as RestAuthLoginSerializer
from games.models import Source
# 보내는 값 변경
class UserSerializer(serializers.ModelSerializer):
    record = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = ['id', 'email','username','profile_image', 'comment', 'record', 'is_superuser', 'is_staff']
        read_only_fields = ('email', )
    def get_record(self, obj):
        return 0


class LoginSerializer(RestAuthLoginSerializer):
    username = None

class UserListSerializer(serializers.ModelSerializer):
    emailaddress_set = serializers.SlugRelatedField(read_only=True, many=True, slug_field='verified')
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'username', 'is_staff', 'is_ban', 'emailaddress_set' ]

class BookmarkSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(read_only=True, many=True, slug_field='content')
    class Meta:
        model = Source
        fields = ('id', 'title', 'description', 'link', 'category', 'content', 'length', 'difficulty', 'tags',)