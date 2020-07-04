/**
 * 本模块用于控制用户登录
 */
define(['titleHover','md5','jquery','cookie'],function(titleHover,md5,$){
    function login(){

        console.log($.md5('abc'));
        $('.loginTop input').eq(0).blur(function() {
            check($(this),0,$(this).val(),'用户名');
        });
        $('.loginTop input').eq(1).blur(function() {
            check($(this),1,$(this).val(),'密码');
        });

        $(".btn").click(function() {
            var userName = $('.inp').eq(0).val(),
                password = $('.inp').eq(1).val(),
                _this = $('.loginTop input'),
                userNameRes = check(_this.eq(0),0,userName,'用户名'),//用于记录输入框验证状态
                passwordRes = check(_this.eq(1),1,password,'密码');
                console.log(userNameRes,passwordRes);
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

    /**
     * 
     * @param  index1 用于记录当前点击的元素
     * @param  index2 用于记录错误提示信息位置
     * @param  val   用于记录当前元素的值
     * @param cals   用于记录当前点击位置的名称
     * 
     */
    function check(index1,index2,val,clas){
        //不符合规范
        if(val == ''){
            index1.parent().find('i').eq(index2).html(`${clas}不可为空`);
            return false;
        }else{
            index1.parent().find('i').eq(index2).html('');
            return true;
        }
    }

    return{
        login:login
    }
})