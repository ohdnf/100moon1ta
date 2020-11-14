from django.conf import settings
from django.core.cache import cache
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.db.models import Sum, Avg, Count, Max, F, FloatField, ExpressionWrapper, Func, Q
from django.shortcuts import get_object_or_404
from django.views.decorators.cache import cache_page, never_cache

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Tag, Source, GameHistory
from .serializers import TagSerializer, SourceSerializer, GameHistorySerializer, RankSerializer, SourceListSerializer
from users.models import CustomUser

import random


CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)


class Round(Func):
    function = 'ROUND'
    template='%(function)s(%(expressions)s, 2)'


# 타자 연습 소스 관련 API

@api_view(['GET', 'POST'])
def source_retrieve_create(request):
    def source_retrieve(request):
        """
        타자 연습 소스 목록 보기
        """    
        sources = cache.get_or_set('sources', Source.objects.prefetch_related('tags')
        .annotate(
            like_count=Count('likers'), 
            is_like=Count('likers', filter=Q(likers__id = request.user.id)), 
            is_subscribe=Count('subscribers', filter=Q(subscribers__id = request.user.id)))
        )
        serializer = SourceListSerializer(sources, many=True)
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

# @never_cache
@api_view(['GET'])
def random_source(request):
    """
    타자 연습 소스 랜덤으로 선택하기
    """
    max_id = Source.objects.all().aggregate(max_id=Max('id'))['max_id']
    cnt = 0
    while True:
        cnt += 1
        pk = random.randint(1, max_id)
        # source = get_object_or_404(Source, pk=pk)
        source = Source.objects.filter(pk=pk).first()
        if source:
            serializer = SourceSerializer(source)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if cnt > 10000:
            break
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def source_detail_update_destroy(request, pk):
    source = get_object_or_404(Source, pk=pk)

    def source_detail(request):
        """
        타자 연습 소스 상세 정보 보기
        타자 연습은 누구나 허용
        """
        serializer = SourceSerializer(source)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
    elif request.method == 'PUT':
        return source_update(request)
    elif request.method == 'DELETE':
        return source_delete(request)


# 태그 관련 API

@api_view(['GET', 'POST'])
def tag_retrieve_create(request):
    def tag_retrieve(request):
        """
        전체 태그 목록 불러오기
        """
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def tag_create(request):
        """
        태그 생성하기
        관리자 계정만 허용
        """
        if request.user.is_staff or request.user.is_superuser:
            serializer = TagSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        return tag_retrieve(request)
    elif request.method == 'POST':
        return tag_create(request)


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


# 게임 결과 관련 API

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def history_retrieve_create(request, pk):
    source = get_object_or_404(Source, pk=pk)

    def history_retrieve(request):
        """
        현재 유저의 게임 결과 목록 불러오기
        """
        game_histories = GameHistory.objects.filter(player=request.user, source=source)
        serializer = GameHistorySerializer(game_histories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def history_create(request):
        """
        게임 결과 등록하기
        게임 결과 정보는 클라이언트에서 request.body.data로 받는다.
        현재 소스에 대한 기존 게임 기록이 존재하는 경우 신기록(기존 기록보다 높은 점수)만 반영한다.
        """
        # 기존 게임 기록이 있으면
        if GameHistory.objects.filter(player=request.user, source=source).exists():
            history = GameHistory.objects.get(player=request.user, source=source)
            serializer = GameHistorySerializer(data=request.data, instance=history) # 업데이트
        # 없으면
        else:
            serializer = GameHistorySerializer(data=request.data) # 신규 생성
        if serializer.is_valid():
            serializer.save(player=request.user, source=source)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        return history_retrieve(request)
    elif request.method == 'POST':
        return history_create(request)


# 사용자 순위 관련 API

@api_view(['GET'])
def rank_retrieve(request):
    """
    각 플레이어마다 갖고 있는 모든 점수를 합산하여 30위까지 랭킹을 반환
    """
    queryset = cache.get_or_set('queryset', GameHistory.objects.values('player__username', 'player__comment').annotate(
    # queryset = GameHistory.objects.values('player__username', 'player__comment').annotate(
            game_count=Count('source'), 
            avg_precision=Round(Avg('precision')), 
            total_score=Sum('score'),
            avg_speed=Round(Avg(ExpressionWrapper(F('source__length')/F('game_time'), output_field=FloatField())))
        # ).order_by('-total_score')[:30]
        ).order_by('-total_score')[:30])
    serializer = RankSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
