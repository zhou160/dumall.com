require.config({
    paths:{
        require:'../js/require',
        jquery:'../js/jquery',
        shopCart:'../js/lib/event.shopCart',
        titleHover:'../js/lib/event.title',
        cookie:'../js/jquery.cookie'
    },
    shim:{
        require:['jquery'],
        cookie:['jquery']
    }
});


require(['shopCart','titleHover','jquery','cookie'],function (shopCart,titleHover,$){
    // console.log('加载成功');
    //在这里进行购物车信息渲染
    shopCart.shopCartContent();
    titleHover.topContent();//头部产品渲染
    titleHover.titleHover();//鼠标移入头部列表显示下拉菜单

    var cookieArr = JSON.parse($.cookie("goods")),
        idArr = [];//用于存放cookie中的id
        console.log(cookieArr);
        if(cookieArr){
            $('body>div').removeClass('shop');
            cookieArr.forEach(function (item){
                idArr.push(item.id);
            });
            titleHover.getAjax(`../../interface/shopCart.php?idlist=${idArr}`).then(function (data){
                data = JSON.parse(data);
                var shopcart = '';
                data.forEach(function (item){
                    var pic = JSON.parse(item.pic),
                        detail = JSON.parse(item.details),
                        price = JSON.parse(item.price);
                    
                    shopcart += `
                    <tr>
                    <td>
                        <span>
                            <i class="iconfont icon-xuanzhong"></i>
                        </span>
                    </td>
                    <td>
                        <dl>
                            <dt><img src="../${pic[0]}" alt=""></dt>
                            <dd>
                                <span>${detail.h1}</span>
                                <span>黑色</span>
                                <span>直降</span>
                            </dd>
                        </dl>
                    </td>
                    <td>￥39.00</td>
                    <td>
                        <span>-</span>
                        <input type="text" value="1">
                        <span>+</span>
                    </td>
                    <td>￥${price.price[0]}</td>
                    <td>删除</td>
                </tr>
                    `
                });
                $('tbody').html(shopcart);
            });
        }else{
            $('body>div').addClass('shop');
        }
    
});