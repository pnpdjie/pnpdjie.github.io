---
title: Linux安装Jekyll
---

{% capture article %}

本文记录在Linux系统（CentOS和ubuntu）中安装Jekyll的流程。

一般步骤是安装Ruby，node.js，Jekyll。

Jekyll是用Ruby开发的，首先要安装Ruby。

安装Jekyll需要使用Ruby的开发工具包Gem，而Gem管理需要用到nodejs环境，所以要安装node.js。

## CentOS安装Jekyll

### 安装Ruby

**安装Ruby Version Manager（RVM ）**

RVM是Ruby的版本管理工具。

	gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
	curl -sSL https://get.rvm.io | bash -s stable

**载入RVM**

	source /etc/profile.d/rvm.sh

**检查RVM是否安装成功**

	rvm -v
	
	
如果出现版本说明则安装成功。
	
**安装ruby**

	rvm install INTERPRETER[-VERSION] OPTIONS 
	
*省略VERSION，默认安装最新stable版本*

*省略INTERPRETER，默认安装MRI ruby*

**设置ruby版本**

	rvm 2.4.0 --default
	
### 安装node.js

在此使用源码方式安装node.js。

**下载最新版本源码**

	cd /usr/local/src/
	wget https://nodejs.org/dist/v6.10.3/node-v6.10.3.tar.gz 
	
*使用最新版本下载路径替换wget命令后的路径*
	
**解压**
	
	tar zxvf node-v6.10.3.tar.gz
	
**编译安装**

	cd node-v6.10.3
	./configure --prefix=/usr/local/node/6.10.3 
	make
	make install

### 配置NODE_HOME

**编辑profile环境变量**

	vi /etc/profile

**设置nodejs环境变量**

在 export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL 一行的上面添加如下内容:

	#set for nodejs
	export NODE_HOME=/usr/local/node/6.10.3
	export PATH=$NODE_HOME/bin:$PATH

*按i键，进入编辑状态*
*按esc键，输入:wq保存并退出*

**编译**

编译/etc/profile 使配置生效。
 
	source /etc/profile

**验证node.js是否安装配置成功**
 
 	node -v
 	
npm模块安装路径：/usr/local/node/6.10.3/lib/node_modules/

### 安装jekyII

	gem install jekyll

### 试试jekyll

生成目录

	jekyll new myblog
	
运行

	cd myblog
	jekyll serve
	 
使用`--detach`脱离终端在后台运行, 如果你想关闭服务器，可以使用`kill -9 1234`命令，"1234" 是进程号（PID）。如果你找不到进程号，那么就用`ps aux | grep jekyll`命令来查看，然后关闭服务器。
 
	jekyll serve --detach

使用`--watch`查看变更并且自动再生成

	jekyll serve --watch
	
访问地址

	http://127.0.0.1:4000

### 错误解决

安装过程中可能遇到的问题

	Dependency Error: Yikes! It looks like you don't have bundler or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- bundler' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
	jekyll 3.4.3 | Error:  bundler
		

解决办法：安装jekyll时候直接运行gem install bundler即可解决

## Ubuntu安装Jekyll

### 安装Ruby
	
	sudo apt install ruby
	sudo apt-get install ruby-dev
	
### 安装依赖

	sudo apt-get install python-software-properties  
	sudo add-apt-repository ppa:chris-lea/node.js  
	sudo apt-get update  
	sudo apt-get install nodejs  

### 安装jekyII

	sudo gem install jekyll

{% endcapture %}

{% include templates/home.md %}
