from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponseForbidden
from .models import Article
from .forms import newArticleForm
from django.utils import timezone
from django.views.generic.edit import UpdateView
import secrets
from rest_framework.decorators import api_view
from .serializers import ArticleSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
def index(request):
    all = Article.objects.all()
    return render(request, 'index/index.html')

# @login_required
def new_article(request):
    if request.user.is_superuser:
        if request.method == "POST":
            form = newArticleForm(request.POST)
            if form.is_valid():
                article = form.save(commit=False)
                article.date_posted = timezone.now()
                article.date_edited = None
                article.permalink = secrets.token_urlsafe(10)[:10]
                article.save()
                return redirect('index')
        else:
            form = newArticleForm()
            return render(request, 'articles/new.html', {
                "form": form
            })
        return render(request, 'articles/new.html')
    else:
        return render(request, 'forbidden/theoden.html')
    
def edit_article(request, urlstr):
    onearticle = Article.objects.get(permalink = urlstr)
    if request.user.is_superuser:
        if request.method == "POST":
            form = newArticleForm(request.POST, instance=onearticle)
            if form.is_valid():
                article = form.save(commit=False)
                article.date_posted = article.date_posted
                article.date_edited = timezone.now()
                article.permalink = article.permalink
                article.save()
                return redirect('index')
        else:
            form = newArticleForm(initial={"title": onearticle.title, "subtitle": onearticle.subtitle, "content": onearticle.content, "author": onearticle.author, "imagelink": onearticle.imagelink, "tags": onearticle.tags})
            return render(request, 'articles/new.html', {
                "form": form
            })
        return render(request, 'articles/new.html')
    else:
        return render(request, 'forbidden/theoden.html')
    
def article(request, urlstr):
    onearticle = Article.objects.get(permalink = urlstr)
    return render(request, "articles/index.html", {
        "article": onearticle
    })

@api_view(['GET'])
def article_list(request, format=None):
    all = Article.objects.all()
    serializer = ArticleSerializer(all, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def article_detail(request, urlstr):
    try:
        onearticle = Article.objects.get(permalink = urlstr)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = ArticleSerializer(onearticle)
    return Response(serializer.data)

