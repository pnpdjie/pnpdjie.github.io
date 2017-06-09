---
title: 术语展示
---

{% capture article %}

Bootstrap可以在任意文字上添加提示信息，适用于缩写和专用术语。[引入Bootstrap](icons.html#引入bootstrap)即可使用。

## 定义术语库

在`_data`目录创建文件`glossary.yml`，在其中定义所有术语。写法如下：

{% raw %}
```liquid
ONAP: Open Network Automation Platform
HTTP: HyperText Transfer Protocol
```
{% endraw %}

冒号前是术语，冒号后是术语描述，冒号和描述中间必须加一个空格。

## 创建include文件

在`_includes`目录创建文件`glossary.html`，内容如下：

{% raw %}
```html
<span class="glossary" data-toggle="tooltip" data-original-title="{{site.data.glossary[include.glossary]}}">{{include.glossary}}</span>
```
{% endraw %}

{% raw %}`{{include.glossary}}` {% endraw %}是传到`glossary.html`的术语名词。

{% raw %}`{{site.data.glossary[include.glossary]}}`{% endraw %}取`glossary.yml`中定义好的术语描述。

## 定义术语样式

在`_sass/_base.sass`文件中加入术语样式，内容如下：

```sass
.glossary
  color: #649345
  font-style: italic
  cursor: pointer
```
## 使用术语

术语使用方法如下：

{% raw %}
```liquid
{% include glossary.html glossary="ONAP" %} is an open source software platform that delivers capabilities for the design, creation, orchestration, monitoring.
```
{% endraw %}

`glossary="ONAP"`表示将`glossary`参数传到`glossary.html`，其值为`ONAP`。

展示效果：{% include glossary.html glossary="ONAP" %} is an open source software platform that delivers capabilities for the design, creation, orchestration, monitoring.

如果术语没有提示信息，可能是因为在`_data/glossary.yml`中没有定义该术语。

{% endcapture %}

{% include templates/home.md %}
