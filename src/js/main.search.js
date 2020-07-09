require.config({
    paths: {
        require: '../js/require',
        jquery: '../js/jquery',
        search: '../js/lib/event.search',
        titleHover: '../js/lib/event.title',
        cookie: '../js/cookie',
        index: '../js/lib/event.index'
    },
    shim: {
        require: ['jquery'],
        cookie: ['jquery']
            // cookie:['cookie']
    }
});

require(['jquery', 'search', 'titleHover', 'index'], function($, search, titleHover, index) {
    console.log('加载成功');
    titleHover.topContent(); //头部产品渲染
    titleHover.titleHover(); //鼠标移入头部列表显示下拉菜单
    index.evaluate(); ////产品列表区域鼠标移入显示评论
    titleHover.searchInp(); //用户搜索事件
    // index.indexContent(); //渲染产品区
    // search.searchRes();
    var baseUrl = 'http://localhost/php-mysql/dumall.com',
        searchVal = decodeURI(location.search.split('=')[1]);
    $('.manuLeave').find('input').val(searchVal);
    $('.titleContent span').html(searchVal);
    titleHover.getAjax(`${baseUrl}/interface/selectClass.php?searchVal=${searchVal}`).then((data) => {
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        var str = '';
        if (data.code == 200) {
            $('.searchTitle').show();
            $('.searchNone').hide();
            $('.num').html(data.data.length);
            var item = data.data;
            console.log(item);
            for (var i = 0; i < item.length; i++) {
                var details = JSON.parse(item[i].details);
                str += `
                <li>
                <a href="${baseUrl}/src/html/details.html?id=${item[i].id}">
                    <img src="${baseUrl}/src/${JSON.parse(item[i].pic)[0]}" alt="">
                    <span><i class="iconfont icon-smiling"></i> 满意度 100%</span>
                    <i>小度</i>
                    <div class="proInfo">
                        <h1>${details.h1}</h1>
                        <h2>${details.h2}</h2>
                        <h3>
                            <span>￥109</span>
                            <span>￥119</span>
                        </h3>
                    </div>
                    <dl>
                        <dt>${details.eval.p1}</dt>
                        <dd>
                        ${details.eval.p2}
                        </dd>
                    </dl>
                </a>
            </li>
                `
            }
            $('.contentInfo').html(str);
        } else {
            $('.searchTitle').hide();
            $('.searchNone').show();
            console.log('没有产品');
            $('.searchNone').find('span').html(searchVal)
            titleHover.getAjax(`${baseUrl}/interface/selectProduct.php`).then((data) => {
                data = JSON.parse(data);
                console.log(data);
                data.forEach((item) => {
                    let details = JSON.parse(item.details);
                    str += `
                    <li>
                    <a href="${baseUrl}/src/html/details.html?id=${item.id}">
                        <img src="${baseUrl}/src/${JSON.parse(item.pic)[0]}" alt="">
                        <span><i class="iconfont icon-smiling"></i> 满意度 100%</span>
                        <i>小度</i>
                        <div class="proInfo">
                            <h1>${details.h1}</h1>
                            <h2>${details.h2}</h2>
                            <h3>
                                <span>￥109</span>
                                <span>￥119</span>
                            </h3>
                        </div>
                        <dl>
                            <dt>${details.eval.p1}</dt>
                            <dd>
                            ${details.eval.p2}
                            </dd>
                        </dl>
                    </a>
                </li>
                    
                    `
                });
                console.log(str);
                $('.contentInfo').append(str);
            });
        }

    })
});