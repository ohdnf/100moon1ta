from django.db import models
from django.conf import settings


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, 
                             on_delete=models.CASCADE, related_name='posts')
    
    def __str__(self):
        return f'{self.title}'


class PostComment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, 
                             on_delete=models.CASCADE, 
                             related_name='post_comments')
    post = models.ForeignKey(Post, 
                             on_delete=models.CASCADE, 
                             related_name='post_comments')
    
    def __str__(self):
        return f'{self.content}'


class Tag(models.Model):
    name = models.CharField(max_length=10)
    posts = models.ManyToManyField(Post, related_name='post_tags', blank=True)

    def __str__(self):
        return f'{self.name}'
