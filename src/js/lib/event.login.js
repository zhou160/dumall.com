define(['jquery','titleHover'],function($,titleHover){
    function login(){
        $(".btn").click(function() {
            var userName = $('.inp').eq(0).val(),
                password = $('.inp').eq(1).val();
            // console.log(userName,password);
            titleHover.getAjax(`http://localhost/php-mysql/dumall.com/interface/userSelect.php?userName=${userName}&&password=${password}`).then(function (data){
                console.log(data);
            });
        });
        // console.log(123);
    }
    return{
        login:login
    }
})