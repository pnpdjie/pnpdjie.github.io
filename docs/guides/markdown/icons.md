---
title: 行内图片和icon展示
choose: true
---

{% capture article %}

## Font Awesome

Font Awesome是一个Font icon库，不需要图片就可以使用。

下载地址：[http://fontawesome.io/](http://fontawesome.io/)

所有可用icon：[http://fontawesome.io/icons/](http://fontawesome.io/icons/)

## 部署Font Awesome

将下载的Font Awesome库文件放到`css`目录，并以`font-awesome`重命名。

在`_includes/head.html中`加入代码：

```html
<link rel="stylesheet" href="/css/font-awesome/css/font-awesome.css">
```

## 使用Font Awesome

使用Font Awesome需要用`i`标签，例如：

```html
<i class="fa fa-search"></i>
```

展示效果：<i class="fa fa-search"></i>

在`class`中加入`fa-lg`、`fa-2x`、`fa-3x`、`fa-4x`、`fa-5x`可以使Font icon放大，例如：


```html
<i class="fa fa-search fa-lg fa-lg"></i>
<i class="fa fa-search fa-lg fa-2x"></i>
<i class="fa fa-search fa-lg fa-3x"></i>
<i class="fa fa-search fa-lg fa-4x"></i>
<i class="fa fa-search fa-lg fa-5x"></i>
```

展示效果：
<i class="fa fa-search fa-lg fa-lg"></i>
<i class="fa fa-search fa-lg fa-2x"></i>
<i class="fa fa-search fa-lg fa-3x"></i>
<i class="fa fa-search fa-lg fa-4x"></i>
<i class="fa fa-search fa-lg fa-5x"></i>

只要使用这种格式，可以在任意地方使用Font Awesome的icon。

{% endcapture %}

{% include templates/home.md %}
