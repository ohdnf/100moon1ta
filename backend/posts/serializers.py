from rest_framework import serializers
from users.serializers import UserSerializer
from .models import Post, PostComment, Tag


# class PostListSerializer(serializers.ModelSerializer):
class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    tag = TagSerializer(many=True, required=False)

    class Meta:
        model = Post
        fields = '__all__'
        fields = ('id', 'title', 'content', 'created_at', 'user')


class PostCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    post = PostSerializer()

    class Meta:
        model = PostComment
        fields = ('id', 'content', 'created_at', 'user', 'post')


class TagSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True, required=False)

    class Meta:
        model = Tag
        fields = ('id', 'name', 'posts')
