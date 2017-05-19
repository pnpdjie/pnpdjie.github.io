---
title: 引用图片方式
---

{% capture article %}


## 引用图片

格式为：

	![图片名称](图片地址)

其中的小括号中的图片地址既可以使用网络图床中图片的链接，也可以使用本地图片的路径。

## 加超链接

格式为：

	[超链接文字](超链接地址)

和引用图片的方式相比，只少了一个感叹号。

同样，也可以使用图片作为超链接，只要用引用的图片替换掉超链接文字即可，格式为：

	[![图片名称](图片地址)](超链接地址)

## 实例

下图即为引用的网络图片，同时加上了超链接，点击图片即可跳转到百度首页。

代码如下：

	[![玉龙雪山](http://b378.photo.store.qq.com/psb?/V13f2fdp2KFdb0/EuAA*UN7XwQUvIPQvpqlFYue83qdLuqB.jv0OETzj20!/b/dA*pVeGTPwAA&bo=6gOAAkAG*gMFAPM!&rf=viewer_4)](http://www.baidu.com)

[![keyabingo](http://b378.photo.store.qq.com/psb?/V13f2fdp2KFdb0/EuAA*UN7XwQUvIPQvpqlFYue83qdLuqB.jv0OETzj20!/b/dA*pVeGTPwAA&bo=6gOAAkAG*gMFAPM!&rf=viewer_4)](http://www.baidu.com)

{% endcapture %}

{% include templates/home.md %}
