define(['jquery','titleHover','md5'],function($,titleHover,md5){//引入这个模块的入口文件必须要配置jquery文件路径
   
    var baseUrl = 'http://localhost/php-mysql/dumall.com';
//    这里是关于登录页面弹窗的问题
    function registerLogin(){
        console.log($('.register li').eq(6).find('input').prop('checked'));
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
       //登录功能输入框判断
       $('.loginPhone .content li').eq(1).find('input').blur(function() {
            loginCheck($(this),'用户名');
       });
       $('.loginPhone .content li').eq(2).find('input').blur(function() {
            loginCheck($(this),'密码');
       });

       //登录功能
       $('.content li').eq(4).click(function() {
            // if()
            var userNameRes = loginCheck($('.loginPhone .content li').eq(1).find('input'),'用户名'),
                passwordRes = loginCheck($('.loginPhone .content li').eq(2).find('input'),'密码'),
                userName = $('.loginPhone .content li').eq(1).find('input').val(),
                password= $('.loginPhone .content li').eq(2).find('input').val();
            if(userNameRes && passwordRes){
                titleHover.getAjax(`http://localhost/php-mysql/dumall.com/interface/userSelect.php?userName=${userName}&&password=${$.md5(password)}`).then(function (data){
                    // console.log(data);
                    data = JSON.parse(data);
                    if(data.code == 100){
                        alert(data.msg);
                    }else if(data.code == 200){
                        location.href = './index.html';
                        $.cookie("user",JSON.stringify({'userName':userName}),{
                            path:'/'
                        })
                    }
                });
            }
       });

    }

     //判断是否输入数据
        /**
         * 
         * @param {*} index   输入框所在li的位置
         * @param {*} inpName 输入框名字
         */
        function loginCheck(index,inpName){
            if(index.val() == ''){
                console.log('为空')
                index.parent().find('b').html(`${inpName}不能为空`);
                return false;
            }else{
                index.parent().find('b').html('');
                return true;
            }
        }


    // 这里用于控制注册功能的代码
    function register(){
       //用户名处提示
       tipWindow(1);
       //密码处提示
       tipWindow(3);
        var userNameRes,telRes,passwordRes,checkCodeRes;//用于存放各类验证结果

        //输入信息过程中验证
         var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,14}$/,
             reg1 = /^1[3-9]\d{9}$/,
             reg2 = /^[a-zA-Z0-9]{8,14}$/;//用于验证密码

    //用户名验证
    $('.register li').eq(1).find('input').blur(function() {
        check(reg,$(this),$(this).val(),'用户名不符合规范','用户名');
    });
    //手机号验证
     $('.register li').eq(2).find('input').blur(function (){
         check(reg1,$(this),$(this).val(),'手机号不符合规范','手机号');
        // console.log(tel);
        });

     //密码验证
     $('.register li').eq(3).find('input').blur(function (){
        check(reg2,$(this),$(this).val(),'密码不符合规范','密码');
     });

     //验证码验证
     var random;
     $('.register li').eq(4).find('input').eq(1).click(function() {
        random = parseInt(Math.random()*100000);
       alert('您的验证码是：'+random);
    });
    $('.register li').eq(4).find('input').eq(0).blur(function() {
        checkCode(random);
        // console.log('执行');
    });
     
       //提交信息，注册账号
       $('.register>ul>li').eq(5).find('p').click(function() {
        //先获取用户输入的信息
        var register = $('.register').find('li'),
            userName  = register.eq(1).find('input').val(),
            tel = register.eq(2).find('input').val(),
            password = register.eq(3).find('input').val();
            console.log('md5加密',$.md5(userName));
            //提交信息之前先对于填入信息进行判断
            userNameRes = check(reg,$('.register li').eq(1).find('input'),userName,'用户名不符合规范','用户名');
            telRes = check(reg1,$('.redister li').eq(2).find('input'),tel,'手机号不符合规范','手机号');
            passwordRes = check(reg2,$('.redister li').eq(3).find('input'),password,'密码不符合规范','密码');
            checkCodeRes = checkCode(random);
            console.log(userNameRes,telRes,passwordRes,checkCodeRes);
            if($('.register li').eq(6).find('input').prop('checked')){
                if(userNameRes && telRes && passwordRes && checkCodeRes){
                    titleHover.getAjax(`${baseUrl}/interface/addUser.php?userName=${userName}&&password=${$.md5(password)}&&tel=${$.md5(tel)}`).then(function (data){
                        console.log(JSON.parse(data));
                        data = JSON.parse(data);
                        if(data.code == 100){
                            alert('用户名已存在');
                            $('.register').find('li');
                        }else if(data.code == 500){
                            alert('网络错误');
                        }else if(data.code == 200){
                            location.href = './login.html';
                        }
                });
                }
            }else{
                alert('请同意协议');
            }
            
       });

    }


    //用户名和密码处的提示窗
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

    /**
     * 用于格式验证
     * @param  reg    用于验证的正则表达式
     * @param  index  当前事件对象（一般填$(this)用于寻找信息提示框）
     * @param  val    用于验证的值
     * @param  msg    提示信息
     * @param  clas   验证类别（比如用户名...）
     */
    function check(reg,index,val,msg,clas){
        // console.log(val);
        //不符合规范
        if(val == ''){
            index.parent().find('i').html(`${clas}不可为空`);
            return false;
        }else if(!reg.test(val)){
            index.parent().find('i').html(msg);
            return false;
        }else{
            index.parent().find('i').html('');
            return true;
        }
    }

    //验证码验证
    function checkCode(random){
        console.log(random);
        var _this = $('.register li').eq(4).find('input').eq(0);
        if(_this.val() == ''){
           _this.parent().find('i').html('验证码不可为空');
            return false;
        }else if(_this.val() != random){
            _this.parent().find('i').html('验证码错误');
            return false;
        }else{
            _this.parent().find('i').html('');
            return true;
        }
    }
    return{
        registerLogin:registerLogin,
        register:register
    }
})