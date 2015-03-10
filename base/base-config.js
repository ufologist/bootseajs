// 在URL中加入 ?seajs-debug 即可开启SeaJS Debug Console
// 在线本地调试大观
// http://lifesinger.wordpress.com/2011/07/24/online-local-debug/
seajs.config({
    // 加载插件
    // 插件的动态加载
    // 除了通过seajs.config来加载插件, 还可以通过在URL中添加特定参数来动态加载插件, 比如:
    // http://example.com/path/to/page.html?seajs-debug&seajs-nocache&seajs-text
    // 这样就会加载debug, nocache, text这3个插件
    plugins: ['shim'],
    // 配置shim插件，将普通js库转成CMD模块
    // https://github.com/seajs/seajs/issues/579
    // SeaJS中的模块默认都遵守CMD规范，但现实中已存在大量普通JavaScript类库,
    // 比如jQuery、Underscore等。使用shim插件, 可以将这些普通JS文件转换成CMD模块,
    // 从而能在SeaJS中正常使用
    alias: {
        '$': { // 这样后我们就可以通过require('$')来获取jQuery了
            src: 'jquery.min', // jQuery主要功能为DOM, 可以选择替换为更小更专注的Micro-framework
                               // src路径相对于seajs的base路径, 详见seajs模块标识
            exports: 'jQuery'
        },
        '_': {
            src: 'underscore-min', // underscore主要作为工具类, 类似Apache Commons
            exports: '_'
        },
        'bootstrap': { // bootstrap主要作为项目整体UI的scaffold
            src: 'bootstrap/js/bootstrap.min',
            deps: ['$', 'bootstrap-css', 'bootstrap-responsive-css']
        },
        'bootstrap-css': { // 通过require('css')的方式加载CSS会比直接在head中link要慢, HTML页面会出现短暂裸体状态, 因此可以考虑基础样式不通过seajs来管理
            src: 'bootstrap/css/bootstrap.min.css'
        },
        'bootstrap-responsive-css': { // 如果不想将CSS注册为模块, SeaJS支持任意CSS文件的加载, 直接require('file.css')即可
            src: 'bootstrap/css/bootstrap-responsive.min.css'
        }
    }
    // SeaJS 里版本号和时间戳管理的最佳实践
    // 加载css, js时路径自动追加时间戳, 例如jquery.min.js?20130328
    // http://lifesinger.wordpress.com/2011/08/01/best-practice-of-version-management/
    // XXX 并不完美, 暂不使用
    // 1. sea.js不会追加时间戳
    // 2. 由data-config载入的文件会加载两次, 一次为无时间戳版, 另一次为带时间戳版
    // 要到达这个效果, 可以在plugins中启用nocache插件
    // 会在加载模块文件时添加seajs-nocache=时间戳
    // 但不会给sea.js, data-config, plugin的js添加时间戳
    // ,map: [
    //     [ /^(.*\.(?:css|js))(.*)$/i, '$1?20130328' ]
    // ]
    // ,preload: ['jquery.min'] // XXX 为什么这里不能使用alias
});

// 自动使用bootstrap模块
// XXX 应该使用preload来加载, 但是好像preload不支持alias?
// 默认加载bootstrap的js和css
seajs.use('bootstrap');

// 备选方案
// 1. 包含bootstrap-responsive-css, 注意要将responsive.css放在后面
// seajs.use(['bootstrap', 'bootstrap-responsive-css']);
// 2. 仅加载bootstrap的css
// seajs.use('bootstrap-css');