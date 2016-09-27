#!/home/tops/bin/python
# coding=utf-8
import os
import sys
import django
from datetime import *
os.sys.path.append("..")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_blog.settings")
from django.db.transaction import commit_on_success
from django.db import connections
from article.models import Article
from datetime import *
def update_txtblog(blogfile, using="default"):
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
        Article.objects.filter(file_name=blogfile).update(content=txt)
    finally:
        fin.close()
        con.close()

def  main(argvs):
    if len(argvs) < 2:
        print "error using"
        exit()
    qic_file = argvs[1]
    update_txtblog(qic_file)

if __name__ == "__main__":
    main(sys.argv)
