
/**
 * 本模块是公共样式以及公共函数模块，包含以下功能
 * 1、鼠标移入顶部产品列表，显示下拉菜单
 * 2、右侧固定列表的事件
 * 3、ajax封装成promise函数
 * 
 */
define(['jquery','cookie'], function($) {

    var baseUrl = 'http://localhost/php-mysql/dumall.com';
    //鼠标移入顶部信息列表显示
     function titleHover(){
        console.log('头部显示');
        // $()
        $('.manuHover').mouseenter(function() {
            $('.manuList').css({
                display:'block',
                height:186
            });
        })
        $('.topTitle').mouseleave(function() {
            $('.manuList').css({
                display:'none',
                height:0
            });
        });
        $('.manuLeave').mouseenter(function() {
            $('.manuList').css({
                display:'none',
                height:0
            });
        });

        //头部信息左右移动
        var goNext = $('.manuList span').eq(1),
            goPro = $('.manuList span').eq(0),
            index = 0;
        goNext.click(function() {
            index ++;
            if(index >= 5) index = 5
            $('.manu ul').css('left',-215*index);
            console.log('左移');

        });
        goPro.click(function() {
            console.log('右移');
            index --;
            if(index <= 0) index = 0;
            $('.manu ul').css('left',-215*index);
        });

    }

    //右侧列表样式
    function rightFixed(){
        $('.rightFixed ul').on('mouseenter','li',function() {
            console.log('b');
            $(this).find('span').show();
            $(this).find('b').show();
        }).on('mouseleave','li',function() {
            $(this).find('span').hide();
            $(this).find('b').hide();
        });
        //滚轮
        $(window).scroll(function(ev) {
            if($(window).scrollTop() >= 200){
               $ ('.rightFixed li').eq(5).show();
            }else{
                $ ('.rightFixed li').eq(5).hide();
            }
        });
        //返回顶部
        $ ('.rightFixed li').eq(5).click(function() {
            $(window).scrollTop(0);
        });
    }


    ///封装ajax获取数据
    function getAjax(url){
        return new Promise(function (resolve,reject){
			$.ajax({
				type:"get",
				url:url,
				success:function (body){
					resolve(body);
				},
				error:function (){
					reject(err);
				}
			})
		})
    }

    //头部信息渲染
    //首页信息渲染
    function topContent(){
        console.log('头部信息渲染');
        var cookie = JSON.parse($.cookie('user'));
        //判断用户是否登录
        if(cookie){
            //用户登录可以显示用户名，注册登录功能隐藏
           $('header>dl>dt>li').eq(1).addClass('active');
           $('header>dl>dt>li').eq(2).addClass('active');
           $('header>dl>dt>li').eq(3).removeClass('active');
           $('header>dl>dt').find('span').html(cookie.userName);
           userHover();
           loginOut();
        }else{
            $('header>dl>dt>li').eq(1).removeClass('active');
            $('header>dl>dt>li').eq(2).removeClass('active');
            $('header>dl>dt>li').eq(3).addClass('active');
        }
        getAjax(`${baseUrl}/interface/selectProduct.php`).then(function(data){
            data = JSON.parse(data);
            // console.log(data);
            var manu = '',
                pic,
                price;
            data.forEach(function(item) {
                pic = JSON.parse(item.pic);
                // console.log(item.price);
                price = JSON.parse(item.price);
                // console.log(price.price[0]);
                details = JSON.parse(item.details);
                manu += `
                <li>
                <a href = "./details.html?id=${item.id}">
                <img src="../${pic[0]}" alt="">
                <p>${item.title}</p>
                <p>￥${price.price[0]}</p>
                </a>
            </li>
                `
            });
            manu += manu;
            $('.manu ul').html(manu);
            // console.log(manu);
        });
    }

    //用户登录状态下，鼠标移入用户名下边，显示下拉列表
   function userHover(){
       $('.userName').mouseenter(function() {
           $(this).parent().find('dd').show();
       }).mouseleave(function() {
           $(this).parent().find('dd').hide();
       })
   }

   //用户退出功能
   function loginOut(){
    $('.loginout').click(function() {
        console.log('退出');
        $.cookie('user',null,{path:'/'});
        // location.reload();
    });
   }


    return{
        titleHover:titleHover,
        rightFixed:rightFixed,
        getAjax:getAjax,
        topContent:topContent
    }
    
});