var fs = require('fs')

var request = require('sync-request')
var cheerio = require('cheerio')

// 伪装登录爬虫以知乎为例
// 需要使用 cookie 和 user-agent，这两个内容放在了 config.js 中
// 使用 require 的方式获取 cookie 和 user_agent
var { cookie, user_agent } = require('./config')

class Message {
    constructor() {
        // 分别是电影名/评分/引言/排名/封面图片链接
        this.content = ''
    }
}

var log = console.log.bind(console)

var messageFromDiv = (div) => {
    var e = cheerio.load(div)

    var message = new Message()
    var c = e('.content').text()
    if (c !== '') {
        message.content = c
        return message
    }

}

var ensurePath = (path) => {
    var exists = fs.existsSync(path)
    if (!exists) {
        fs.mkdirSync(path)
    }
}

var cachedUrl = (url) => {

    var path = 'cached_html'
    ensurePath(path)
    var name = url.split('/p.')[1]
    var cacheFile = `${path}/${name}.html`

    var exists = fs.existsSync(cacheFile)
    if (exists) {
        var data = fs.readFileSync(cacheFile)
        return data
    } else {
        var options = {
            'headers': {
                'user-agent': user_agent,
                'cookie': cookie,
            }
        }

        var res = request('GET', url, options)
        var page = res.getBody('utf8')
        fs.writeFileSync(cacheFile, page)
        return page
    }
}

var messagesFromUrl = (url) => {
    var body = cachedUrl(url)
    var e = cheerio.load(body)

    var messageDivs = e('li')
    var messages = []
    for (var i = 0; i < messageDivs.length; i++) {
        var div = messageDivs[i]
        var m = messageFromDiv(div)
        if (m) {
            messages.push(m)
        }
    }
    // log('messages', messages)
    return messages
}

var saveMessages = (messages) => {
    var s = JSON.stringify(messages, null, 2)
    var path = 'myFanfou.txt'
    fs.writeFileSync(path, s)
}

var __main = () => {
    var messages = []
    for (var i = 1; i <= 100; i++) {
        var url = `http://fanfou.com/twoheart/p.${i}`
        var messageInPage = messagesFromUrl(url)
        messages = [...messages, ...messageInPage]
    }
    saveMessages(messages)
}

__main()
