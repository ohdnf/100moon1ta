# Generated by Django 2.2.16 on 2020-10-26 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='category',
            field=models.CharField(choices=[('T', 'Plain text'), ('C', 'Source code')], default='C', max_length=2),
        ),
    ]
