from django.conf import settings
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import Post, PostComment, Tag
from .serializers import PostSerializer, PostCommentSerializer, TagSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(['GET', 'POST'])
def post_retrieve_create(request):

    def post_retrieve(request):
        posts = Post.objects.order_by('-pk')
        # 여기에 정렬 방식 구현
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @permission_classes([IsAuthenticated])
    def post_create(request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    if request.method == 'GET':
        return post_retrieve(request)
    elif request.method == 'POST':
        return post_create(request)

@api_view(['GET', 'PUT', 'DELETE'])
def post_detail_update_destroy(request, pk):
    post = get_object_or_404(Post, pk=pk)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.user == post.user:
        if request.method == 'PUT':
            serializer = PostSerializer(data=request.data, instance=post)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'POST'])
def comment_retrieve_create(request, pk):
    post = get_object_or_404(Post, pk=pk)

    def comment_retrieve(request, pk):
        comments = PostComment.objects.filter(post_id=pk)
        serializer = PostCommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @permission_classes([IsAuthenticated])
    def comment_create(request, pk):
        serializer = PostCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    if request.method == 'GET':
        return comment_retrieve(request, pk)
    elif request.method == 'POST':
        return comment_create(request, pk)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def comment_update_destroy(request, post_pk, comment_pk):
    comment = get_object_or_404(PostComment, pk=comment_pk, post_id=post_pk)

    if request.user == comment.user:
        if request.method == 'PUT':
            serializer = PostCommentSerializer(comment, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'POST'])
def tag_retrieve_create(request, pk):
    return

@api_view(['PUT', 'DELETE'])
def tag_update_delete(request, post_pk, tag_pk):
    return