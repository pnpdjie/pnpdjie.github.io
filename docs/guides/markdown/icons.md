---
title: 行内图片和icon展示
choose: true
---

{% capture article %}

## 选择Font icon

Font icon时矢量图标，不需要图像就可以使用，目前有两种：Font Awesome和Glyphicons。Font Awesome可以独立使用，而Glyphicons是Bootstrap的一部分，需要引入bootstrap库才能使用。

## Font Awesome

Font Awesome是一个Font icon库，不需要图片就可以使用。

下载地址：[http://fontawesome.io/](http://fontawesome.io/)

所有可用icon：[http://fontawesome.io/icons/](http://fontawesome.io/icons/)

### 引入Font Awesome

将下载的Font Awesome库文件放到`css`目录，并以`font-awesome`重命名。

在`_includes/head.html中`加入代码：

```html
<link rel="stylesheet" href="/css/font-awesome/css/font-awesome.css">
```

### 使用Font Awesome

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

使用这种格式，可以在markdown文档任意地方使用Font Awesome的icon。

## Glyphicons

Glyphicons的使用和Font Awesome类似。

Bootstrap下载地址：[http://getbootstrap.com/](http://getbootstrap.com/)

所有可用icon：[http://getbootstrap.com/components/#glyphicons](http://getbootstrap.com/components/#glyphicons)

### 引入Bootstrap

将下载的Bootstrap下载地址库文件放到`css`目录，并以`bootstrap`重命名。

在`_includes/head.html中`加入代码：

```html
<link rel="stylesheet" href="/css/bootstrap/css/bootstrap.css">
<script src="/css/bootstrap/js/bootstrap.min.js"></script>
```

### 使用Glyphicons

使用Glyphicons需要用`span`标签，例如：

```html
<span class="glyphicon glyphicon-picture"></span>
```

展示效果：<span class="glyphicon glyphicon-picture"></span>

Bootstrap没有提供icon放大样式，在自定义的sass样式文件中添加如下代码可以实现放大icon：

```sass
.gi-2x
  font-size: 2em
.gi-3x
  font-size: 3em
.gi-4x
  font-size: 4em
.gi-5x
  font-size: 5em
```

css样式文件中代码格式和sass不同：

```css
.gi-2x{font-size: 2em;}
.gi-3x{font-size: 3em;}
.gi-4x{font-size: 4em;}
.gi-5x{font-size: 5em;}
```

放大icon方法如下：

```html
<span class="glyphicon glyphicon-picture gi-2x"></span>
<span class="glyphicon glyphicon-picture gi-3x"></span>
<span class="glyphicon glyphicon-picture gi-4x"></span>
<span class="glyphicon glyphicon-picture gi-5x"></span>
```

展示效果：
<span class="glyphicon glyphicon-picture gi-2x"></span>
<span class="glyphicon glyphicon-picture gi-3x"></span>
<span class="glyphicon glyphicon-picture gi-4x"></span>
<span class="glyphicon glyphicon-picture gi-5x"></span>

使用这种格式，可以在markdown文档任意地方使用Glyphicons的icon。

{% endcapture %}

{% include templates/home.md %}
