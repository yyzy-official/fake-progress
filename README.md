# Fake-Progress

一个高度逼真的命令行任务模拟工具，可生成虚假但可信的进度条、日志和任务状态。

## 安装

```bash
npm install -g .
```

## 基本用法

在项目根目录下执行启动命令: 
```bash
node bin/fake-progress
```

也可以参照如下参数说明自定义配置参数:
```bash
node bin/fake-progress --type install --time 30 --fail-chance 0.2 --tasks 2
```

## 参数说明

| 参数            | 说明                       | 示例                      |
|-----------------|----------------------------|---------------------------|
| --type          | 任务类型 (install/compile/download) | --type install           |
| --time          | 任务持续时间（秒）         | --time 20                 |
| --fail-chance   | 失败概率 (0~1)             | --fail-chance 0.3         |
| --tasks         | 串行任务数                 | --tasks 3                 |
| --scenario      | 预设场景                   | --scenario npm-install    |

## 预设场景

- npm-install：模拟 npm 安装依赖
- cpp-compile：模拟 C++ 编译
- file-download：模拟文件下载

示例：
```bash
fake-progress --scenario npm-install
```

## 跨平台支持

支持 Windows、macOS、Linux。

## 音效

任务成功/失败时自动播放提示音。

---

如有问题或建议，欢迎反馈！

## 商务合作

我们可以承接各种正经的, 不正经的项目与需求！
例如小程序, 网站, app, 小工具等

欢迎来撩!
WeChat: yyzy-cn
Email: service@yyzycn.cn
![企业微信](./商务合作.jpg)