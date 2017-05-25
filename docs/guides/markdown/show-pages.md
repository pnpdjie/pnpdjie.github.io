---
title: 引用页面的方式
---

{% capture article %}

## 加入一个内嵌页面

使用html代码中的iframe标签，但要注意将网址中的&替换为`&amp;`,将<替换为`&lt;`，将>替换成`&gt;`。

使用代码

	<iframe src="http://blog.shengbin.me/posts/iframe-in-markdown-of-jekyll" width="700px" height="500px"></iframe>

之后，实际效果如下：

<iframe src="http://www.baidu.com" width="700px" height="500px"></iframe>


{% endcapture %}

{% include templates/home.md %}
