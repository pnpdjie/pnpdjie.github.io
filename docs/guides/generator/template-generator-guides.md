---
title: 使用说明
---

{% capture article %}

## 选择Jekyll项目

点击`浏览`，选择正确的Jekyll项目路径，如下图。
![选择Jekyll项目](/images/docs/guides/generator/template-generator-launcher.png)

点击`确定`，进入主界面。

## 主界面

主界面分为标题、菜单、工作区三部分，如下图：
![主界面](/images/docs/guides/generator/template-generator-main.png)

* 标题：显示打开的Jekyll项目路径

* 菜单：分为2个，创建和切换

  * 创建：创建Jekyll导航以及导航模板，已创建的导航禁用![菜单-创建](/images/docs/guides/generator/template-generator-menu-create.png)

  * 切换：切换Jekyll项目，重新初始化主界面![菜单-创建](/images/docs/guides/generator/template-generator-menu-switch.png)

* 工作区：处理用户所有操作
  
  * 已创建导航：所有Jekyll导航数据，上图打开的Jekyll项目导航有4个：Documentation Home,User Guides,Setup,Install

    * 简称：左上菜单的名称

    * 全称：左侧导航上方的描述文字

    * 导航数据文件路径/内容：导航对应的`_data`目录下的数据文件路径以及内容

    * 主页文件路径/内容：导航对应的`docs`目录下的index.md文件路径以及内容

## 创建导航

打开菜单`创建-导航-[Menu]`，`[Menu]`为模板中定义的Jekyll导航，出现创建确认提示。

![创建导航确认框](/images/docs/guides/generator/template-generator-create-menu-confirm.png)

点击`确认`开始创建Jekyll导航，弹出进度条窗口显示执行进度及日志，进度条到100%表示导航创建成功，标题变成`执行成功`，如下图所示：

![创建导航进度条](/images/docs/guides/generator/template-generator-create-menu-progress.png)

日志打印到文件，路径在日志最下方。

### 验证是否创建成功

在该Jekyll项目根目录运行命令`jekyll serve`，打开页面，查看上一步创建的导航是否存在。

## 创建导航模板

打开菜单`创建-导航模板`，在工作区显示创建导航模板界面。

![创建导航模板](/images/docs/guides/generator/template-generator-create-menutype.png)

* 输入导航简称，要求：不含空格和特殊字符，只能包含小写英文字母。

* 输入导航全程，要求：不含特殊字符，只能包含大小写英文字母、数字和空格。

* 点击`选择模板`选择导航模板文件，要求：必须md格式，可以选择多个。

按要求输入简称和全称，选择模板后界面如下：

![选择导航模板](/images/docs/guides/generator/template-generator-create-menutype-input.png)

点击`创建`开始创建Jekyll导航模板，弹出进度条窗口显示执行进度及日志，进度条到100%表示导航模板创建成功，标题变成`执行成功`，如下图所示：

![创建导航进度条](/images/docs/guides/generator/template-generator-create-menutype-progress.png)

日志打印到文件，路径在日志最下方。

### 验证是否创建成功

打开菜单`创建-导航`，最下方出现上一步创建的导航表示导航模板创建成功。

![创建导航进度条](/images/docs/guides/generator/template-generator-create-menutype-success.png)

{% endcapture %}

{% include templates/home.md %}
