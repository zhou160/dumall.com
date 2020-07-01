define(['jquery'], function($) {
    //鼠标移入顶部信息列表显示
    function titleHover(){
        $('.list').find('dt').mouseenter(function() {
            $('.manuList').show();
        }).mouseleave(function() {
            $('.manuList').hide();
        });
    }

    //右侧列表样式
    function rightFixed(){
        //鼠标移入b标签和b显示
        // $('rightFixed ul').on('click',function() {
        //     console.log('点击');
        // });
        console.log(123);
        $('.rightFixed ul').on('mouseenter','li',function() {
            console.log('b');
            $(this).find('span').show();
            $(this).find('b').show();
        }).on('mouseleave','li',function() {
            $(this).find('span').hide();
            $(this).find('b').hide();
        });
    }
    return{
        titleHover:titleHover,
        rightFixed:rightFixed
    }
    
});