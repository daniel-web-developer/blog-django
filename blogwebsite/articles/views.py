from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index/index.html')

def all(request):
    return render(request, 'articles/index.html')

