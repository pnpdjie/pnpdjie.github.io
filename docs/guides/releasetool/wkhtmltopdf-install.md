---
title: 安装wkhtmltopdf
---

{% capture article %}

## 下载

官网下载地址：  
http://wkhtmltopdf.org/downloads.html  
上面有各种平台下安装的安装包。下面以 windows7平台上使用举例，我的下载的是stable(稳定版)的wkhtmltopdf-0.12.3.2-installer.exe这个版本，我在win7、win8 32位和64位以及win-sever上安装测试都没有问题的，系统时几位就下载几位的安装包。下载好以后直接安装就可以了，注意安装路径要记住，下面会用到的。 

![](/images/docs/guides/releasetool/1.2.1_1.png "安装wkhtmltopdf_下载")

如果是华为内网，且没有开通外网权限的人，可以设置华为openproxy之后，在我的github上下载windows64位版安装包。
下载地址：  
https://github.com/unicorn314/MDFilesCheckUtils_test/blob/master/wkhtmltox-0.12.4_msvc2015-win64.rar  

![](/images/docs/guides/releasetool/1.2.1_2.png "安装wkhtmltopdf_下载")

点击框中的download按钮下载，下载后解压就可以得到安装包。

## 安装

安装很简单，选择好安装路径后一直点击“确定”就可以了。  
不过要记住安装的路径，在下一步中要用到。

## 配置环境变量

安装好以后需要在系统环境变量变量名为”Path”的后添加：`;D:\wkhtmltopdf\bin` 也就是你安装的目录。安装好以后重启电脑。 
下图是如何设置环境变量：
在“我的电脑”上右键，选择“属性”

![](/images/docs/guides/releasetool/1.2.3_1.png "安装wkhtmltopdf_配置环境变量")

点击高级系统设置

![](/images/docs/guides/releasetool/1.2.3_2.png "安装wkhtmltopdf_配置环境变量")

选择“高级”选项卡，在里面点击“环境变量”

![](/images/docs/guides/releasetool/1.2.3_3.png "安装wkhtmltopdf_配置环境变量")

找到“系统变量”中的path变量，点击编辑，将刚刚的安装位置复制到最后，记得前面加一个分号。
如果是win10系统会直接让你新加一条地址进去，就不需要加分号了。

![](/images/docs/guides/releasetool/1.2.3_4.png "安装wkhtmltopdf_配置环境变量")

![](/images/docs/guides/releasetool/1.2.3_5.png "安装wkhtmltopdf_配置环境变量")

最后记得关闭cmd命令窗口再重新打开，否则环境变量无法生效。

## 测试使用效果

1、windows键+r打开搜索框，输入cmd,点击确定

![](/images/docs/guides/releasetool/1.2.4_1.png "安装wkhtmltopdf_使用测试")

2、直接在cmd里输入：wkhtmltopdf http://www.baidu.com/ D:website1.pdf(注意中间有空格哈)  
第一个是：运行软件命令（这个是固定的），第二个是网址，第三个是生成的pdf文件路径及文件名。

![](/images/docs/guides/releasetool/1.2.4_2.png "安装wkhtmltopdf_使用测试")

3、点击回车后，会看到一个进度条，然后就提示转换成功！

![](/images/docs/guides/releasetool/1.2.4_3.png "安装wkhtmltopdf_使用测试")

4、之后在相应位置（即刚刚设置的D盘）中会发现多了一个Pdf文件，就说明成功了

![](/images/docs/guides/releasetool/1.2.4_4.png "安装wkhtmltopdf_使用测试")

{% endcapture %}

{% include templates/home.md %}