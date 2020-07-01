require.config({
    paths:{
        require:'../js/require',
        jquery:'../js/jquery',
        index:'../js/lib/event.index',
        titleHover:'../js/lib/event.title'
    },
    shim:{
        require:['jquery']
    }
});

require(['jquery','index','titleHover'],function ($,index,titleHover){
    // console.log('加载成功');
    index.banner();
    titleHover.titleHover();
    titleHover.rightFixed();
    index.evaluate();
});