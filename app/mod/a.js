/**
 * 定义模块, 遵循CMD规则, 开发阶段一个文件对应一个模块
 */
define(function(require, exports, module) {
    // 引入依赖模块
    var $ = require('$');
    // require 和 require.async 中的引入模块采用的*相对路径*相对当前模块路径来解析
    var b = require('./b');
    var lorem = require('lorem-cn');
    // 引入的是jQuery插件模块, 无需获得模块引用
    require('placeholder');
    require('holder');

    // 使用依赖的模块
    console.log('mod', $.fn.jquery);
    $('p:empty').placeholder();
    $('h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty').text(function() {
        return lorem(10);
    });

    // 导出本模块(可以是对象或者[构造]函数), 表明你写的模块提供哪些功能(向外提供接口)
    // 除了module.exports方式, 还可以通过直接return或exports来导出(公开)模块
    module.exports = {
        version: function() {
            return $.fn.jquery;
        },
        random: function(min, max) {
            return b.random(min, max);
        }
    };
});