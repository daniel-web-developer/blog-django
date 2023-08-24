import datetime
from django import forms
from .models import Article

class newArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ('title', 'content', 'author')

