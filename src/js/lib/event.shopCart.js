/**
 * 本模块是商品购物车页面
 * 1、购物车渲染
 * 2、购物车结算
 * 3、推荐产品渲染
 */
define(['titleHover','jquery','cookie'],function(titleHover,$) {
    

    // return{
    //     shopCartContent:shopCartContent
    // }
    function shopCartContent(){
        // console.log(123);
        titleHover.getAjax('../../interface/selectProduct.php').then(function (data){
            // console.log(data);
            data = JSON.parse(data);
            var shopCart = '';
            data.forEach(function (item){

                shopCart += `
                <li>
                <img src="../${JSON.parse(item.pic)[0]}" alt="">
                <p>${item.title}</p>
                <p>
                    <span>￥${JSON.parse(item.price).price[0]}</span>
                    <span>￥${JSON.parse(item.price).price[1]}</span>
                </p>
            </li>
                `
            });
            // console.log(shopCart);
            for(var i=0;i<2;i++){
                shopCart += shopCart;
            }
            // console.log(shopCart);
            $('.likeList').html(shopCart);
            console.log('成功');
        });
    }
    return{
        shopCartContent:shopCartContent
    }
});