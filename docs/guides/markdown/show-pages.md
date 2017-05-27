---
title: 引用页面的方式
---

{% capture article %}

## 引用另一个md文件的内容
在md文件中 使用代码

   {% raw %}
   
   {% include templates/test.md %} 
   
   {% endraw %}
   
在大括号中加入引用的地址

引用地址为_include/templates下的home.md文件。

必须在_include/目录下，后面的templates文件夹可自定义。

下面为被引用的md文件内容


 
{% include templates/test.md %}

{% endcapture %}

{% include templates/home.md %}
