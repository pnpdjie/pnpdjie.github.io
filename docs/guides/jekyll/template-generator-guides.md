---
title: 模板生成工具使用说明
---

{% capture article %}

## 选择Jekyll项目

点击`浏览`，选择正确的Jekyll项目路径，如下图。
![选择Jekyll项目](/images/docs/guides/jekyll/template-generator-launcher.png)

点击`确定`，进入主界面。

## 主界面

主界面分为标题、菜单、工作区三部分，如下图：
![主界面](/images/docs/guides/jekyll/template-generator-main.png)

* 标题：显示打开的Jekyll项目路径

* 菜单：分为2个，创建和切换

  * 创建：创建Jekyll导航以及导航类型，已创建的导航禁用![菜单-创建](/images/docs/guides/jekyll/template-generator-menu-create.png)

  * 切换：切换Jekyll项目，重新初始化主界面![菜单-创建](/images/docs/guides/jekyll/template-generator-menu-switch.png)

* 工作区：处理用户所有操作
  
  * 已创建导航：所有Jekyll导航数据，上图打开的Jekyll项目导航有4个：Documentation Home,User Guides,Setup,Install

    * 名称：导航唯一名

    * 导航数据文件路径/内容：导航对应的`_data`目录下的数据文件路径以及内容

    * 主页文件路径/内容：导航对应的`docs`目录下的index.md文件路径以及内容

## 创建导航

打开菜单`创建-导航-[Menu]`，`[Menu]`为模板中定义的Jekyll导航，出现创建确认提示。

![创建导航确认框](/images/docs/guides/jekyll/template-generator-create-menu-confirm.png)

点击`确认`开始创建Jekyll导航，弹出进度条窗口显示进度条及执行日志，进度条到100%表示导航创建成功，标题会变成`执行成功`，如下图所示：

![创建导航进度条](/images/docs/guides/jekyll/template-generator-create-menu-progress.png)

日志打印到文件，路径在日志最下方。

### 验证是否创建成功

在该Jekyll项目根目录运行命令`jekyll serve`，打开页面，查看上一步创建的导航是否存在。

## 创建导航类型

打开菜单`创建-导航类型`，在工作区显示创建导航类型界面。

![创建导航类型](/images/docs/guides/jekyll/template-generator-create-menutype.png)

{% endcapture %}

{% include templates/home.md %}
