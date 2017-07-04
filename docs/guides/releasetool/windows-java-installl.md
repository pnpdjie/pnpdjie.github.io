---
title: windows配置java环境
---

## 下载  

    JDK是个免费开源的组件，所以建议直接去官网下载最新版本，比较安全，官网地址：

    http://www.oracle.com/technetwork/java/index.html

界面样式：

![](/images/docs/guides/releasetool/1.1.1_1.png "配置java环境_下载")

    版本是在随时更新的，也许过了几个月之后网页的界面和版本又不同了。图中浅蓝色圈中为需要下载的JDK版本，这里选择的是Java标准版，就个人使用而言，推荐下载标准版。

    点击之后，就会进入这一一个界面：

![](/images/docs/guides/releasetool/1.1.1_2.png "配置java环境_下载")

再点击蓝圈中的图标，进入之后，往下拉点就会看到以下界面：

![](/images/docs/guides/releasetool/1.1.1_3.png "配置java环境_下载")

选择左边蓝框中的接受选项，不然无法下载。一般我们用的都是windows系统，其中x86是32位的，x64是64的，根据你自己的系统选择相应的下载，如我现在用的是64的系统，所以我选择windows x64后面的下载链接，点击之后开始下载。

![](/images/docs/guides/releasetool/1.1.1_4.png "配置java环境_下载")

下载完成后是这个样子。

![](/images/docs/guides/releasetool/1.1.1_5.png "配置java环境_下载")

## 安装

双击下载下来的安装文件

![](/images/docs/guides/releasetool/1.1.2_1.png "配置java环境_安装")

点下一步

![](/images/docs/guides/releasetool/1.1.2_2.png "配置java环境_安装")

选择第一个选项。  
这里可以选择安装路径，也可以默认安装，看各人习惯了。如果更改路径最好不要放在中文或者带空格的目录下，以免将来出现不必要的麻烦。  
选好安装路径后点击下一步开始安装。

![](/images/docs/guides/releasetool/1.1.2_3.png "配置java环境_安装")

      这是要安装JRE，JRE是Java的运行环境，包括了JVM等一些Java的运行环境，但是在之前安装的JDK里面已经有了JRE了，所以这里可以选择取消。当然，装了也没关系。  
      点击下一步。

![](/images/docs/guides/releasetool/1.1.2_4.png "配置java环境_安装")

      安装完成。

## 配置环境变量

在“我的电脑”上右键，选择属性

![](/images/docs/guides/releasetool/1.1.3_1.png "配置java环境_配置环境变量")

点击高级系统设置

![](/images/docs/guides/releasetool/1.1.3_2.png "配置java环境_配置环境变量")

选择“高级”选项卡，在里面点击“环境变量”

![](/images/docs/guides/releasetool/1.1.3_3.png "配置java环境_配置环境变量")

![](/images/docs/guides/releasetool/1.1.3_4.png "配置java环境_配置环境变量")

   在下方的“系统变量”里面点击“新建”，会弹出一个窗口。  
新建JAVA_HOME：
点击新建——>变量名：`JAVA_HOME`，变量值：你的java所在路径，如这是我的安装路径：`E:\Java\jdk1.7.0_21`，这个值只要到这目录就可以了，不要在后面加\bin等东西了。

![](/images/docs/guides/releasetool/1.1.3_5.png "配置java环境_配置环境变量")

编辑path：
找到path变量——>选中——>点击编辑或双击——>不要改其他的东西，在最前面加上`%JAVA_HOME%\bin;`，分号不能少，而且必须是英文的分号。

![](/images/docs/guides/releasetool/1.1.3_6.png "配置java环境_配置环境变量")

新建classpath：
点击新建——>变量名：`classpath` ,
变量值：`.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`，注意前面有点和分号

![](/images/docs/guides/releasetool/1.1.3_7.png "配置java环境_配置环境变量")

## 检验

   究竟是不是设置好了，还需要我们去检验下，方法：
快捷键win+R——>输入cmd——>分别输javac和java，如图：

![](/images/docs/guides/releasetool/1.1.4_1.png "配置java环境_校验")

输入javac回车之后出现

![](/images/docs/guides/releasetool/1.1.4_2.png "配置java环境_校验")

输入java回车后出现

![](/images/docs/guides/releasetool/1.1.4_3.png "配置java环境_校验")

那就表示设置成功了。
