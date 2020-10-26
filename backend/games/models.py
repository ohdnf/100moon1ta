from django.db import models
from django.conf import settings


class Tag(models.Model):
    content = models.CharField(max_length=16, blank=False)

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
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.content[:10]
