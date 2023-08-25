from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('new', views.new_article, name="new"),
    path('edit/<int:idarticle>/', views.edit_article, name="edit"),
    path('article/<urlstr>', views.article, name="article"),
    path('api/articles/', views.article_list),
    path('api/article/<urlstr>', views.article_detail, name="article"),
]

