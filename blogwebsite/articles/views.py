from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from .models import Article
from .forms import newArticleForm
from django.utils import timezone
from django.views.generic.edit import UpdateView

# Create your views here.
def index(request):
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
                article.save()
                return render(request, 'index/index.html')
        else:
            form = newArticleForm()
            return render(request, 'articles/new.html', {
                "form": form
            })
        return render(request, 'articles/new.html')
    else:
        return render(request, 'forbidden/theoden.html')
    
def edit_article(request, idarticle):
    articleid = get_object_or_404(Article, pk = idarticle)
    if request.user.is_superuser:
        if request.method == "POST":
            form = newArticleForm(request.POST, instance=articleid)
            if form.is_valid():
                article = form.save(commit=False)
                article.date_posted = article.date_posted
                article.date_edited = timezone.now()
                article.save()
                return render(request, 'index/index.html')
        else:
            form = newArticleForm()
            return render(request, 'articles/new.html', {
                "form": form
            })
        return render(request, 'articles/new.html')
    else:
        return render(request, 'forbidden/theoden.html')
    
def article(request, titlestr):
    onearticle = Article.objects.get(title = titlestr)
    return render(request, "articles/index.html", {
        "article": onearticle
    })
