from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Tag, Source, GameHistory
from .serializers import TagSerializer, SourceSerializer, GameHistorySerializer


@api_view(['GET', 'POST'])
def source_retrieve_create(request):
    def source_retrieve(requets):
        """
        타자 연습 소스 목록 보기
        """
        sources = Source.objects.all()
        # 추후 정렬 방식 구현
        serializer = SourceSerializer(sources, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def source_create(request):
        """
        타자 연습 소스 등록
        관리자 계정만 허용
        """
        if request.user.is_staff or request.user.is_superuser:
            serializer = SourceSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        return source_retrieve(request)
    elif request.method == 'POST':
        return source_create(request)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def source_detail_create_update_destroy(request, pk):
    source = get_object_or_404(Source, pk=pk)

    def source_detail(request):
        """
        타자 연습 소스 상세 정보 보기
        타자 연습은 누구나 허용
        """
        serializer = SourceSerializer(source)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @permission_classes([IsAuthenticated])
    def game_history_create(request):
        """
        게임 결과 등록하기
        게임 결과 정보는 클라이언트에서 request.body.data로 받는다.
        """
        # 기존 게임 기록이 있으면
        if GameHistory.objects.filter(user=request.user, source=source).exists():
            history = GameHistory.objects.get(user=request.user, source=source)
            serializer = GameHistorySerializer(data=request.data, instance=history) # 업데이트
        else:
            serializer = GameHistorySerializer(data=request.data)   # 신규 생성
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @permission_classes([IsAuthenticated])
    def source_update(request):
        """
        타자 연습 소스 수정
        관리자 계정만 허용
        """
        if request.user.is_staff or request.user.is_superuser:
            serializer = SourceSerializer(data=request.data, instance=source)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
    @permission_classes([IsAuthenticated])
    def source_delete(request):
        """
        타자 연습 소스 삭제
        관리자 계정만 허용
        """
        if request.user.is_staff or request.user.is_superuser:
            source.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        return source_detail(request)
    elif request.method == 'POST':
        return game_history_create(request)
    elif request.method == 'PUT':
        return source_update(request)
    elif request.method == 'DELETE':
        return source_delete(request)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def tag_retrieve_create(request, pk):
    """
    태그 전체 불러오기 또는 태그 생성
    """
    if request.user.is_staff or request.user.is_superuser:
        if request.method == 'GET': # 태그 전체 목록 불러오기
            tags = Tag.objects.all()
            serializer = TagSerializer(tags, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'POST':  # 태그 생성
            serializer = TagSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def tag_update_destroy(request, pk):
    """
    태그 수정 또는 삭제
    """
    tag = get_object_or_404(Tag, pk=pk)
    if request.user.is_staff or request.user.is_superuser:
        if request.method == 'PUT': # 태그 수정
            serializer = TagSerializer(tag, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE': # 태그 삭제
            tag.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
