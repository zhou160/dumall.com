requirejs.config({
    paths:{
        require:'../js/require',
        jquery:'../js/jquery',
        register:'../js/lib/event.register',
        titleHover:'../js/lib/event.title',
        md5:'../js/index'

    },
    shim:{//第三方模块依赖
        require:['jquery'],//这个数组是依赖列表
        md5:['jquery']
    }
});
require(['register','jquery','require'],function(register,$) {
    register.login();
    register.register();
})