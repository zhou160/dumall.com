define(['jquery','titleHover'],function($,titleHover){//引入这个模块的入口文件必须要配置jquery文件路径
   
    var baseUrl = 'http://localhost/php-mysql/dumall.com';
//    这里是关于登录页面弹窗的问题
    function login(){

        //登录弹框显示与否
        $('#login').click(function (){
            $('.login').addClass('regis');
        });
        $('.title i').click(function() {
            $('.login').removeClass('regis');
        });


        //弹窗拖拽
        $('.loginBox').mousedown(function (ev){
            //用来记录当前鼠标到元素的距离
            var offsetX = ev.pageX - $(this).offset().left,
                offsetY = ev.pageY - $(this).offset().top;
            // console.log(offsetX,offsetY);
            //用来记录this指向
            var _this = this;
            $(document).mousemove(function (ev){
                //获取鼠标的移动位置
                var left = ev.pageX - offsetX,
                    top = ev.pageY - offsetY;
                if(left < 0) left = 0;
                if(top < 0) top = 0;
                if(left > $(window).width() - $('.loginBox').width()) left = $(window).width() - $('.loginBox').width();
                if(top > $(window).height() - $('.loginBox').height()) top = $(window).height() - $('.loginBox').height();
                $('.loginBox').css({
                    top:top,
                    left:left
                });
            }).mouseup(function (){
                $(document).off('mousemove');
            });
        });


        //登录方式切换
        //手机登录
        $('.spa1').click(function (){
            $('.loginBox div').eq(1).addClass('loginMethod');
            $('.loginBox ul').removeClass('loginMethod');
        });
        //二维码登录
        $('.spa2').click(function (){
            $('.loginBox div').eq(1).removeClass('loginMethod');
            $('.loginBox>ul').addClass('loginMethod');
        });

        //手机登录转注册
        $('.content li').eq(5).click(function() {
            $('.login').removeClass('regis');
        });



    }


    // 这里用于控制注册功能的代码
    function register(){
       //用户名处提示
       tipWindow(1);
       //密码处提示
       tipWindow(3);


       //提交信息，注册账号
       $('.register>ul>li').eq(5).find('p').click(function() {
        //    console.log(123);
        //这里向后端发送信息
        //先获取用户输入的信息
        var register = $('.register').find('li'),
            userName  = register.eq(1).find('input').val(),
            tel = register.eq(2).find('input').val(),
            password = register.eq(3).find('input').val();
            console.log('获得数据');
            // send(`../interface/addUser.php ?userName=${userName}&tel=${tel}&password=${password}`).then(function (data){
            //     console.log(data);
            // });
            titleHover.getAjax(`${baseUrl}/interface/addUser.php?userName=${userName}&&password=${password}&&tel=${tel}`).then(function (data){
                console.log(data);
            });
       });

    }


    //提示窗
    function tipWindow(index){
         // 输入用户名处失去焦点就隐藏提示
         $(".register>ul>li").eq(index).find('input').on('blur',function() {
            $(this).closest('li').find('div').addClass('hid');
        });
        //输入用户名处获得焦点就显示提示
        $(".register>ul>li").eq(index).find('input').on('focus',function() {
            $(this).closest('li').find('div').removeClass('hid');
        });
    }

    //ajax
    // function send(url){
    //     return new Promise(function (resolve,reject){
	// 		$.ajax({
	// 			type:"get",
    //             url:url,
    //             dataType:'json',
	// 			success:function (body){
	// 				resolve(body)
	// 			},
	// 			error:function (){
	// 				reject(err)
	// 			}
	// 		})
	// 	})
    // }
    return{
        login:login,
        register:register
    }
})