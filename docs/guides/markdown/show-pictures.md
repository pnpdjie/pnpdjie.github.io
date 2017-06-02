---
title: 引用图片方式
---

{% capture article %}


## 引用图片

格式为：

	![图片名称](图片地址 "悬停显示")

其中的小括号中的图片地址既可以使用网络图床中图片的链接，也可以使用项目本地图片的路径；“悬停显示”是指鼠标悬停在图片上时显示的信息，与地址之间有一个空格。

代码实例及显示效果：

	![玉龙雪山](http://b378.photo.store.qq.com/psb?/V13f2fdp2KFdb0/EuAA*UN7XwQUvIPQvpqlFYue83qdLuqB.jv0OETzj20!/b/dA*pVeGTPwAA&bo=6gOAAkAG*gMFAPM!&rf=viewer_4 "2017.6.2")

![玉龙雪山](http://b378.photo.store.qq.com/psb?/V13f2fdp2KFdb0/EuAA*UN7XwQUvIPQvpqlFYue83qdLuqB.jv0OETzj20!/b/dA*pVeGTPwAA&bo=6gOAAkAG*gMFAPM!&rf=viewer_4 "2017.6.2")

{% endcapture %}

{% include templates/home.md %}
