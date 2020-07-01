require.config({
    paths:{
        require:'../js/require.min',
        jquery:'../js/jquery.min',
        index:'../js/lib/event.index.min'
    },
    shim:{
        require:['jquery']
    }
});

require(['jquery','index'],function ($,index){
    // console.log('加载成功');
    index.banner();
});