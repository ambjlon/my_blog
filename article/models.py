from django.db import models
from django.core.urlresolvers import reverse

# Create your models here.
class Article(models.Model) :
    title = models.CharField(max_length = 200)
    category = models.CharField(max_length = 50, blank = True)
    tag = models.CharField( max_length = 200 )
    date_time = models.DateTimeField(auto_now_add = False)
    content = models.TextField(blank = True, null = True)
    file_name = models.CharField(max_length = 100)

    def get_absolute_url(self):
        path = reverse('detail', kwargs={'id':self.id})
        return "www.wgcimpression.pub/%s" % path
    def __str__(self) :
        return self.title
    
    class Meta:
        ordering = ['-date_time']
