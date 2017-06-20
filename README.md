# 火狐浏览器的钉钉消息通知

## 效果

在有新消息时，将提示通知：

![1](https://user-images.githubusercontent.com/16647246/27315756-0d224ae4-55ae-11e7-9f44-b11c3a47d960.png)

## 安装使用

嫌麻烦，所以没有搞sign，需要先把火狐浏览器的配置项关掉：

1. 打开火狐浏览器，在地址栏输入： `about:config`，会有一个风险提示，点击确定
2. 在打开的页面上搜索 `xpinstall.signatures.required` 这一项，默认这个配置项是`true`，双击该项将它设置为`false`。

然后下载`dingding.xpi`文件，在火狐浏览器中，按`ctrl+o`选择刚刚下载的xpi文件，提示是否安装，选择是

## 开发修改

### 开发环境安装

> 火狐插件的开发需要用到python 2.6/2.7/2.8

确保python已安装之后，按以下操作：

```
mkdir ～/firefox && cd ~/firefox  # 创建一个开发目录
wget https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.tar.gz  # 下载开发sdk
tar -xf jetpack-sdk-latest.tar.gz  # 解压缩，当前目录会新增一个 addon-sdk-1.17 文件夹
cd addon-sdk-1.17  # 进入刚才解压的文件夹
source bin/activate  # 运行sdk
```

此时，命令提示符现在应该有一个包含SDK的根目录名称的新的前缀：

```
(addon-sdk-1.17)lan@Lan-ubuntu:~/firefox/addon-sdk-1.17$
```

如果希望在其他目录下也可以执行开发命令，需要做个软链接或修改PATH：

Ubuntu下：

```
sudo ln -s /home/lan/firefox/addon-sdk-1.17/bin/cfx /usr/bin/cfx
```

**注意点**

- `ln`的第二个参数必须是绝对地址，否则无法指向
- `/usr/bin/`是一个可以执行的目录，该目录在PATH环境变量中，如果你不确定自己的可执行目录是哪个，可以在命令行中打印一下：`echo $PATH`

Windows下：

使用 bin\activate\activate.bat批处理脚本

或

右键我的电脑，选择属性，在打开的页面左侧选择高级设置，将打开一个小弹窗，在这个小弹窗的右下角有`环境变量`字样，点击并选择 `PATH`，在输入框最后加上sdk所在目录：

```
;D:/firefox/addon-sdk-1.17/bin/;
```

在命令行中，输入：`cfx`，如果打印出一些提示信息，则表明安装完成：

```
Usage: cfx [options] [command]
```

### 调试修改

下载代码（ https://github.com/ionepub/firefox-dingtalk-notify/archive/master.zip ），解压到 `firefox/dingding`下；

其中：
`lib/main.js` 是核心js文件，
`data/checkTitle.js` 是插件真正起作用的文件，里面的代码功能是：请求通知权限，当检测到`im.dingtalk.com`的标题变化时，发出消息通知

修改代码之后，在`dingding`目录下执行：

```
cfx run
```

将运行一个安装有此插件的火狐浏览器（这个浏览器是全新的，需要重新设置 `xpinstall.signatures.required` ）

### 打包插件

在`dingding`目录下执行：

```
cfx xpi
```

如果命令行中提示以下内容，则表示打包完成：

```
Exporting extension to dingding.xpi.
```

此时，`dingding`文件夹下的`dingding.xpi`文件将被覆盖，在浏览器中重新导入即可。

### 参考资料

安装开发环境：https://developer.mozilla.org/zh-CN/Add-ons/SDK/Tutorials/Installation

简单开发教程：https://segmentfault.com/a/1190000004058667

软链接设置：http://www.2cto.com/os/201411/348552.html

未签名组件被禁用：https://support.mozilla.org/zh-CN/kb/add-ons-signing-firefox?as=u&utm_source=inproduct

页面注入js和css：https://developer.mozilla.org/zh-CN/Add-ons/SDK/Tutorials/Modifying_Web_Pages_Based_on_URL

HTML5通知：http://blog.csdn.net/liuhe688/article/details/41971215
