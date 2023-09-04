from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=512)
    content = models.TextField()
    author = models.CharField(max_length=32)
    date_posted = models.DateTimeField(auto_now_add=True, editable=False)
    date_edited = models.DateTimeField(null=True, blank=True)
    permalink = models.CharField(max_length = 10, unique=True)
    imagelink = models.URLField()
    tags = models.CharField(max_length=128)

