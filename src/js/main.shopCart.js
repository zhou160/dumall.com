require.config({
    paths: {
        require: '../js/require',
        jquery: '../js/jquery',
        shopCart: '../js/lib/event.shopCart',
        titleHover: '../js/lib/event.title',
        cookie: '../js/cookie'
    },
    shim: {
        require: ['jquery'],
        cookie: ['jquery']
    }
});


require(['shopCart', 'titleHover', 'jquery', 'cookie'], function(shopCart, titleHover, $) {
    var baseUrl = 'http://localhost/php-mysql/dumall.com';
    //在这里进行购物车信息渲染
    shopCart.shopCartContent();
    titleHover.topContent(); //头部产品渲染
    titleHover.titleHover(); //鼠标移入头部列表显示下拉菜单
    titleHover.searchInp(); //用户搜索事件
    var cookieArr = JSON.parse($.cookie("goods")),
        idArr = []; //用于存放cookie中的id
    console.log(cookieArr);
    //判断购物车中是否有内容，如果没有内容显示提示，如果有内容则渲染购物车
    if (cookieArr) {
        if (cookieArr.length) {
            console.log('有数据');
            $('body>div').removeClass('shop');
            cookieArr.forEach(function(item) {
                idArr.push(item.id);
            });
            titleHover.getAjax(`${baseUrl}/interface/shopCart.php?idlist=${idArr}`).then(function(data) {
                data = JSON.parse(data);
                var shopcart = '';
                data.forEach(function(item) {
                    var pic = JSON.parse(item.pic),
                        detail = JSON.parse(item.details),
                        price = JSON.parse(item.price),
                        num = 0;
                    for (var i = 0; i < cookieArr.length; i++) {
                        if (item.id == cookieArr[i].id) {
                            num = cookieArr[i].num;
                        }
                    }
                    // console.log(num);       
                    shopcart += `
                            <tr data-id="${item.id}">
                            <td>
                                <span class="check">
                                    <i class="iconfont icon-xuanzhong"></i>
                                </span>
                            </td>
                            <td>
                                <dl>
                                    <dt><a href="./details.html?id=${item.id}"><img src="${baseUrl}/src/${pic[0]}" alt=""></a></dt>
                                    <dd>
                                        <span><a href="details.html?id=${item.id}">${detail.h1}</a></span>
                                        <span>黑色</span>
                                        <span>直降</span>
                                    </dd>
                                </dl>
                            </td>
                            <td>￥<i class="price">${price.price[0].toFixed(2)}</i></td>
                            <td>
                                <span class="reduce">-</span>
                                <input type="text" value="${num}" class="num">
                                <span class="add">+</span>
                            </td>
                            <td>￥<span class="priceSum">${(num * price.price[0]).toFixed(2)}</span></td>
                            <td><span class="del">删除</span></td>
                        </tr>
                            `
                });
                $('tbody').html(shopcart);
                shopCart.shopCartEvent(); //控制购物车列表中的事件操作
            });
        } else {
            $('body>div').addClass('shop');
        }
    } else {
        console.log('没有数据');
        $('body>div').addClass('shop');
    }

});