
/**
 * 本模块是首页的功能模块
 */
define(['jquery','titleHover'],function($,titleHover) {
    //定义
    // 首页轮播图
    var baseUrl = 'http://localhost/php-mysql/dumall.com';
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
            // console.log('goNext');
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
            // console.log('goNext');
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

    //首页信息渲染
    function indexContent(){
        titleHover.getAjax(`${baseUrl}/interface/selectProduct.php`).then(function(data){
            data = JSON.parse(data);
            // console.log(data);
            var manu = '',
                content = '',
                pic,
                price,
                details,
                color,
                eval;
            data.forEach(function(item) {
                pic = JSON.parse(item.pic);
                // console.log(item.price);
                price = JSON.parse(item.price);
                // console.log(price.price[0]);
                details = JSON.parse(item.details);
            //     manu += `
            //     <li>
            //     <img src="../${pic[0]}" alt="">
            //     <p>${item.title}</p>
            //     <p>￥${price.price[0]}</p>
            // </li>
            //     `
                content += `
                <li>
                <a href="./details.html?id=${item.id}">
                    <img src="${baseUrl}/src/${pic[0]}" alt="">
                    <span><i class="iconfont icon-smiling"></i> 满意度 100%</span>
                    <i>小度</i>
                    <div class="proInfo">
                        <h1>${item.title}（${details.color[0]}）</h1>
                        <h2>${details.h1}</h2>
                        <h3>
                            <span>￥${price.price[0]}</span>
                            <span>￥${price.price[1]}</span>
                        </h3>
                    </div>
                    <dl>
                        <dt>${details.eval.p1}</dt>
                        <dd>
                                ${details.eval.p2}
                        </dd>
                    </dl>
                </a>
            </li>
                `
            });
            // $('.manu').html(manu);
            for(var i=0;i<2;i++){
                content += content;
            }
            $('.contentInfo').html(content);
            // console.log(manu);
            // console.log(content);
        });
    }
    return {
        banner:banner,
        evaluate:evaluate,
        indexContent,indexContent
    }
});