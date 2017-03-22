#coding=utf-8

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from article.models import Article
from article import util

# Create your views here.
def filter_about(posts_list):
        return filter(lambda x:'about.md' not in x.file_name, posts_list)
def gettags():
        post_list = Article.objects.all()
        tags = set()
        for e in post_list:
                words = e.tag.split(' ')
                for word in words:
                        tags.add(word)
        return tags

def async_posts(request):
        page = request.GET.get('page', 1);
        cate = request.GET.get('cate', 'isnull');
        tag = request.GET.get('tag', 'isnull');
        return_posts_list = []
        all_posts = Article.objects.all()
        all_posts = filter_about(all_posts)
        sorted(all_posts, key=lambda x:x.date_time)
        if cate != 'isnull':
                all_posts = filter(lambda x:cate==x.category, all_posts)
        if tag != 'isnull':
                all_posts = filter(lambda x: tag in x.tag.split(' '), all_posts)
                
        paginator = Paginator(all_posts, 12) #每页显示两个
        try :
                post_list = paginator.page(page)
        except PageNotAnInteger :
                post_list = paginator.page(1)
        except EmptyPage :#输入的页码太大 显示最后一页
                post_list = paginator.paginator(paginator.num_pages)
        for post in post_list:
                post_info = util.PostInfo()
                post_info.id = post.id
                post_info.title = post.title
                post_info.category = post.category
                post_info.tag_list = post.tag.split(' ')
                post_info.datetime = post.date_time
                post_info.content = post.content
                post_info.fixed_id = post.fixed_id
                return_posts_list.append(post_info)
        html = render_to_string('async_posts.html', {'post_list' : return_posts_list})
        return HttpResponse(html)

def async_rightpage(request):
        page = request.GET.get('page', 1);
        cate = request.GET.get('cate', 'isnull');
        tag = request.GET.get('tag', 'isnull');
        
        return_posts_list = []
        all_posts = Article.objects.all()
        all_posts = filter_about(all_posts)
        sorted(all_posts, key=lambda x:x.date_time)
        if cate != 'isnull':
                all_posts = filter(lambda x:cate==x.category, all_posts)
        if tag != 'isnull':
                all_posts = filter(lambda x: tag in x.tag.split(' '), all_posts)
                
        paginator = Paginator(all_posts, 12) #每页显示两个
        try :
                post_list = paginator.page(page)
        except PageNotAnInteger :
                post_list = paginator.page(1)
        except EmptyPage :#输入的页码太大 显示最后一页
                post_list = paginator.paginator(paginator.num_pages)
        for post in post_list:
                post_info = util.PostInfo()
                post_info.id = post.id
                post_info.title = post.title
                post_info.category = post.category
                post_info.tag_list = post.tag.split(' ')
                post_info.datetime = post.date_time
                post_info.content = post.content
                post_info.fixed_id = post.fixed_id
                return_posts_list.append(post_info)
        html = render_to_string('async_rightpage.html', {'post_list' : return_posts_list, 'Paginator' : post_list, 'page' : page, 'cate' : cate, 'tag' : tag})
        return HttpResponse(html)


def home(request):
        page = request.GET.get('page', 1);
        cate = request.GET.get('cate', 'isnull');
        tag = request.GET.get('tag', 'isnull');        
        return_post_list = []
        all_posts = Article.objects.all()
        all_posts = filter_about(all_posts)
        sorted(all_posts, key=lambda x:x.date_time)
        if cate != 'isnull':
                all_posts = filter(lambda x:cate==x.category, all_posts)
        if tag != 'isnull':
                all_posts = filter(lambda x: tag in x.tag.split(' '), all_posts)
                
        paginator = Paginator(all_posts, 12) #每页显示两个
        try :
                post_list = paginator.page(page)
        except PageNotAnInteger :
                post_list = paginator.page(1)
                page = 1
        except EmptyPage :#输入的页码太大 显示最后一页
                post_list = paginator.paginator(paginator.num_pages)
                page = paginator.num_pages
        for post in post_list:
                post_info = util.PostInfo()
                post_info.id = post.id
                post_info.title = post.title
                post_info.category = post.category
                post_info.tag_list = post.tag.split(' ')
                post_info.datetime = post.date_time
                post_info.content = post.content
                post_info.fixed_id = post.fixed_id
                return_post_list.append(post_info)
        #Paginator在模板中只是分页使用, 并不适用其中包含的文章内容.
        return render(request, 'home.html', {'post_list' : return_post_list, 'tags' : gettags(), 'Paginator' : post_list, 'page' : page, 'cate' : cate, 'tag' : tag})

def detail(request):
        name = request.GET.get('name', 'isnull');
        if( name == 'isnull'):
                pid = request.GET.get('id');
                try:
                        post = Article.objects.get(fixed_id=pid)
                except Article.DoesNotExist:
                        raise Http404
        else:
                try:
                        post = Article.objects.get(file_name=name)
                except Article.DoesNotExist:
                        raise Http404
        tag_list = post.tag.split(' ')
        return render(request, 'post.html', {'post' : post, 'tag_list' : tag_list, 'tags' : gettags()})

def async_detail(request):
        name = request.GET.get('name', 'isnull');
        if( name == 'isnull'):
                pid = request.GET.get('id');
                try:
                        post = Article.objects.get(fixed_id=pid)
                except Article.DoesNotExist:
                        raise Http404
        else:
                try:
                        post = Article.objects.get(file_name=name)
                except Article.DoesNotExist:
                        raise Http404
        tag_list = post.tag.split(' ')        
        html = render_to_string('async_post.html', {'post' : post, 'tag_list' : tag_list})
        return HttpResponse(html)
