# Generated by Django 4.2.4 on 2023-08-25 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='permalink',
            field=models.CharField(default=123, max_length=10, unique=True),
            preserve_default=False,
        ),
    ]
