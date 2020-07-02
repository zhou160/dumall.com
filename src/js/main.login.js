requirejs.config({
    paths:{
        require:'../js/require',
        jquery:'../js/jquery',
        Login:'../js/lib/event.login',
        titleHover:'../js/lib/event.title'
    },
    shim:{//第三方模块依赖
        require:['jquery']//这个数组是依赖列表
    }
});
require(['Login','jquery','require'],function(Login,$) {
    Login.login();
    // console.log(456);
})