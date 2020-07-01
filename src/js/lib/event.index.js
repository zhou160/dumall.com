define(['jquery'],function() {
    // 首页轮播图
    function banner(){

        //鼠标点击小按钮进行切图
        $('.banner>ol>li').click(function() {
            $('.banner>ol>li').removeClass('active');
            $(this).addClass('active');
            // console.log($(this).index());
            $('.banner>ul').css('left',-1600*$(this).index());
        });

        //前进后退按钮
        var goNext = $('.banner .btn span').eq(1);
        var goPro = $('.banner .btn span').eq(0);
        var bannerIndex = 0;
        //前进按钮
        goNext.click(function() {
            console.log('goNext');
            bannerIndex ++;
            if(bannerIndex >= 5){
                bannerIndex =0;
            }
            $('.banner>ol>li').removeClass('active');
            $('.banner>ol>li').eq(bannerIndex).addClass('active');
            $('.banner>ul').css('left',-1600*bannerIndex);
        });
        //后退按钮
        goPro.click(function() {
            console.log('goNext');
            bannerIndex --;
            if(bannerIndex < 0){
                bannerIndex =4;
            }
            $('.banner>ol>li').removeClass('active');
            $('.banner>ol>li').eq(bannerIndex).addClass('active');
            $('.banner>ul').css('left',-1600*bannerIndex);
        });

        //自动轮播
        timer = setInterval(function (){
			bannerIndex++;
			if(bannerIndex >= 5){
                bannerIndex =0;
            }
            $('.banner>ol>li').removeClass('active');
            $('.banner>ol>li').eq(bannerIndex).addClass('active');
            $('.banner>ul').css('left',-1600*bannerIndex);
			
        },1000);
        
        //鼠标移入停止轮播
        $('.banner').mouseenter(function() {
            clearInterval(timer);
        });
        //鼠标移出继续轮播
        $('.banner').mouseleave(function() {
            timer = setInterval(function (){
                bannerIndex++;
                if(bannerIndex >= 5){
                    bannerIndex =0;
                }
                $('.banner>ol>li').removeClass('active');
                $('.banner>ol>li').eq(bannerIndex).addClass('active');
                $('.banner>ul').css('left',-1600*bannerIndex);
                
            },3000);
        });
    }

    //产品列表区域鼠标移入显示评论
    function evaluate(){
        $('.contentInfo').on('mouseenter','li',function() {
            $(this).find('dl').show();
        }).on('mouseleave','li',function() {
            $(this).find('dl').hide();
        })
    }
    // function 
    return {
        banner:banner,
        evaluate:evaluate
    }
});