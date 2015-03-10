// 追加配置
seajs.config({
    alias: {
        'holder': {
            src: './tools/test-js/holder'
        },
        'placeholder': { // 注册jQuery插件为CMD模块
            src: './tools/test-js/placeholder.min',
            deps: ['$']
        },
        'lorem-cn': { // 注册类似jQuery一样提供全局方法的模块
            src: './tools/test-js/lorem-cn.min',
            exports: 'lorem' // 将全局方法exports出来就可以在require的时候用了
        }
    }
});

// seajs.use 中的*相对路径*始终相对当前页面来解析
seajs.use('./app/mod/a', function(a) {
    // seajs.log判断了是否有console.log可用, 本身的出发点是方便调试,
    // 但这样造成控制台中输出的所有日志都指向是seajs发出来的, 却给调试带来了麻烦,
    // 无法定位到真正发出console的语句, 因此不建议使用seajs.log
    // 详细情况看控制台顿悟
    // use: 1.8.3    sea.js:10
    seajs.log('use: ' + a.version(), 'info');
    // use 5         main.js:25
    console.log('use', a.random(1, 100));
});