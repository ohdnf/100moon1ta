from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Tag, Source, GameHistory
from users.serializers import UserSerializer


class TagSerializer(serializers.ModelSerializer):
    # content = serializers.CharField(error_messages={"unique":"중복된 태그가 이미 존재합니다!"})
    class Meta:
        model = Tag
        fields = ('id', 'content',)

    def create(self, validated_data):
        """
        띄어쓰기 없애기
        """
        new_tag = validated_data.get('content', '')
        new_tag = new_tag.replace(' ', '')
        return Tag.objects.create(content=new_tag)


class SourceSerializer(serializers.ModelSerializer):
    likers = UserSerializer(many=True, required=False)
    subscribers = UserSerializer(many=True, required=False)
    tags = TagSerializer(many=True, required=False)

    class Meta:
        model = Source
        fields = ('id', 'title', 'description', 'link', 'category', 'content', 'length', 'difficulty', 'likers', 'subscribers', 'tags',)


class GameHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GameHistory
        fields = ('id', 'game_time', 'precision', 'typo', 'score',)
    
    def create(self, validated_data):
        return GameHistory.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        # 게임 신기록 검사
        new_score = validated_data.get('score', 0)
        if instance.score < new_score:
            instance.score = new_score
        instance.game_time = validated_data.get('game_time', instance.game_time)
        instance.precision = validated_data.get('precision', instance.precision)
        instance.typo = validated_data.get('typo', instance.typo)
        instance.save()
        return instance


class RankSerializer(serializers.Serializer):
    player__username = serializers.CharField(max_length=100)
    player__comment = serializers.CharField()
    game_count = serializers.IntegerField()
    avg_speed = serializers.FloatField()
    avg_precision = serializers.FloatField()
    total_score = serializers.FloatField()
    class Meta:
        field = ('player__username', 'player__comment','game_count', 'avg_speed', 'avg_precision', 'total_score', )

