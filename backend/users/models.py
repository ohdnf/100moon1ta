from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    # username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    username = models.CharField(blank=True, max_length=100)
    profile_image = models.ImageField(upload_to='%Y/%m/%d', blank=True)
    # date_of_birth = models.DateField(blank=True, null=True)
    

    def __str__(self):
        return self.email