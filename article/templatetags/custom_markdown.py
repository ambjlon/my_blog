#coding=utf-8

import markdown
import re
from django import template
from django.template.defaultfilters import stringfilter
from django.utils.encoding import force_text
from django.utils.safestring import mark_safe

register = template.Library()  

@register.filter(is_safe=True) 
@stringfilter 
def custom_markdown(value):
   html = markdown.markdown(value,extensions = ['markdown.extensions.fenced_code', 'markdown.extensions.tables', 'markdown.extensions.codehilite'],extension_configs={'markdown.extensions.codehilite':{'linenums':'False'}},enable_attributes=False,safe_mode=True)
   # python markdown对table的解析没有border="1". 这里很丑陋的在返回html中做了正则替换.  也不实用python markdown的postprocesssor了  ugly!
   return mark_safe(re.sub('<table>', '<table border="1">', html))



