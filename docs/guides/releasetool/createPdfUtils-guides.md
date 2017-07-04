---
title: 离线发布工具使用说明
---

{% capture article %}

1. 将jekll项目下载到本地，并安装jekyll相关插件。（具体下载及安装方式请参考jekyll相关文档）  
2. 选择“离线发布”选项卡，点击右上方的“select file”按钮，在弹出窗口中选择jekyll项目的根路径文件夹，并确定  
 ![](/images/docs/guides/releasetool/2.2.1_1.png "离线发布工具_使用说明")  
3. 点击左侧“create tree”按钮，生成jekyll项目的页面目录树形多选框，并在其中勾选想要打印的页面。  
4. 选择按钮功能说明：  
  - 下拉框：页面的总目录。只能在某一个总目录下选择想要打印的页面，不能跨总目录选择。
  - Select all：全选。勾选该总目录下所有的页面。
  - Select parent：自动勾选所有父节点。
  - Select children：自动勾选所有子节点。
  - 树形多选框：该总目录下的分目录列表。在其中勾选想要打印为pdf的页面。  
5. 选择完想要打印的页面之后，点击“发布html”按钮启动本地jekyll项目，右侧窗口会同步显示项目启动信息。  
6. 项目启动成功后，点击“html to pdf”按钮，将勾选页面保存为pdf文件。


{% endcapture %}

{% include templates/home.md %}
