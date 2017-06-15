---
title: 流程图
---

{% capture article %}

流程图的展示由左侧导航数据决定。

## 左侧导航

在导航数据文件中加入导航数据，以`Documentation-Guides`为例，在`_data/guides.yml`中加入导航数据。

### 简单流程

简单流程中一个流程对应一个页面，导航只有2层，第1层表示整个流程，第2层流程中具体步骤。

```liquid
- title: Simple Workflow
  workflow: true
  section: 
  - flow_title: Step 1
    path: docs/guides/workflow/simple/sample1.md
  - flow_title: Step 2
    path: docs/guides/workflow/simple/sample2.md
  - flow_title: Step 3
    path: docs/guides/workflow/simple/sample3.md
  - flow_title: Step 4
    path: docs/guides/workflow/simple/sample4.md
  - flow_title: Step 5
    path: docs/guides/workflow/simple/sample5.md
```

`workflow`：为true表示此导航需要使用流程图，以和其它导航数据区分。

`flow_title`：流程图方框中显示的流程说明。

`path`：流程图链接页面地址。

### 复杂流程

复杂流程中一个流程对应多个页面，导航只有3层，第1层表示整个流程，第2层流程中具体步骤，第3层单个步骤中包含的页面。

```liquid
- title: Complex Workflow
  workflow: true
  section: 
  - title: Step 1
    section:
    - docs/guides/workflow/complex/sample6.md
    - docs/guides/workflow/complex/sample7.md
    - docs/guides/workflow/complex/sample8.md
  - title: Step 2
    section:
    - docs/guides/workflow/complex/sample9.md
    - docs/guides/workflow/complex/sample10.md
    - docs/guides/workflow/complex/sample11.md
  - title: Step 3
    section:
    - docs/guides/workflow/complex/sample12.md
    - docs/guides/workflow/complex/sample13.md
    - docs/guides/workflow/complex/sample14.md
```

与简单流程不同的是，流程图方框中显示的流程说明由第2层中`title`定义。

## 流程图HTML代码段

创建流程图代码段文件`_includes/workflow.html`，在其中根据当前页面查询流程信息，输出流程图HTML代码。

在布局文件`_layouts/docwithnav.html`的正文标题下方加入如下代码：

{% raw %}
```
 {% include workflow.html tree=toc.toc %}
```
{% endraw %}

这样流程图就显示在页面中了。

### 简单流程

{% raw %}
```
{% if page.simple_map == true %}
<div class="user-map">
<div class="map-container">
  {% for item in include.tree %}
    {% if item.workflow == true and item.title == page.parent_map and item.section %}
      {% for subitem in item.section %}
          {% assign found_page = site.pages | where: "path", subitem.path | first %} 
          {% assign url = found_page.url %} 
          <div class="content">
          <a href="{{url}}">
          <div {% if found_page.path==page.path %}class="box active" {% else %}class="box" {% endif %}>{{subitem.flow_title}}</div>
          </a>
          </div>
          {% unless forloop.last %}<div class="arrow">→</div>{% endunless %}
      {% endfor %}
      {% break %}
    {% endif %}
  {% endfor %}
</div>
</div>
{% endif %}
```
{% endraw %}

### 复杂流程

{% raw %}
```
{% if page.complex_map == true %}
<div class="user-map">
<div class="map-container">
  {% for item in include.tree %}
    {% if item.workflow == true and item.title == page.parent_map and item.section %}
      {% for subitem in item.section %}
        {% assign first_url = "" %} 
        {% assign active_item = false %} 
        <ul style="display:none;">
        {% for children_subitem in subitem.section %}
          {% assign found_page = site.pages | where: "path", children_subitem | first %} 
          {% if forloop.first %}
            {% assign first_url = found_page.url %} 
          {% endif %}
          {% if found_page.path==page.path %}
            {% assign active_item = true %} 
          {% endif %}
          <li><a href="{{found_page.url}}">{{found_page.title}}</a></li>
        {% endfor %}
        </ul>
        <div class="content">
        <a href="{{first_url}}">
        <div {% if active_item %}class="box active" {% else %}class="box" {% endif %}>{{subitem.title}}</div>
        </a>
        </div>
        {% unless forloop.last %}<div class="arrow">→</div>{% endunless %}
      {% endfor %}
      {% break %}
    {% endif %}
  {% endfor %}
</div>
</div>
{% endif %}
```
{% endraw %}

## 流程页面头信息

流程对应的页面需要在头信息中加入和流程相关的数据。

### 简单流程

{% raw %}
```
---
title: Sample1
search: exclude
simple_map: true
parent_map: Simple Workflow
---
```
{% endraw %}

`simple_map`：为true表示使用简单流程

`parent_map`：[流程导航数据](#左侧导航)最上级导航title，定位当前页面所属流程的数据。

### 复杂流程

{% raw %}
```
---
title: Sample12
search: exclude
complex_map: true
parent_map: Complex Workflow
---
```
{% endraw %}

`complex_map`：为true表示使用复杂流程


{% endcapture %}

{% include templates/home.md %}
