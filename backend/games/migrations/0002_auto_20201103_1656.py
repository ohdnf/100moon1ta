# Generated by Django 2.2.16 on 2020-11-03 07:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('games', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='source',
            name='likers',
            field=models.ManyToManyField(blank=True, related_name='liked_source', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='source',
            name='players',
            field=models.ManyToManyField(blank=True, through='games.GameHistory', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='source',
            name='subscribers',
            field=models.ManyToManyField(blank=True, related_name='subscribed_source', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='source',
            name='tags',
            field=models.ManyToManyField(blank=True, to='games.Tag'),
        ),
        migrations.AddField(
            model_name='gamehistory',
            name='player',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='gamehistory',
            name='source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.Source'),
        ),
    ]