from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'my_blog.views.home', name='home'),
    # url(r'^my_blog/', include('my_blog.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'article.views.home'),
    url(r'^test/','article.views.test'),
    url(r'^(?P<id>\d+)/$', 'article.views.detail', name='detail'),
    url(r'^aboutme/', 'article.views.about_me', name = 'about_me'),
    url(r'^tag=(?P<tag>[\w-]+)/$', 'article.views.cast_tag', name='cast_tag'),
    url(r'^category=(?P<category>[\w-]+)/$', 'article.views.cast_category', name='cast_category'),
)
