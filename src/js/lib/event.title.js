
/**
 * 本模块是公共样式以及公共函数模块，包含以下功能
 * 1、鼠标移入顶部产品列表，显示下拉菜单
 * 2、右侧固定列表的事件
 * 3、ajax封装成promise函数
 * 
 */
define(['jquery'], function($) {
    //鼠标移入顶部信息列表显示
    function titleHover(){
        console.log('头部显示');
        $('.list').find('dt').mouseenter(function() {
            $('.manuList').show();
        }).mouseleave(function() {
            $('.manuList').hide();
        });
    }

    //右侧列表样式
    function rightFixed(){
        //鼠标移入b标签和b显示
        // $('rightFixed ul').on('click',function() {
        //     console.log('点击');
        // });
        console.log(123);
        $('.rightFixed ul').on('mouseenter','li',function() {
            console.log('b');
            $(this).find('span').show();
            $(this).find('b').show();
        }).on('mouseleave','li',function() {
            $(this).find('span').hide();
            $(this).find('b').hide();
        });
    }


    ///封装ajax获取数据
    function getAjax(url){
        return new Promise(function (resolve,reject){
			$.ajax({
				type:"get",
				url:url,
				success:function (body){
					resolve(body);
				},
				error:function (){
					reject(err);
				}
			})
		})
    }

    //头部信息渲染
    //首页信息渲染
    function topContent(){
        console.log('头部信息渲染');
        getAjax('../../interface/selectProduct.php').then(function(data){
            data = JSON.parse(data);
            // console.log(data);
            var manu = '',
                pic,
                price;
            data.forEach(function(item) {
                pic = JSON.parse(item.pic);
                // console.log(item.price);
                price = JSON.parse(item.price);
                // console.log(price.price[0]);
                details = JSON.parse(item.details);
                manu += `
                <li>
                <img src="../${pic[0]}" alt="">
                <p>${item.title}</p>
                <p>￥${price.price[0]}</p>
            </li>
                `
            });
            $('.manu').html(manu);
            // console.log(manu);
        });
    }

    return{
        titleHover:titleHover,
        rightFixed:rightFixed,
        getAjax:getAjax,
        topContent:topContent
    }
    
});