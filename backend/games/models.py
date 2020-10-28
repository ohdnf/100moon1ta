from django.db import models
from django.conf import settings
from django_mysql.models import JSONField


class Tag(models.Model):
    content = models.CharField(max_length=16, unique=True)

    def __str__(self):
        return self.content


class Source(models.Model):
    TEXT = 'T'
    CODE = 'C'
    TYPE_CHOICES = [
        (TEXT, 'Plain text'),
        (CODE, 'Source code')
    ]
    category = models.CharField(max_length=2, choices=TYPE_CHOICES, default=CODE)
    content = models.TextField()
    length = models.IntegerField()
    difficulty = models.IntegerField()
    likers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_source')
    subscribers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='subscribed_source')
    players = models.ManyToManyField(settings.AUTH_USER_MODEL, through='GameHistory')
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.content[:10]


class GameHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # 유저가 삭제되면 기록도 같이 삭제? 어느 소스에 대한 기록
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    game_time = models.TextField()
    precision = models.FloatField()
    typo = JSONField()
    points = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'UserID:{self.user}/SourceID:{self.source} => {self.points} pts'