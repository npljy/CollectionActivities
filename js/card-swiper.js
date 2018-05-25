certifySwiper = new Swiper('#certify .swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    grabCursor: true,
    // loop: true,
    // loopedSlides: 6,
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
                    src = "./imgs/tuoyan-btn.jpg";
                    srcH = "./imgs/tuoyan-btn.jpg";
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
                // modify = 1;
                // if (Math.abs(slideProgress) > 1) {
                // 	modify = (Math.abs(slideProgress) - 1) * 0.5 + 1;
                // }
                // translate = slideProgress * modify * 4.2 + 'rem';
                translate = slideProgress * 4.2 + 'rem';
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