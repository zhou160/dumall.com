/**
 * 这个模块是详情页的事件模块，包含以下功能
 * 1、详情页信息渲染
 * 2、图片切换
 * 
 */

define(['jquery','titleHover'],function($,titleHover) {
    //引入的titleHover是公共部分事件模块

    //用于详情页数据渲染
    function detailsContent(){
        // console.log('detailsContent');
        titleHover.getAjax('../../interface/selectProduct.php').then(function (data){
            data = JSON.parse(data);
            var img = '';
            data.forEach(function (item){
                img += `
                <li>
                <a href="./details.html?id=${item.id}">
                <img src="../${JSON.parse(item.pic)[0]}" alt="">
                <p>${item.title}</p>
                <span>${JSON.parse(item.price).price[0]}元</span>
                </a>
            </li>
                `;
            });
            // console.log(img);
            for(var i=0;i<1 ;i++){
                img += img;
            }
            $('.recoListCon .imgList').html(img);
        });

    }
    //详情页基本事件
    function detailEvent(){
        //鼠标移入换图
        $('.left .smallImg .imgList').on('mouseenter','li',function() {
            // console.log($(this).index());
            $('.left .bigImg li').removeClass('active');
            $('.left .bigImg li').eq($(this).index()).addClass('active');
        });


        //小图左右移动
        var goNext = $('.smallImg span').eq(1),
        goPro = $('.smallImg span').eq(0),
        index = 0;
        //向右移动
    goNext.click(function (){
        index ++;
        if(index >= 1){
            index = 1;
        }
        $('.left .imgList').css('left',-90*index);
    });
    //向左移动
    goPro.click(function() {
        index --;
        if(index <= 0){
            index =0;
        }
        $('.left .imgList').css('left',-90*index);
    });


    //数量添加和减少事件
        var spa = $('.right li').eq(5).find('span')
        spa.eq(2).click(function (){
            var num = spa.eq(1).html();
            num ++
            spa.eq(1).html(num);
        });
        spa.eq(0).click(function (){
            var num = spa.eq(1).html();
            num --;
            if(num <=1){
                num = 1;
                spa.eq(0).css('cursor',"not-allowed");
            }
            spa.eq(1).html(num);
        })

        //推荐商品左右移动功能
        var recoGoNext = $('.recoList span').eq(1),
            recoGoPro = $('.recoList span').eq(0),
            index = 0;
        recoGoNext.click(function (){
            index ++;
            if(index >= 5) index =5;
            // console.log(index);
            $('.recoListCon .imgList').css('left',-245*index);
        });
        recoGoPro.click(function (){
            index --;
            if(index <=0) index =0;
            $('.recoListCon .imgList').css('left',-245*index);
            // console.log('goPro');
        });

    }



    //购物车添加功能
    function addShop(){
        $('.right li').eq(6).click(function (){
            console.log('添加');
        });
    }

    return{
        detailsContent:detailsContent,
        detailEvent:detailEvent,
        addShop:addShop
    }

});