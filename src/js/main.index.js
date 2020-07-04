require.config({
    paths:{
        require:'../js/require',
        jquery:'../js/jquery',
        index:'../js/lib/event.index',
        titleHover:'../js/lib/event.title',
        // cookie:'../js/jquery.cookie'
        cookie:'../js/cookie'
    },
    shim:{
        require:['jquery'],
        cookie:['jquery']
        // cookie:['cookie']
    }
});

require(['jquery','index','titleHover'],function ($,index,titleHover){
    // console.log('加载成功');
    titleHover.topContent();//头部产品渲染
    index.banner();
    titleHover.titleHover();//鼠标移入头部列表显示下拉菜单
    titleHover.rightFixed();//鼠标移入右侧固定列表显示效果
    index.evaluate();////产品列表区域鼠标移入显示评论
    index.indexContent();//渲染产品区
});