# Remix中文版

Remix是以太坊官方开源的Solidity在线集成开发环境，可以使用Solidity语言在网页内完成以太坊智能合约的在线开发、在线编译、在线测试、在线部署、在线调试与在线交互，非常适合Solidity智能合约的学习与原型快速开发。

Solidity IDE中文版Remix由汇智网提供，国内CDN加速，访问地址：[http://remix.hubwiz.com](http://remix.hubwiz.com)。

> 如果要快速掌握以太坊智能合约与DApp开发，推荐汇智网的[以太坊开发系列教程](http://www.hubwiz.com/course/?type=%E4%BB%A5%E5%A4%AA%E5%9D%8A&affid=github7878)。

Solidity IDE Remix为左中右三栏布局，左面板为Remix文件管理器，中间为文件编辑器，
右侧为开发工具面板：

![solidity ide remix](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/snap-1.png)

英文版说明：[README-en.md](README-en.md)

## 1、Solidity IDE Remix文件管理器

Remix左面板中的文件管理器，用来列出在浏览器本地存储中保存的文件，分为browser和config两个目录，
当你第一次访问Remix的时候，在browser目录下有两个预置的代码：ballot.sol合约以及对应的单元测试
文件ballot_test.sol，点击文件名就可以在中间的文件编辑器中查看并编辑代码：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/file-explorer.png)

Remix文件管理器顶部的工具栏提供创建新文件、上传本地文件、发布gist等快捷功能，你可以将鼠标移到
相应的图标处停顿，然后查看功能的浮动提示信息。

为了后续功能的学习，你可以点击左上角的`+`创建一个新的solidity合约文件，在弹出的对话框中，将
文件命名为hello.sol：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/new-file.png)

点击[ok]按钮后，你就可以看到在左面板的文件管理其中browser目录下出现了`hello.sol`文件名，
同时在中间区域的文件编辑器中自动打开了这个新创建的文件等待编辑，现在它还是空的，我们将在下面
编写简单的Solidity代码。


## 2、Solidity IDE Remix编辑器及终端

Solidity IDE Remix中间区域为上下布局，分别提供文件编辑功能和终端访问功能。

### 2.1 Remix文件编辑器

Solidity IDE Remix中间区域上方的文件编辑器支持同时打开多个文件，当前激活的文件，其文件名以粗体显示：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/file-editor.png)

Remix文件编辑器顶部左右两侧的箭头，分别用来切换左右面板的显示与隐藏；左上角的`+`和`-`，
分别用来放大或缩小编辑器里的文本字体大小。

现在我们激活`hello.sol`文件，然后输入简单的合约代码：

```
pragma solidity ^0.5.1;

contract Hello{
    function echo(string memory text) public pure returns(string memory) {
        return text;
    }
}
```

基本上这是最简单的以太坊合约了，它只有一个`echo()`方法，作用就是把输入的字符串
再原样返回。

### 2.2 Remix终端

Solidity IDE Remix中间区域下方为终端，可以输入JavaScript命令与Remix IDE或区块链节点交互：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/terminal.png)

Remix终端内置了web3.js 1.0.0、ether.js、swarmgy以及当前载入的Solidity编译器，因此你可以
在终端内使用熟悉的web3 API与当前连接的区块链节点交互。

Remix终端同时也内置了remix对象，可以利用它来脚本化地操作Solidity Remix IDE，例如载入指定
url的gist，或者执行当前显示的代码。将终端显示向上滚动到开始位置，就可以看到remix对象的
常用方法描述。

Remix终端的另一个作用是显示合约执行或静态分析的运行结果。例如，当你部署一个合约后或执行
一个合约方法后，就会在终端看到它的执行信息：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/terminal-output.png)

点击信息行右侧的下拉图标，就可以查看该信息的详情；点击[debug]按钮，就会打开右侧面板中的
调试页对合约进行单步或断点调试。

Remix终端顶部的工具栏提供了切换终端显示状态、清理终端输出等功能，显示待定交易的量，
选择监听交易的范围，也可以搜索历史交易。

## 3、Solidity IDE Remix功能面板

Solidity IDE Remix的右侧为功能面板，以选项页的方式提供编译、运行、静态分析、测试、
调试、设置和技术支持功能。

### 3.1 编译选项页

在编译选项页，你可以点击下拉框切换当前要使用的Solidity编译器版本：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/compile-tab-1.png)

然后点击[开始编译]按钮，就会编译Remix文件编辑器中当前选中的代码文件，比如我们的
hello.sol文件。编译完成后，如果没有编译错误，就可以看到合约名字Hello出现在编译
选项页的合约下拉框中：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/compile-tab-2.png)

可以点击[swarm]按钮将编译好的合约上传到Swarm网络，或者点击[详情]按钮查看编译
结果详情，也可以点击[ABI]或[字节码]按钮，分别将合约的ABI与字节码拷贝到系统剪切板
以便在其他程序中使用。

### 3.2 运行选项页

在运行选项页，可以部署编译好的合约，也可以执行已部署合约的方法：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/run-tab-1.png)

节点环境选项提供三种选择：JS虚拟机、注入Web3对象或使用web3提供器。

- JS虚拟机是一个JS版本的以太坊虚拟机实现，它运行在你的浏览器内，因此你不需要考虑
  节点配置或者担心损失以太币，最适合学习和快速原型验证。
- 如果你的浏览器安装了Metamask插件，或者使用Mist之类的以太坊兼容浏览器，那么也
  可以选择第二个环境：使用注入的Web3对象。
- 如果你有自己的节点，那么可以选择第三个选项*使用web3提供器*来让Remix连接
  到你的节点上，不过如果要连接的节点是接入以太坊主网的，要注意每一次交易都是
  有成本的！

如果之前有编译好的合约，在运行选项页就可以看到这个合约的名字，例如我们的Hello。
点击[部署]按钮就可以将这个合约部署到我们选定的节点环境了：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/run-tab-2.png)

现在可以看到，*已部署的合约*区域，已经出现我们的合约了。点击这个合约实例，
可以看到我们为Hello合约定义的echo方法自动显示出来了：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/deployed-contract.png)

在方法名后面的输入框里输入方法参数，例如"helloooooooooooooo"，然后点击方法名，
就可以执行合约的方法了：

![solidity ide remix file explorer](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/call-contract.png)

你看到，返回值的确和我们输入的参数是一样的，我们实现了预定目标！

### 3.3 其他选项页

Solidity　Remix集成开发环境还有很多功能值得研究，这个工作留给你自己了。我们只对其他
的选项页做简单介绍：

- **分析**选项页提供对Solidity合约代码的静态分析选项。
- **测试**选项页提供单元测试能力，你可以生成一个测试文件，或者执行一组测试。
- **调试器**选项页可以单步跟踪合约的执行、查看合约状态或局部变量等。
- **设置**选项提供Solidity Remix IDE本身的一些参数调整能力，例如设置编辑器文本自动折行、
  启用插件、设置gist访问令牌，或者切换Remix IDE的皮肤主题 —— 目前只有三个：浅色、深色和净色。
  
---
原文：[Solidity IDE Remix中文版 - 汇智网](http://blog.hubwiz.com/2019/04/29/solidity-ide-remix-cn/)
