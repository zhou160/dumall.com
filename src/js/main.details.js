require.config({
    paths: {
        require: '../js/require',
        jquery: '../js/jquery',
        details: '../js/lib/event.details',
        titleHover: '../js/lib/event.title',
        cookie: '../js/cookie'
    },
    shim: {
        require: ['jquery'],
        cookie: ['jquery']
    }
});

require(['jquery', 'details', 'titleHover'], function($, details, titleHover) {
    //直接在这里进行详情页信息渲染
    var left = '', //用于拼接左侧信息字符串
        right = ''; //用于拼接右侧信息字符串
    titleHover.topContent(); //加载头部数据
    details.detailsContent(), //加载推荐数据
        baseUrl = 'http://localhost/php-mysql/dumall.com';
    titleHover.getAjax(`../../interface/detailsInfo.php?id=${location.search.split("=")[1]}`).then(function(data) {
        data = JSON.parse(data);
        var pic = JSON.parse(data[0].pic),
            detail = JSON.parse(data[0].details),
            price = JSON.parse(data[0].price);
        $('title').html(data[0].title);

        //大图小图拼接
        var small = '',
            big = '',
            Msg = '';
        for (var i = 1; i < pic.length; i++) {
            console.log(pic[i]);
            if (i == 1) {
                small += ` <li data-len=${pic.length-1}>
                    <img src="${baseUrl}/src/${pic[i]}" alt="">
                </li>`
                big += `<li class="active">
                    <img src="${baseUrl}/src/${pic[i]}" alt="">
                </li>`
                Msg += `
                <li class="active">
                <img src="${baseUrl}/src/${pic[i]}" alt="">
            </li>
                `
            } else {
                small += `<li>
                <img src="${baseUrl}/src/${pic[i]}" alt="">
            </li>`
                big += `<li>
                <img src="${baseUrl}/src/${pic[i]}" alt="">
            </li>`
                Msg += `<li>
                <img src="${baseUrl}/src/${pic[i]}" alt="">
            </li>`
            }
        }
        left = `
                <ul class="bigImg">
                    ${big}
                </ul>
                <div class="smallImg">
                    <span>&lt;</span>
                    <span>&gt;</span>
                    <div class="imgListCon">
                        <div class="imgList" style="width:${(pic.length-1)*90}px">
                            ${small}
                        </div>
                    </div>
                </div>
                `
            //颜色拼接
        var proColor = '';
        for (i = 0; i < detail.color.length; i++) {
            if (i == 0) {
                proColor += `
                <dd class="active"><i class="iconfont icon-xuanze"></i>${detail.color[i]}</dd>
            `
            } else {
                proColor += `
                    <dd><i class="iconfont icon-xuanze"></i>${detail.color[i]}</dd>
                `
            }

        }
        var str = ''
        for (var i = 0; i < detail.Promotion.length; i++) {
            str += `
                <dl>
                    <dt>${detail.Promotion[i].p1}</dt>
                    <dd>${detail.Promotion[i].p2}</dd>
                </dl>
                `
        }
        var priceStr = ''
        if (price.price.length == 1) {
            priceStr = `<span>${price.price[0]}</span>`
        } else {
            priceStr = `<span>${price.price[0]}</span><span>￥${price.price[1]}</span>`
        }

        right = `
                <li data-id="${data[0].id}">
                    <span>${data[0].title}</span>
                    <span>100%</span>
                </li>
                <li>
                    <span>${detail.h1}</span>
                    <span>满意度&gt;</span>
                </li>
                <li>
                    ${detail.h2}
                </li>
                <li>
                    <h1>
                        <span>￥</span>${priceStr}
                        
                        
                    </h1>
                    <dl>
                        <dt>促销</dt>
                        <dd>${str}
                        </dd>
                    </dl>
                    <dl>
                        <dt>发货</dt>
                        <dd>${detail.deliver}</dd>
                    </dl>
                </li>
                <li>
                    <dl class="color">
                        <dt>选择颜色</dt>${proColor}
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>选择数量</dt>
                        <dd>
                            <span>-</span>
                            <span>1</span>
                            <span>+</span>
                        </dd>
                    </dl>
                </li>
                <li>
                    <span>加入购物车</span>
                    <span>立即购买</span>
                </li>
                `

        var sucess = `
            <div class="shopBox">
            <p><i class="iconfont icon-shanchu"></i></p>
            <div><i class="iconfont icon-chenggong1"></i></div>
            <div>已添加至购物车，请尽快结算哦</div>
            <dl>
                <dt>
                    <img src="${baseUrl}/src/${pic[0]}" alt="">
                </dt>
                <dd>
                    <p><span>${data[0].title}</span><span>${detail.h1}</span></p>
                    <span>￥${price.price[0]}</span>
                </dd>
            </dl>
            <h1><a href="./shopCart.html">去购物车</a></h1>
        </div>
            `
        $('.titleContent span').html(data[0].title);
        $('.success').html(sucess);
        // });
        $('.left').append(left);
        $('.right').html(right);
        $('.msg').html(Msg);
        titleHover.titleHover(); //头部鼠标移入显示下拉列表
        titleHover.rightFixed(); //右侧固定列表
        details.detailEvent();
        // details.addShop();

    });
});