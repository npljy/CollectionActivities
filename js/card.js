certifySwiper = new Swiper('#certify .swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    loopedSlides: 6,
    coverflowEffect: {
        rotate: 0,
        stretch: 100,
        depth: 60,
        modifier: 1,
        slideShadows : true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            switch(index){
                case 0:
                    src = "./imgs/jiaolv-btn.jpg";
                    srcH = "./imgs/jiaolv-h-btn.jpg";
                    num = 1;
                    break;
                case 1:
                    src = "./imgs/jiujie-btn.jpg";
                    srcH = "./imgs/jiujie-h-btn.jpg";
                    num = 2;
                    break;
                case 2:
                    src = "./imgs/buzixin-btn.jpg";
                    srcH = "./imgs/buzixin-h-btn.jpg";
                    num = 0;
                    break;
                case 3:
                    src = "./imgs/shilian-btn.jpg";
                    srcH = "./imgs/shilian-btn.jpg";
                    num = 8
                    break;
                case 4:
                    src = "./imgs/shimian-btn.jpg";
                    srcH = "./imgs/shimian-h-btn.jpg";
                    num = 0;
                    break;
                case 5:
                    src = "./imgs/langbei-btn.jpg";
                    srcH = "./imgs/langbei-h-btn.jpg";
                    num = 0;
                    break;
            }
            if(num){
                return '<span class="' + className + '"><img src="'+src+'"/><i class="num">'+num+'</i></span>';
            }else{
                return '<span class="' + className + '"><img src="'+srcH+'"/></span>';
            }
        },
    },
    on: {
        progress: function (progress) {
            for (i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;
                translate = slideProgress * 4 + 'rem';
                scale = 1 - Math.abs(slideProgress) / 10;
                zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                slide.css('zIndex', zIndex);
                slide.css('opacity', 1);
                if (Math.abs(slideProgress) > 3) {
                    slide.css('opacity', 0);
                }
            }
        },
        setTransition: function (transition) {
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                slide.transition(transition);
            }
        }
    }
})


$(function(){

    function shake(obj,attr,num)
    {
        var timer1 = null;
        var n = 0;
        var arr = [];
        var degNum = 0;
        for(var i = num ; i > 0 ; i -= 3){
            arr.push(i,-i);
        }
        if(attr === "transform"){
            timer1 = setInterval(function(){
                // degNum = parseInt(obj.style[attr].match(/\d{1,}/)[0]) + parseInt(arr[n]);
                degNum = parseInt(arr[n]);
                obj.style[attr] = "rotateZ("+ degNum + "deg)";
                obj.style[attr] = "rotateZ("+ 0 + "deg)";
                n++;
                obj.style[attr] = "rotateZ("+ degNum + "deg)";
                n > arr.length && (clearInterval(timer1), n = 0 );
            },50)
        }else{
            timer1 = setInterval(function(){
                obj.style[attr] = parseFloat(getComputedStyle(obj)[attr]) + arr[n] + "px";
                n++;
                n > arr.length && (clearInterval(timer1), n = 0 );
            },50)
        }	
    }


    var mh = 0;
    var sh = $("html")[0].scrollHeight || $("body")[0].scrollHeight  ;
    var wh =  window.innerHeight;
    if(sh <= wh) mh = wh;
    else mh = sh;
    $(".mask").eq(0).css("height",mh); 

    var newCard = $(".get-card")[0];
    var gongxiBtn = $(".love")[0];
    shake(gongxiBtn,"transform",12)
    setInterval(function(){
        shake(gongxiBtn,"transform",15)
    },5000)
    countdownFn();
    function countdownFn(){
        cdtimer = setInterval(function () {
            var nowTime = + new Date();
            var myTime = "2018-05-20 00:00:00";
            // console.log(myTime.substr(0,10)+"T"+myTime.substr(11,8))
            var finishTime = + new Date( myTime.substr(0,10)+"T"+myTime.substr(11,8)) ;
            var countTime = finishTime - nowTime;
            countTime = countTime / 1000;
            var secds = Math.floor(countTime % 60);
            countTime = countTime / 60;
            var mins = Math.floor(countTime % 60);
            countTime = countTime / 60;
            var hours = Math.floor(countTime % 24);
            var days = Math.floor(countTime / 24);
            if (countTime < 0) { clearInterval(cdtimer); return; };
            if(days < 10) days = "0"+ days;
            if(hours < 10) hours = "0"+ hours;
            if(mins < 10) mins = "0"+ mins;
            if(secds < 10) secds = "0"+ secds;
            $(".still").eq(0).html("<em>"+days+"</em>天<em>"+hours+"</em>时<em>"+mins+"</em>分<em>"+secds+"</em>秒");
        }, 1000);
    
    }

    // 点击抽卡，弹出新卡
    // 领卡与新卡动画效果一致
    $(".click-btn .able").eq(0).on("touchstart",function(e){
        
        $(".init-card").eq(0).hide();// 隐藏初始卡片
        $(".mask").eq(0).show();
        $(".get-card").css({"top":"2rem"});
        $(".get-card").show();
        setTimeout(function(){
            $(".get-card").css({"transition":".3s"});
            $(".get-card").css({"transform":"translateX(-50%) translateZ(3rem) scale(1.5) rotateY(0)"} )
            setTimeout(function(){
                $(".get-card").css("transition",".5s");
                $(".get-card").css({"transform":"translateX(-50%) translateZ(3rem) scale(1) rotateY(180deg)"})
                setTimeout(function(){
                    $(".get-card").css("transition","1s");
                    $(".get-card").css({"transform":"translateX(-50%) translateZ(3rem) scale(1) rotateY(360deg)"});
                    // +++++++++
                    setTimeout(function(){
                        $(".geted").eq(0).show();
                    },1000);
                },110)
            },360)
        }) 
        e.preventDefault();
    })

    // 新卡，关闭
    $(".geted").eq(0).on("touchstart",function(e){
        $(".mask").eq(0).hide();
        $(".get-card").hide();
        $(".geted").eq(0).hide();
        $(".swiper-pagination-bullet").eq(4).click();
        $(".get-card").css({"top":"-10rem","transform":"translateX(-50%)  translateZ(3rem) scale(0.1) rotateY(0deg)"})
        e.preventDefault();
    })
    // 集齐弹窗，关闭
    $(".count-down .close").eq(0).on("touchstart",function(e){
        $(".count-down").hide();
        $(".mask").eq(0).hide();
        e.preventDefault();
    })
    // 瓜分弹窗，关闭
    $(".get-bonus .close").eq(0).on("touchstart",function(e){
        $(".get-bonus").hide();
        $(".mask").eq(0).hide();
        e.preventDefault();
    })
    // 活动结束，关闭
    $(".game-over .close").eq(0).on("touchstart",function(e){
        $(".game-over").hide();
        $(".mask").eq(0).hide();
        e.preventDefault();
    })
    // 活动规则 ↓
    // 点击活动规则按钮,打开弹窗
    $(".card-list a").eq(0).on("touchstart",function(e){
        $(".mask").eq(0).show();//打开半透明遮罩层
        $(".rules").eq(0).show();//打开弹窗
        e.preventDefault();
    })
    // 关闭弹窗
    $(".rules img").eq(0).on("touchstart",function(e){
        $(".rules").eq(0).hide();
        $(".mask").eq(0).hide();
        e.preventDefault();
    })
    // 活动规则 ↑
    // 点击集齐按钮 ↓
    // 已经集齐才会显示，静态页面默认显示，请隐藏，请判断
    $(".love img").eq(0).on("touchstart",function(e){
        $(".mask").eq(0).show();// 显示遮罩层 
        // $(".init-card").eq(0).hide();//关闭 初始卡片
        // console.log($(".love")[0].style.transform.match(/\d{2,}/))
        // 1，如果开奖时间没到，显示倒计时 ；
        $(".count-down").eq(0).show();
        // // 2，如果开奖时间到，且活动时间没结束，显示瓜分结果 
        // $(".get-bonus").eq(0).show();
        // // 3，如果活动结束显示 活动结束
        // $(".game-over").eq(0).show();
        e.preventDefault();
    })
    // 点击集齐按钮 ↑


    
        

})


