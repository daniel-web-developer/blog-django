from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('new', views.new_article, name="new"),
    path('edit/<int:idarticle>/', views.edit_article, name="edit"),
    path('article/<titlestr>', views.article, name="article")
]

