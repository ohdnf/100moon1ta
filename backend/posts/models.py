from django.db import models
from django.conf import settings
# from source.models import Source


class Tag(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.name}'


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, 
                             on_delete=models.CASCADE, related_name='posts')
    tags = models.ManyToManyField(Tag, related_name='tagged_posts', blank=True)
    
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
