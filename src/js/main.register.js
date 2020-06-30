requirejs.config({
    paths:{
        jquery:'../js/jquery.min',
        require:'../js/require.min',
        register:'../js/lib/event.register.min'
    },
    shim:{//第三方模块依赖
        require:['jquery']//这个数组是依赖列表
    }
});
require(['register','jquery','require'],function(register,$) {
    register.login();
    register.register();
})