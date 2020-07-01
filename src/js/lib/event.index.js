define(['jquery'],function() {
    // 首页轮播图
    function banner(){
        $('.banner>ol>li').click(function() {
            $('.banner>ol>li').removeClass('active');
            $(this).addClass('active');
            // console.log($(this).index());
            $('.banner>ul').css('left',-1600*$(this).index());
        });
    }


    return {
        banner:banner
    }
});