from rest_framework import serializers
from .models import Tag, Source
from users.serializers import UserSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('content', )


class SourceSerializer(serializers.ModelSerializer):
    likers = serializers.UserSerializer(many=True, required=False)
    subscribers = serializers.UserSerializer(many=True, required=False)
    tags = serializers.TagSerializer(many=True)

    class Meta:
        model = Source
        fields = ('id', 'category','length', 'difficulty', 'likers', 'subscribers')
