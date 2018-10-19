# 基于 Node.js 的 Fanfou Spider

## Introduction

使用了 `cheerio` 和 `sync-request` 两个第三方库实现了伪装登录爬虫，饭否网是国内最早的类 twitter 网站，用户活跃度高。
前段时间因微信之父张小龙与美团王兴于此处发表的消息引起热议。饭否网的消息仅限注册用户观看，因饭否网现已关闭注册，这里以技术研究为目的实现了可以爬取饭否任意用户主页的爬虫。

## Usage

1. Star 本项目
1. Clone 到本地
1. 在 `fanfou.js` 文件中第 `91` 行填写你需要爬取用户的 `userid`
1. 使用编辑器运行代码，在当前目录下生成的 `myFanfou.txt` 文件即为爬取的内容

## LICENSE

MIT © [twoheart](http://github.com/twoheartliu)