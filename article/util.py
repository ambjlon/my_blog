from datetime import *
import time

class PostInfo():
    def __init__(self):
        self.id = 0
        self.title = ''
        self.category = ''
        self.tag_list = []
        self.datetime = datetime.today()
        self.content = ''
