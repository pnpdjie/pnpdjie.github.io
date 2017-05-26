---
title: 引用页面的方式
---

{% capture article %}

## 引用另一个md文件的内容
使用代码

	{% include templates/home.md %}

 
{% include templates/test.md %}

{% endcapture %}

{% include templates/home.md %}
