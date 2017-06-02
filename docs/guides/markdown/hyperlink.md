---
title: 引用超链接
---

{% capture article %}

## 加超链接

格式为：

	[超链接文字](超链接地址 "悬停显示")

和引用图片的方式基本一致，只是开头没有感叹号。

代码实例及实际效果：

	[github](https://www.github.com "click here")
  
[github](https://www.github.com "click here")

{% endcapture %}

{% include templates/home.md %}
