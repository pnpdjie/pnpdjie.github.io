---
title: Markdown属性过滤
choose: true
---

{% capture article %}

## 过滤属性

 {% raw %}
 
 在头文件配置参数 choose: true
 
 {% if page.choose%}
 
 通过当前页面的属性判断是否显示这句话
 
 {% endif%}

 {% endraw%}
 
{% if page.choose%}
 通过当前页面的属性判断是否显示这句话
{% endif%}
{% endcapture %}

{% include templates/home.md %}
