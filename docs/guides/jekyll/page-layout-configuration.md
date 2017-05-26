---
title: 页面布局说明
---
{% capture article %}

## 页面布局

Documentation下所有页面目前布局模板`_layouts/docwithnav.html`。

引用的布局文件见下表：

|页面位置    |说明    |文件  |
|----|------|----|
|页面`head`标签    |引用样式和js文件     |_includes/head.html   |
|顶部    |顶部标题和菜单    |_includes/header.html   |
|左侧    |Documentation下所有文件目录结构   |_includes/tree.html   |
|底部    |联系方式   |_includes/footer.html   |

页面具体描述见下图：
![页面布局描述](/images/docs/guides/jekyll/page-layout.png )

## 左侧导航

左侧导航需要在_data目录中读取对应的yml文件，需要事先做些配置工作。

### 配置

在项目配置文件`_config.yml`中定义导航数据文件名称，必须和_data目录下的yml文件的名称相同。

示例如下：

	tocs:
	  - docs-home
	  - setup
	  - guides

`docs-home`对应的文件是`_data/docs-home.yml`。

### 数据

以`_data/guides.yml`为例，此处为页面[Guides](/docs/guides/)的导航数据：

	bigheader: "Guides"
	abstract: "Documentation for using and learning about ONAP."
	toc:
	- docs/guides/index.md
	
	- title: Markdown语法解读
	  path: https://github.com/guodongxiaren/README

	- title: Markdown
	  section:
	  - docs/guides/markdown/add-links-into-picture.md
	  - docs/guides/markdown/show-tables.md
	  - docs/guides/markdown/show-pictures.md
	  - docs/guides/markdown/show-pages.md

	- title: Jekyll
	  section:
	  - docs/guides/jekyll/page-layout-configuration.md
	  - docs/guides/jekyll/create-new-page.md

`bigheader`：二级菜单名称，用来判断二级菜单是否选中。

`abstract`：描述

`toc`：目录，短号后就是目录数据

目录数据分三种情形，见下表：

|情形描述   |处理  |
|----|------|
|未指定`title`和`path`   |读取指定路径页面，取页面`page.title`和`page.url`显示导航   |
|指定`title`和`path`   |指定`title`和`path`显示导航   |
|指定`title`和`section`   |指定`section`时，该目录为父级，读取`section`显示子级   |

**所以每创建一个菜单，必须在`_config.yml`中配置`toc`，以及在`_data`目录中创建对应的yml文件。**

**每创建一个页面，除了将页面文件放在对应目录中外，还需要在`_data`目录对应的yml文件中加入导航数据。**

{% endcapture %}

{% include templates/home.md %}
