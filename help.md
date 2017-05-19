---
layout: default
title: help
---

# 安装Jekyll

## 下载

地址：https://github.com/pnpdjie/pnpdjie.github.io.git

windows64位的安装安装Ruby2.3.3(x64) 

及DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe

## 生成config.yml文件

在Devkit的安装目录下右键GitBash 执行 ruby dk.rb init 生成config.yml文件

继续执行 ruby dk.rb install 安装

## 安装Jekyll

在Devkit的安装目录下右键GitBash 执行 gem install jekyll 

若失败，可尝试执行 gem sources --add http://rubygems.org/ 

## 安装bundle

在Devtlt的安装目录下右键Git Bash 执行 gem install bundle

## 生成博客页面

执行 Jekyll new blog生成 初始化页面

执行 Jekyll serve 启动服务。 访问localhost:4000 

# 文件结构

## _include

存放一些组件，可以通过{% raw %}{% include file.xx %}{% endraw %}引用。常用于header.html footer.html的引用。

## _data

存放一些yml配置文件。

## _layout

布局文件。如何引用？

## _sass

存放主题样式文件，类似css文件

## _config.yml

存储配置数据。全局配置的一些参数

## _post

存放写的文章，文件名格式:YYYY-MM-DD-TITLE.md

## _site

最终生成的静态页面。这部分不用上传github，可以通过 .gitignore来过滤掉 _site目录


# 参数配置

## _config.yml总的配置

jekyll支持从位于_data的yaml,json,csv文件中加载数据，（csv必须包含一个header row）
通过site.data访问里面的数据

例子：
比如定义一个文件_data/members.yml

	{% raw %}
	- name: Tom Preston-Werner
	  github: mojombo
	- name: Parker Moore
	  github: parkr
	- name: Liu Fengyun
	  github: liufengyun
	{% endraw %}

然后可以通过site.data.members访问该文件（文件名决定了字段名）

	{% raw %}
	<ul>
	{% for member in site.data.members %}
	  <li>
	    <a href="https://github.com/{{ member.github }}">
	      {{ member.name }}
	    </a>
	  </li>
	{% endfor %}
	</ul>
	{% endraw %}

定义组织（包含子文件）
_data/orgs/jekyll.yml中：

	{% raw %}
	username: jekyll
	name: Jekyll
	members:
	  - name: Tom Preston-Werner
	    github: mojombo
	  - name: Parker Moore
	    github: parkr
	
	_data/orgs/doeorg.yml中：
	username: doeorg
	name: Doe Org
	members:
	  - name: John Doe
	    github: jdoe
	{% endraw %}

使用：

	{% raw %}
	<ul>
	{% for org_hash in site.data.orgs %}
	{% assign org = org_hash[1] %}
	  <li>
	    <a href="https://github.com/{{ org.username }}">
	      {{ org.name }}
	    </a>
	    ({{ org.members | size }} members)
	  </li>
	{% endfor %}
	</ul>
	{% endraw %}
	
## Front Matter

通过这个可以设置一些页面变量（甚至可以自定义变量），比如title

	{% raw %}
	---
	layout: post
	title: Blogging Like a Hacker
	---
	{% endraw %}
	
设置好变量以后，
你就可以在当前页面或者你的页面依赖的\_layouts或者_includes
里的文件通过Liquid 标记，比如{page.title}访问了。


#  liquid语法

## Advanced output: Filters

输出标记需要的过滤器。过滤器是简单的方法。第一个参数在过滤器的左侧就是过滤器的输入，即需要过滤的内容。过滤器的返回值将是过滤器运行时过滤后的左侧的参数。当没有更多的过滤器，模板会收到结果字符串。
代码示例：

	{% raw %}
	Hello {{ 'tobi' | upcase }}
	Hello tobi has {{ 'tobi' | size }} letters!
	Hello {{ '*tobi*' | textilize | upcase }}
	Hello {{ 'now' | date: "%Y %h" }}
	{% endraw %}

Standard Filters标准过滤器：

date -时间格式化

capitalize-设置输入中的某个单词*

downcase-将输入的字符串转换为小写*

upcase-将输入的字符串转换为大写

first-获得传入的数组的第一个元素

last-获得传入的数组的最后一个元素

join-用数组的分隔符连接数组中的元素

sort-数组中的元素排序

map-通过指定的属性过滤数组中的元素

size-返回一个数组或字符串的大小

escape-转义一个字符串

escape_once-返回HTML的转义版本，而不会影响现有的实体转义

strip_html-从字符串去除HTML

strip_newlines -从字符串中去除所有换行符（\ n）的

newline_to_br-用HTML标记替换每个换行符（\ n）

	{% raw %}

	replace-替换，例如：

	{{ 'foofoo' | replace:'foo','bar' }} #=> 'barbar'


	replace_first-替换第一个，例如： 

	{{barbar' | replace_first:'bar','foo' }} #=> 'foobar'


	remove-删除，例如：
	
	{{'foobarfoobar' | remove:'foo' }} #=> 'barbar'


	remove_first-删除第一个，例如：

	{{ 'barbar' | remove_first:'bar' }} #=> 'bar'


	truncate-截取字符串到第x个字符

	truncatewords-截取字符串到第x个词

	prepend-前置添加字符串，例如：
	
	{{ 'bar' | prepend:'foo' }} #=> 'foobar'


	append-后置追加字符串，例如：

	{{'foo' | append:'bar' }} #=> 'foobar'


	minus-减法，例如：

	{{ 4 | minus:2 }} #=> 2


	plus-加法，例如：

	{{'1' | plus:'1' }} #=> '11', {{ 1 | plus:1 }} #=> 2


	times-乘法，例如：

	{{ 5 | times:4 }} #=> 20


	divided_by-除法，例如：

	{{ 10 | divided_by:2 }} #=> 5


	split-通过正则表达式切分字符串为数组，例如：

	{{"a~b" | split:"~" }} #=> ['a','b']


	modulo-取模，例如：

	{{ 3 | modulo:2 }} #=> 1

	{% endraw %}


## If/Else

 	{% raw %}
 
	{% if user %}
	  Hello {{ user.name }}
	{% endif %}
	# Same as above
	{% if user != null %}
	  Hello {{ user.name }}
	{% endif %}
	{% if user.name == 'tobi' %}
	  Hello tobi
	{% elsif user.name == 'bob' %}
	  Hello bob
	{% endif %}
	{% if user.name == 'tobi' or user.name == 'bob' %}
	  Hello tobi or bob
	{% endif %}
	{% if user.name == 'bob' and user.age > 45 %}
	  Hello old bob
	{% endif %}
	{% if user.name != 'tobi' %}
	  Hello non-tobi
	{% endif %}
	# Same as above
	{% unless user.name == 'tobi' %}
	  Hello non-tobi
	{% endunless %}
	# Check for the size of an array
	{% if user.payments == empty %}
	   you never paid !
	{% endif %}
	{% if user.payments.size > 0  %}
	   you paid !
	{% endif %}
	{% if user.age > 18 %}
	   Login here
	{% else %}
	   Sorry, you are too young
	{% endif %}
	# array = 1,2,3
	{% if array contains 2 %}
	   array includes 2
	{% endif %}
	# string = 'hello world'
	{% if string contains 'hello' %}
	   string includes 'hello'
	{% endif %}
	{% endraw %}
	
## Case Statement
	
	{% raw %}
	{% case condition %}
	{% when 1 %}
	hit 1
	{% when 2 or 3 %}
	hit 2 or 3
	{% else %}
	... Else ...
	{% endcase %}
	
	{% case template %}
	{% when 'label' %}
	     // {{ label.title }}
	{% when 'product' %}
	     // {{ product.vendor | link_to_vendor }} / {{ product.title }}
	{% else %}
	     // {{page_title}}
	{% endcase %}
	
	{% endraw %}
	
## For loops 

### Liquid for遍历循环
	
	{% raw %}
	{% for item in array %}
	  {{ item }}
	{% endfor %}
	{% endraw %}

### 当遍历一个键值对集合

item[0]是key的值，item[1]则是value的值。

	{% raw %}
	{% for item in hash %}
	  {{ item[0] }}: {{ item[1] }}
	{% endfor %}
	{% endraw %}

### 辅助变量

在每次for循环中，下面的辅助变量可用于额外的需求：

forloop.length      # => 整个for循环的长度


forloop.index       # => 当前迭代的索引


forloop.index0      # => 当前迭代的索引(从0开始)


forloop.rindex      # => 剩余的迭代次数


forloop.rindex0     # => 剩余的迭代次数(从0开始)


forloop.first       # => 是否是第一次迭代?


forloop.last        # => 是否是最后一次迭代?

### limit offset

Limit限制循环次数  

offset:int可以让你从第n项开始遍历。

	{% raw %}
	# array = [1,2,3,4,5,6]
	{% for item in array limit:2 offset:2 %}
	 {{ item }}
	{% endfor %}
	# results in 3,4
	### 倒叙循环
	{% for item in collection reversed %} 
	    {{item}} 
	{% endfor %}
	{% endraw %}


## Variable Assinmengt

将数据存储在自定义的变量，输出或在其他标记中随意使用。用assign标签创建。

	{% raw %}
	{% assign name = 'freestyle' %}
	
	{% for t in collections.tags %}
	    {% if t == name %}
	        Freestyle!
	    {% endif %}
	{% endfor %}
	{% assign freestyle = false %}
	
	
	{% for t in collections.tags %}
	    {% if t == 'freestyle' %}
	          {% assign freestyle = true %}
	    {% endif %}
	{% endfor %}
	
	{% if freestyle %}
	   Freestyle!
	{% endif %}
	{% endraw %}

# ONAP demo修改

## 右上导航

修改位置 _includes/header.html


# 创建新页面

## 选择标题和文件名

以关键字命名标题，方便搜索。将标题以“-”相连形成文件名。例如“Writing a New Topic”的文件名为“write-new-topic.md”。

## 选择文档模板

文档模板位于_includes\templates文件夹，目前只有home.md。以下介绍仅基于此模板。home.md如下：

	{% raw %}
	
	* TOC
	{: toc}
	
	{% if article %}
	
	{{ article }}
	
	{% endif %}
	
	{% endraw %}

\* TOC
{: toc} ：生成文档目录结构

article：文档内容变量，在使用此模板的文档中定义。

## 选择文件夹

根据选择的文档模板将文档存放在对应的docs的子目录中。例如：docs/home下的文件夹只存放使用home.md模板的文档。

## 编辑文档内容

在docs/home目录或在此目录自定义的子目录中，创建md文件。

### 编辑MD文档头信息

头信息位于文档顶部，两行虚线之间。在md文档头信息中编辑title字段，例如：

	---
	title:  Writing a New Topic
	---
	
### 编辑文档内容
将你需要编辑的内容放在{% capture article %}和{% endcapture %}标签中间，以此定义文档模板中的article变量。
文档中，##定义二级标题，如果需要子标题，可以用###和####。
例如：

	{% raw %}
	
	---
	title: Configuring This Thing
	---
	
	{% capture article %}
	This page shows how to ...
	
	* Do this.
	* Do this too.
	
	## Doing ...
	
	1. Do this.
	1. Do this next. Possibly read this [related explanation](...).
	{% endcapture %}
	
	{% include templates/home.md %}
	
	{% endraw %}

### 包含文档模板

在文档最后必须添加你之前所选择的模板的路径位置，如上一步中的：{% include templates/home.md %}

## 在目录文件中添加入口

模板文件/\_includes/templates/home.md对应的目录文件为/_data/docs-home.yml，内容如下:
    
	{% raw %}
	
	bigheader: "Documentation Home"
	abstract: "Documentation for using and learning about ONAP."
	toc:
	- docs/home/index.md

	- title: ONAP Github
	  path: https://github.com/ONAP

	- title: Contributing to the Kubernetes Docs
 	 section:
	  - docs/home/contribute/create-pull-request.md
 	  - docs/home/contribute/my-test-file.md
 	  
	{% endraw %}
 
bigheader：标题

abstract：描述

toc：目录

title：目录标题

path：页面路径

sedtion：子目录

根据文档模板，在/_data/docs-home.yml文件中添加入口，将你的文档存放路径添加到目录文件中。例如：

	- docs/home/contribute/write-new-topic.md
	
## 表格测试
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

