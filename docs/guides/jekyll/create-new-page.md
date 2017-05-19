---
title: 创建新页面
---

{% capture article %}

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

{% endcapture %}

{% include templates/home.md %}
