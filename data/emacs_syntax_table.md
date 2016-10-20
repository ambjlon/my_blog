### 什么是语法表? 语法表是用来做什么的?  
1. 语法表本质上是char-table, 存储了每个字符和这个字符的属性(类型)之间的映射关系, 字符属性有delimiter whitespace word等等.
2. 实际上创建一个简单的SyntaxTable , 基本上就能建立自己的major mode(类似java-mode c-mode等等).
3. 使用M-f向前跳跃一个word的时候, 就会用到当前buffer/mode的SyntaxTable, 根据这个SyntaxTable(word char)判断下一个word从哪里开始.
4. 进行正则搜索的时候\w代表一个具有word属性的字符. 不同的mode下\w代表不同的字符集合, 因为不同mode下的word字符集合不同.

### 如何打开语法表?  
F1 s 或者 M-x help  s 可以打开当前缓冲区的语法表.  
如果不是打开当前缓冲区的语法表可以:standard-syntax-table是函数, 可以在help中找到这个函数; text-mode-syntax-table/c-mode-syntax-table/java-mode-syntax-table等是变量, 可以在help的变量(v)中找到. 一般在对应的mode中通过defvar定义这些变量. 比如text-mode-syntax-table在text-mode.el中定义了, 但是只在emacs源码中找到这些定义了.

### 如何阅读语法表?  
使用F1 s打开当前缓冲区的语法表如下:  
![](/static/blog_pic/emacs_syntax_table1.jpg)  
第一列是字符, 第二列是字符类的代表字符, 第三列是字符类的文字说明.  
但是不明白为嘛一个语法表会有多个父表: The parent syntax table is:

### 在缓冲区中搜索某个类型的字符  
C-M-s进入正则搜索.  
搜索word类字符: \w  
搜索空白字符: \s-  
搜索symbol字符: \s_  
参考:[emacs wiki Regular Expression](https://www.emacswiki.org/emacs/RegularExpression#regexp)

### 如何创建新的语法表?  
语法表和char-table类似, 是可以继承的. 创建语法表时, 总是先通过继承获得一个基本的语法表, 然后再在这个基本的语法表上进行修改.  
(setq my-table (make-syntax-table)) my-table默认继承了standard-syntax-table.  
(setq my-table (make-syntax-table text-mode-syntax-table))  my-table继承了text-mode-syntax-table.

### 如何修改语法表 / 启动php文件的时候修改php-mode的语法表  
参考https://www.emacswiki.org/emacs/EmacsSyntaxTable这里并稍作改进, 建立hack-syntax-table.el, 内容如下:

```lisp
(add-hook 'php-mode-hook (lambda ()
                           (modify-syntax-entry ?- "_" php-mode-syntax-table)))
                           (provide 'hack-syntax-table)
```

其他的各个mode照此方案亦可实现本mode语法表的修改.

### sexp是什么/用来做什么?  
sexp是s-expression的简称, 也叫作balanced parentheses. 这个概念最早是从lisp语言来, 把整个lisp源码文档按照二叉树的形式组织起来, 最终达到"平衡", 若有语法的错误, 这个二叉树就会失衡出错.  
emacs对任意一种语言的mode都有sexp的概念. 现在还没搞清楚在其他语言中sexp的精确定义. 只能根据各个工具的表现来揣测sexp的定义:

1. word由标记为w的连续不间断字符组成; sexp语义要比word宽泛, 包括标记为w和symbol的不间断字符构成(?).
2. 标记为标点,还有< > / whitespace等字符或者这些字符的不间端连续, 不是sexp!
3. 一般language的sexps不是二叉树  是一个普通的树.
4. 有的函数会把底层的字母数字构成的block也当做sexp, 但是有时候会略过这样的sexp.

参看[这里](http://www2.lib.uchicago.edu/keith/tcl-course/emacs-tutorial.html)对sexp的解释:
>An S-expression (sexp for short) is the name for balanced parentheses (and the text they enclose) in Lisp. In Emacs, this useful notion is available in most modes; it's especially useful for editing programming languages. The characters that Emacs recognizes as parens are usually regular parentheses (aka round brackets), square brackets, and braces (aka curly brackets), but it depends on the mode (for some languages, angle brackets may act as parens).
>But sexps are more than just balanced parens: they're defined recursively. A word that doesn't contain any parens also counts as a sexp. In most programming language modes, quoted strings are sexps (using either single or double quotes, depending on the syntax of the language). The sexp commands move in terms of all these units.
>These commands may seem confusing at first, but for editing most programming languages they're fantastic. Not only do they move you around quickly and accurately, but they help spot syntax errors while you're editing, because they'll generate an error if your parens or quotes are unbalanced.

还有[Expressions with Balanced Parentheses](https://www.gnu.org/software/emacs/manual/html_node/emacs/Expressions.html).  
[理解S表达式](https://thzt.github.io/blog/2015/04/02/s-expression/)是最sexp的理论剖析.

### symbol和word的区别?  
1. [What's the difference between words and symbols?](http://emacs.stackexchange.com/questions/1075/whats-the-difference-between-words-and-symbols)
2. [Treat symbols as words in prog modes](http://emacs.stackexchange.com/questions/983/treat-symbols-as-words-in-prog-modes)
3. [ Table of Syntax Classes](https://www.gnu.org/software/emacs/manual/html_node/elisp/Syntax-Class-Table.html#Syntax-Class-Table)

最好能有一种插件把每种mode的sexp能高亮(rainbow)一下, 层次分明, 连底层的字母数字block都要标出. 找了几个这方面的工具但是不够理想:

1. [git emacs-prelude](https://github.com/iani/emacs-prelude/blob/master/preload-disabled/highlight-sexps.el)
2. [emacs wiki HighlightSexp](https://www.emacswiki.org/emacs/HighlightSexp)
3. [emacs wiki highlight-sexp.el](https://www.emacswiki.org/emacs/highlight-sexp.el)
4. [git live-coding-emacs](https://github.com/overtone/live-coding-emacs/blob/master/lib/rainbow-delimiters.el)
5. [How to Write a Emacs Major Mode for Syntax Coloring](http://ergoemacs.org/emacs/elisp_syntax_coloring.html)
6. [git highlight-symbol.el](https://github.com/nschum/highlight-symbol.el)

### 参考  
1. [git smartparens](https://github.com/Fuco1/smartparens)
2. [Emacs and Pairs](https://ebzzry.github.io/emacs-pairs.html)
3. [emacs wiki Navigating Parentheses](https://www.emacswiki.org/emacs/NavigatingParentheses)
4. [emacs wiki Parenthesis Matching](https://www.emacswiki.org/emacs/ParenthesisMatching)
