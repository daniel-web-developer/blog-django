from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ['title', 'subtitle', 'content', 'author', 'date_posted', 'date_edited', 'permalink', 'imagelink', 'tags']
