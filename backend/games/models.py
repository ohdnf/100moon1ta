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
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100, blank=True)
    link = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=2, choices=TYPE_CHOICES, default=CODE)
    content = models.TextField()
    length = models.IntegerField()
    difficulty = models.IntegerField(null=True, blank=True)
    likers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_source', blank=True)
    subscribers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='subscribed_source', blank=True)
    players = models.ManyToManyField(settings.AUTH_USER_MODEL, through='GameHistory', blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.title


class GameHistory(models.Model):
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    game_time = models.FloatField()
    precision = models.FloatField()
    typo = JSONField()
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "game histories"

    def __str__(self):
        return f'User:{self.player}\nSource:{self.source}\nScore:{self.score} pts'
