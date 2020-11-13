from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager

# 프로필 이미지 overwrite
import os, random
from django.conf import settings
from django.core.files.storage import FileSystemStorage 

class OverwriteStorage(FileSystemStorage): # 프로필 이미지 중복 시 overwrite
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name

def user_directory_path(instance, filename): # media 폴더 내에 email로 폴더 생성 -> email은 변경 불가, email주소가 변경 가능할 경우 -> 다른 것으로 대체해야함
    exe_name = filename.split('.')[-1]
    return f'{instance.email}/profile.{exe_name}'

def random_image():
    num = random.choice(range(10))
    return f'{num}.svg'

class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    # nickname = models.CharField(max_length=100) # nickname
    profile_image = models.ImageField(upload_to=user_directory_path, storage=OverwriteStorage(), blank=True, default=random_image) # OverwritStorage() , callable 해야함
    comment = models.TextField(blank=True, max_length=100)
    is_ban = models.BooleanField(default=False)
    
    def __str__(self):
        return self.email
