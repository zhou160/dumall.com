require.config({
    paths:{
        require:'../js/require',
        jquery:'../js/jquery',
        details:'../js/lib/event.details',
        titleHover:'../js/lib/event.title',
        cookie:'../js/jquery.cookie'
    },
    shim:{
        require:['jquery']
    }
});

require(['jquery','details','titleHover'],function ($,details,titleHover){
    //直接在这里进行详情页信息渲染
    var left = '',//用于拼接左侧信息字符串
        right = '';//用于拼接右侧信息字符串
    titleHover.getAjax(`../../interface/detailsInfo.php?id=${location.search.split("=")[1]}`).then(function (data){
        // console.log('加载成功');
        // console.log(data);
        data = JSON.parse(data);
        var pic = JSON.parse(data[0].pic),
            detail = JSON.parse(data[0].details),
            price = JSON.parse(data[0].price);
            // Promotion = JSON.parse(detail.Promotion);
            // console.log(detail.Promotion[0]);
            // data.forEach(function (item){
                left = `
                <ul class="bigImg">
                    <li class="active">
                        <img src="../${pic[1]}" alt="">
                    </li>
                    <li>
                        <img src="../${pic[2]}" alt="">
                    </li>
                    <li>
                        <img src="../${pic[3]}" alt="">
                    </li>
                    <li>
                        <img src="../${pic[4]}" alt="">
                    </li>
                    <li>
                    <img src="../${pic[5]}" alt="">
                </li>
                </ul>
                <div class="smallImg">
                    <span>&lt;</span>
                    <span>&gt;</span>
                    <div class="imgListCon">
                        <div class="imgList">
                            <li>
                                <img src="../${pic[1]}" alt="">
                            </li>
                            <li>
                                <img src="../${pic[2]}" alt="">
                            </li>
                            <li>
                                <img src="../${pic[3]}" alt="">
                            </li>
                            <li>
                                <img src="../${pic[4]}" alt="">
                            </li>
                            <li>
                                <img src="../${pic[5]}" alt="">
                            </li>
                        </div>
                    </div>
                </div>
                `
    
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
                        <span>￥</span>
                        <span>${price.price[0]}</span>
                        <span>￥${price.price[1]}</span>
                    </h1>
                    <dl>
                        <dt>促销</dt>
                        <dd>
                            <dl>
                                <dt>${detail.Promotion[0].p1}</dt>
                                <dd>${detail.Promotion[0].p2}</dd>
                            </dl>
                            <dl>
                                <dt>${detail.Promotion[1].p1}</dt>
                                <dd>${detail.Promotion[1].p2}</dd>
                            </dl>
                        </dd>
                    </dl>
                    <dl>
                        <dt>发货</dt>
                        <dd>${detail.deliver}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>选择颜色</dt>
                        <dd>黑色</dd>
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
            // });
            $('.left').html(left);
            $('.right').html(right);
            // console.log(left);
            // console.log(right);
        titleHover.topContent();
        titleHover.titleHover();//头部鼠标移入显示下拉列表
        titleHover.rightFixed();//右侧固定列表
        details.detailsContent();
        details.detailEvent();
        details.addShop();
    });
});