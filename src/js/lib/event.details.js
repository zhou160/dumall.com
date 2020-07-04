/**
 * 这个模块是详情页的事件模块，包含以下功能
 * 1、详情页信息渲染
 * 2、图片切换
 * 
 */

define(['titleHover','jquery','cookie'],function(titleHover,$) {
    //引入的titleHover是公共部分事件模块
    var baseUrl = 'http://localhost/php-mysql/dumall.com';
    // console.log(`${baseUrl}/src/img/pro2-0.jpg`);

    //用于详情页数据渲染
    function detailsContent(){
        // console.log('detailsContent');
        titleHover.getAjax(`${baseUrl}/interface/selectProduct.php`).then(function (data){
            data = JSON.parse(data);
            var img1 = '';
            data.forEach(function (item){
                img1 += `
                <li>
                <a href="${baseUrl}/src/html/details.html?id=${item.id}">
                <img src="${baseUrl}/src/${JSON.parse(item.pic)[0]}" alt="">
                <p>${item.title}</p>
                <span>${JSON.parse(item.price).price[0]}元</span>
                </a>
            </li>
                `
            });
            // console.log(img);
            for(var i=0;i<1 ;i++){
                img1 += img1;
            }
            $('.recoListCon .imgList').html(img1);
        });

    }
    //详情页基本事件
    function detailEvent(){
        //鼠标移入换图
        changeImg();
        //小图左右移动
        smallImgMove();
        //右侧产品数量修改
        changeNum();
        //推荐商品左右移动
        recoMove();
        //添加成功页面关闭
        $('.icon-shanchu').click(function() {
            $('#sucess').removeClass('open');
        });

        //购物车添加
        $('.right li').eq(6).click(function (){
            addShop();
        });
        $('#add').click(function() {
            console.log('添加');
            addShop();
        });
        //放大镜
        manifer();

        //选择颜色
        $('.right .color').on('click','dd',function() {
            $(this).parent().find('dd').removeClass('active');
            $(this).addClass('active');
            console.log('点击');
        });

        //评价处切换
        Eval();

        //产品相关服务处定位
        server();

    }

    //购物车添加功能
    function addShop(){
        // $('.right li').eq(6).click(function (){
            // console.log('添加');
        var first = $.cookie("goods")==null ? true : false
        var id = $(".right li").eq(0).attr("data-id");
        var num = $(".right li").eq(5).find("span").eq(1).html();
        console.log(id,num);
		var same = false//用于标记当前加入购物车商品之前是否添加过,默认没有添加过
		// console.log(`数量${num}`)
		if(first){
			//cookie第一次添加
			var arr = [{id:id,num:num}]
			$.cookie("goods",JSON.stringify(arr),{
				expires:1,
				path:'/'
			});
		}else{
			//cookie已经存在
            var cookieArr = JSON.parse($.cookie("goods"))
            // console.log(cookieArr);
			for(var i=0;i<cookieArr.length;i++){
				//如果该商品已经存在这里就进入分支
				if(cookieArr[i].id == id){
					console.log("商品已经存在");
					same = true;
					cookieArr[i].num = parseInt(cookieArr[i].num);
					cookieArr[i].num += parseInt(num);
					break;
				}
			}
			if(!same){
				console.log("进入第一次添加商品");
				var obj = {id:id,num:num};
				cookieArr.push(obj);
			}
			$.cookie("goods",JSON.stringify(cookieArr),{
				expires:1,
				path:'/'
			})
        }
        sum();
            //显示成功弹窗
            $('#sucess').addClass('open');
            //给弹窗添加一个滚轮事件
           $(window).on('scroll resize',function() {
               console.log('窗口改变');
            var l = ($(window).outerWidth() - $(".shopBox").outerWidth())/2;
            var t = ($(window).outerHeight() - $(".shopBox").outerHeight()) / 2 + $(window).scrollTop();

            $(".shopBox").css({
                left: l,
                top: t
            });
           });
        // });
    }

    //计算购物车数量
    function sum(){
		var cookieArr = JSON.parse($.cookie("goods"))
		console.log(cookieArr)
		var sum = 0
		if(cookieArr != null){
			for( var i=0;i<cookieArr.length;i++){
				sum += parseInt(cookieArr[i].num)
			}
		}
		return sum
    }
    
    //放大镜功能
    function manifer(){
        $('.bigImg').mouseenter(function() {
            $('.msg').show();
            $('.manifer').show();
        }).mousemove(function(ev) {
            var left = ev.clientX - $('.bigImg').offset().left - $('.msg').width()/2,
                top = ev.clientY - $('.bigImg').offset().top - $('.msg').height()/2+$(window).scrollTop();
            
            if(left <= 0) left = 0;
            if(top <= 0) top = 0;
            if(left >= $('.bigImg').width() - $('.msg').width()) left = $('.bigImg').width() - $('.msg').width(); 
            if(top >= $('.bigImg').width() - $('.msg').height()) top = $('.bigImg').width() - $('.msg').height()
            $('.msg').css({
                left:left,
                top:top
            });
            $('.msg img').css({
                left:-2.35*left,
                top:-2.35*top
            })
        }).mouseleave(function() {
            $('.msg').hide();
            $('.manifer').hide();
        });
    }

    //鼠标移入换图
    function changeImg(){
        $('.left .smallImg .imgList').on('mouseenter','li',function() {
            $('.left .bigImg li').removeClass('active');
            $('.left .bigImg li').eq($(this).index()).addClass('active');
            $('.manifer img').removeClass('active');
            $('.manifer img').eq($(this).index()).addClass('active');
            $('.msg img').removeClass('active');
            $('.msg img').eq($(this).index()).addClass('active');
        });

    }

    //小图左右移动
    function smallImgMove(){
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
    }
    //添加和减少产品数量
    function changeNum(){
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
    }

    //推荐商品左右移动
    function recoMove(){
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

    //评价处点击
    function Eval(){
        $('.infoTitle').on('click','li',function() {
            console.log(111);
            $(this).parent().find('li').removeClass('active');
            $(this).addClass('active');
            $('.infoImg').add('.proPram').add('.shopAfter').removeClass('show');
            $('.proServer dd li').removeClass('active');
            $('.proServer dd li').eq($(this).index()).addClass('active');
            switch($(this).index()){
                case 0: $('.infoImg').addClass('show');
                        break;
                case 1: $('.proPram').addClass('show');
                    break;
                case 2: $('.shopAfter').addClass('show');
                    break;
            }
        });
    }

    //产品相关服务定位
    function server(){
        $(window).scroll(function() {
            console.log($(window).scrollTop());
            if($(window).scrollTop() >= 800){
                $('.proServer').css({
                    display:'flex',
                    top:$(window).scrollTop()
                });
            }else{
                $('.proServer').css('display','none');
            }
        })
    }
    return{
        detailsContent:detailsContent,
        detailEvent:detailEvent
    }

});