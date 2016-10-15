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
        page = request.GET.get('page', 'isnull');
        cate = request.GET.get('cate', 'isnull');
        tag = request.GET.get('tag', 'isnull');
        return_posts_list = []
        all_posts = Article.objects.all()
        all_posts = filter_about(all_posts)
        if cate != 'isnull':
                all_posts = filter(lambda x:cate in x.category, all_posts)
        if tag != 'isnull':
                all_posts = filter(lambda x:tag in x.tag, all_posts)
        
        paginator = Paginator(all_posts, 3) #每页显示两个
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
                return_posts_list.append(post_info)
        html = render_to_string('async_posts.html', {'post_list' : return_posts_list})
        return HttpResponse(html)

def async_rightpage(request):
        page = request.GET.get('page', 'isnull');
        cate = request.GET.get('cate', 'isnull');
        tag = request.GET.get('tag', 'isnull');
        return_posts_list = []
        all_posts = Article.objects.all()
        all_posts = filter_about(all_posts)
        if cate != 'isnull':
                all_posts = filter(lambda x:cate in x.category, all_posts)
        if tag != 'isnull':
                all_posts = filter(lambda x:tag in x.tag, all_posts)

        paginator = Paginator(all_posts, 3) #每页显示两个
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
        if cate != 'isnull':
                all_posts = filter(lambda x:cate in x.category, all_posts)
        if tag != 'isnull':
                all_posts = filter(lambda x:tag in x.tag, all_posts)
                
        paginator = Paginator(all_posts, 3) #每页显示两个
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
                return_post_list.append(post_info)
        #Paginator在模板中只是分页使用, 并不适用其中包含的文章内容.
        return render(request, 'home.html', {'post_list' : return_post_list, 'tags' : gettags(), 'Paginator' : post_list, 'page' : page, 'cate' : cate, 'tag' : tag})

def detail(request):
        name = request.GET.get('name', 'isnull');
        if( name == 'isnull'):
                pid = request.GET.get('id');
                try:
                        post = Article.objects.get(id=pid)
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
                        post = Article.objects.get(id=pid)
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
def test(request):
        f = open("/home/jianglong.cjl/my_blog/data/macox_ssh_linux_gnuplot_conf.md","r")
        f.seek(0)
        post = f.read()
        f.close()
        return render(request, 'test.html', {'post' : post, 'tags' : gettags()})

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
        return render(request, 'tagshome.html', {'post_list' : return_post_list, 'tag':tag, 'tags' : gettags()} )
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
        return render(request, 'categoryhome.html', {'post_list' : return_post_list,'category' : category, 'tags' : gettags()} )
