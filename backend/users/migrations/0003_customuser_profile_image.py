# Generated by Django 2.2.16 on 2020-10-21 01:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20201021_1017'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(blank=True, upload_to='%Y/%m/%d'),
        ),
    ]