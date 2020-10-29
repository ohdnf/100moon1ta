from django.contrib import admin
from .models import Tag, Source, GameHistory

admin.site.register(Tag)
admin.site.register(Source)
admin.site.register(GameHistory)
