from rest_framework import serializers
from .models import Tag, Source, GameHistory
from users.serializers import UserSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('content', )


class SourceSerializer(serializers.ModelSerializer):
    likers = UserSerializer(many=True, required=False)
    subscribers = UserSerializer(many=True, required=False)
    tags = TagSerializer(many=True, required=False)

    class Meta:
        model = Source
        fields = ('id', 'category', 'length', 'difficulty', 'likers', 'subscribers', 'tags')


class GameHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = GameHistory
        fields = ('id', 'game_time', 'precision', 'typo', 'points')
    
    def create(self, validated_data):
        return GameHistory.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        # 게임 신기록 검사
        new_score = validated_data.get('points', 0)
        if instance.points < new_score:
            instance.points = new_score
        instance.game_time = validated_data.get('game_time', instance.game_time)
        instance.precision = validated_data.get('precision', instance.precision)
        instance.typo = validated_data.get('typo', instance.typo)
        instance.save()
        return instance
