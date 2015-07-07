# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from article.models import Article

from article import util

from datetime import *
import time
# Create your views here.
def home(request):
        return_post_list = []
        post_list = Article.objects.all()
        for post in post_list:
                post_info = util.PostInfo()
                post_info.id = post.id
                post_info.title = post.title
                post_info.category = post.category
                post_info.tag_list = post.tag.split(' ')
                post_info.datetime = post.date_time
                post_info.content = post.content
                return_post_list.append(post_info)
        return render(request, 'home.html', {'post_list' : return_post_list})

def detail(request, id):
        try:
                post = Article.objects.get(id=str(id))
        except Article.DoesNotExist:
                raise Http404
        return render(request, 'post.html', {'post' : post})
def about_me(request):
        return render(request, 'aboutme.html')
def test(request):
        f = open("/home/jianglong.cjl/my_blog/data/macox_ssh_linux_gnuplot_conf.md","r")
        f.seek(0)
        post = f.read()
        f.close()
        return render(request, 'test.html', {'post' : post})
def tags_cloud(request):
        post_list = Article.objects.all()
        tags = set()
        for e in post_list:
                words = e.tag.split(' ')
                for word in words:
                        tags.add(word)
        return render(request, 'tagscloud.html', {'tag' : tags})
def cast_tag(request, tag):
        return_post_list = []
        post_list = Article.objects.all()
        for post in post_list:
                if not tag in post.tag:
                        continue
                post_info = util.PostInfo()
                post_info.id = post.id
                post_info.title = post.title
                post_info.category = post.category
                post_info.tag_list = post.tag.split(' ')
                post_info.datetime = post.date_time
                post_info.content = post.content
                return_post_list.append(post_info)
        return render(request, 'tagshome.html', {'post_list' : return_post_list, 'tag':tag} )
def cast_category(request, category):
        return_post_list = []
        post_list = Article.objects.all()
        for post in post_list:
                if not category in post.category:
                        continue
                post_info = util.PostInfo()
                post_info.id = post.id
                post_info.title = post.title
                post_info.category = post.category
                post_info.tag_list = post.tag.split(' ')
                post_info.datetime = post.date_time
                post_info.content = post.content
                return_post_list.append(post_info)
        return render(request, 'categoryhome.html', {'post_list' : return_post_list,'category' : category} )
