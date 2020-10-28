from django.shortcuts import get_object_or_404

from rest_framework import api_view, status
from rest_framework.permissions import IsAuthenticated, permission_classes
from rest_framework.authentication import JSONWebTokenAuthentication
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
        sources = Source.obejcts.all()
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
    def source_create(request):
        """
        게임 결과 등록하기
        게임 결과 정보는 클라이언트에서 쿼리스트링으로 받는다.
        """
        game_time = request.query_params.get('game_time')
        precision = request.query_params.get('precision')
        typo = request.query_params.get('typo')
        points = request.query_params.get('points')
        game_history = GameHistory(user=request.user, source=source, 
                                game_time=game_time, precision=precision, 
                                points=points)

        GameHistorySerializer(game_history)

        serializer = SourceSerializer(source)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
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
        return source_create(request)
    elif request.method == 'PUT':
        return source_update(request)
    elif request.method == 'DELETE':
        return source_delete(request)


@api_view(['GET'])
def source_tag_retrieve(request, pk):
    """
    타자 연습 소스의 태그 전부 불러오기
    """
    source = get_object_or_404(Source, pk=pk)

    tags = Tag.objects.filter(source_id=pk)
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE'])
def source_tag_create_destroy(request, src_pk, tag_pk):
    source = get_object_or_404(Source, pk=src_pk)
    tag = get_object_or_404(Tag, pk=tag_pk)
    
    @permission_classes([IsAuthenticated])
    def source_tag_create(request, src_pk, tag_pk):
        """
        타자 연습 소스에 태그 추가
        관리자 계정만 허용
        """
        source.tags.add(tag)
        serializer = SourceSerializer(source)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @permission_classes([IsAuthenticated])
    def source_tag_delete(request, src_pk, tag_pk):
        """
        타자 연습 소스에 태그 삭제
        관리자 계정만 허용
        """
        source.tags.remove(tag)
        serializer = SourceSerializer(source)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

    if request.user.is_staff or request.user.is_superuser:
        if request.method == 'POST':
            return source_tag_retrieve(request, pk)
        elif request.method == 'DELETE':
            return source_tag_create(request, pk)
    else:
        return Response(status=HTTP_403_FORBIDDEN)


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
