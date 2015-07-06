#!/home/tops/bin/python
# coding=utf-8
import os
import sys
import django
os.sys.path.append("..")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_blog.settings")
from django.db.transaction import commit_on_success
from django.db import connections
from article.models import Article
from datetime import *
def insert_txtblog(blogfile, title, cate, tags,using="default"):
    con  = connections[using] 
    fields = [f for f in Article._meta.fields if not
            isinstance(f, django.db.models.AutoField)]
    parameters = []
    table = Article._meta.db_table
    column_names = ",".join(con.ops.quote_name(f.column) for f in fields)
    placeholders = ",".join(("%s",)*len(fields))
    field_list = [con.ops.quote_name(f.column) for f in fields]
    try:
        fin=open(blogfile, 'r')
        fin.seek(0)
        txt=fin.read()
        Article.objects.create(title = title, category = cate, tag = tags, content=txt); 
    finally:
        fin.close()
        con.close()

def  main(argvs):
    if len(argvs) < 5:
        print "error using"
        exit()
    title=argvs[1]
    cate=argvs[2]
    tags = argvs[3]
    qic_file = argvs[4]
    insert_txtblog(qic_file,title,cate,tags)

if __name__ == "__main__":
    main(sys.argv)

