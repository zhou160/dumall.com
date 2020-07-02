/**
 * 本模块是商品购物车页面
 * 1、购物车渲染
 * 2、购物车结算
 * 3、推荐产品渲染
 */
define(['titleHover','jquery','cookie'],function(titleHover,$) {
    

    //推荐信息加载
    function shopCartContent(){
        titleHover.getAjax('../../interface/selectProduct.php').then(function (data){
            // console.log(data);
            data = JSON.parse(data);
            var shopCart = '';
            data.forEach(function (item){

                shopCart += `
                <li>
               <a href="./details.html?id=${item.id}">
               <img src="../${JSON.parse(item.pic)[0]}" alt="">
               <p>${item.title}</p>
               <p>
                   <span>￥${JSON.parse(item.price).price[0]}</span>
                   <span>￥${JSON.parse(item.price).price[1]}</span>
               </p>
               </a>
            </li>
                `
            });
            for(var i=0;i<2;i++){
                shopCart += shopCart;
            }
            $('.likeList').html(shopCart);
        });
    }

    //购物列表事件
    function shopCartEvent(){
        //数量添加按钮事件
        $('tbody').on('click','td .add',function() {
            var input = $(this).parent().find('input'),
                num = input.val();
                num++;
                input.val(num);
        });

        //数量减少按钮事件
        $('tbody').on('click','td .reduce',function() {
            var input = $(this).parent().find('input'),
                num = input.val();
                num--;
                if(num <= 1) {
                    num = 1;
                    $(this).css('cursor','pointer');
                }
                input.val(num);
        });

        //删除按钮事件
        $('tbody').on('click','.del',function() {
            // console.log('删除');
            console.log();
            var id = $(this).parent().parent().attr('data-id');
            var cookie = JSON.parse($.cookie('goods'));
            console.log(cookie);
            cookie.forEach(function (item,index){
                
                if(item.id == id){
                    console.log(index);
                    cookie.splice(index,1);
                }
            });
            $.cookie("goods",JSON.stringify(cookie),{
				expires:7,
				path:'/'
            })
            location.reload();
            // console.log(JSON.parse($.cookie('goods')));

        });

        //全选和取消全选
        $('thead th').eq(0).find('span').click(function() {
            console.log('隐藏操作');
            if($(this).find('i').hasClass('active')){
                $(this).find('i').add('tbody i').removeClass('active');

            }else{
                $(this).find('i').add('tbody i').addClass('active');
            }
        });

        // var num = 0;
        //给单个按钮绑定事件，如果都选中则全选，否则全选取消
        $('tbody').find('.check').click(function() {
            console.log(123);
            if($(this).find('i').hasClass('active')){
                $(this).find('i').removeClass('active');
            }else{
                $(this).find('i').addClass('active');
            }
            console.log($('tbody tr').lenth);
            var cookie = JSON.parse($.cookie("goods")),
                num = 0;
            for(var i=0;i<cookie.length;i++){
                if($('tbody tr').eq(i).find('td').eq(0).find('i').hasClass('active')){
                    num ++;
                }
            }
            if(num == cookie.length){
                $('thead th').eq(0).find('i').addClass('active');
            }else{
                $('thead th').eq(0).find('i').removeClass('active');
            }
        });

        //计算选中元素个数和总价

    }
    return{
        shopCartContent:shopCartContent,
        shopCartEvent:shopCartEvent
    }
});