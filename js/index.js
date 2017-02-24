$(function () {
    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 3000,
        speed:1000,
        loop: true
    });
    var s = skrollr.init({
        smoothScrolling: false,
        mobileDeceleration: 0.004
    });

    $('.next').click(function () {
        slideToNext();
    })


    //点击APP下载弹出APP二维码
    $('#nav li:nth-child(1)').click(function () {
        $(".mengban").fadeIn();
    });
    $(".mengban").click(function () {
        $(".mengban").fadeOut();
    });

// Slide to next, scroll, mouse
    var height = [];
    $('.content-line').each(function (i) {
        if (i !== 0)
            height.push($(this).offset().top);

    })

    var scroll = false;
    var slideToNext = function (h) {
        h = h === undefined ? window.scrollY : h;

        var i, max = height.length, half = (document.body.clientHeight / 2);
        for (i = 0; i < max; i++) {
            if (height[i] > h + half + 1) {
                h = height[i] - half;
                scroll = true;
                $("html,body").animate({scrollTop: h}, 1000, function () {
                    setTimeout(function () {
                        scroll = false;
                    }, 100);
                });

                return;
            }
        }
    }

    var scrollH;
    $(window).on('mousewheel', function (e) {
        // 正在滚动时，禁用鼠标
        if (scroll) {
            e.stopPropagation()
            e.preventDefault()
        }
    })
    $(window).scroll(function (e) {

        // 向下滑动
        if (scrollH < window.scrollY) {

            if (scroll === false) {
                slideToNext();
            }
        }

        scrollH = window.scrollY;

        //距离顶部的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //console.log(scrollTop);
        var index = Math.round(scrollTop / 1000);
        //console.log(index);

        var nav = document.getElementById("nav");
        var links = nav.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            links[i].className = '';
            links[index].className = 'active';
        }
    });
//导航栏
    var nav = document.getElementById("nav");
    var links = nav.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            for (var j = 0; j < links.length; j++) {
                if (links[j] == this) {
                    this.className = 'active';
                } else {
                    links[j].className = '';
                }
            }
        }
    }
//回到顶部
    var winHeight = $(window).height();
    $(window).scroll(function () {
        var myTop = $(window).scrollTop();
        if (myTop > winHeight) {
            $(".top").fadeIn(1000, function () {
                $(this).clearQueue();
            });
        } else {
            $(".top").fadeOut(1000, function () {
                $(this).clearQueue();
            });
        }
    });

    $(".top").on("click", function () {
        $("body,html").animate(
            {
                scrollTop:0
            }
        );
    });
    //点击导航跳转到指定位置
    var aLi = $('#nav li');
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        if (i == 0) {
            aLi[i].onclick = function () {
                $("body,html").scrollTop(0);
            }
        } else {
            aLi[i].onclick = function () {
                console.log($('.cont_positon').eq(this.index).offset().top);
                $("body,html").scrollTop($('.cont_positon').eq(this.index).offset().top - screen.height / 4);
            }
        }
    }


    //点击展开QQ客服
    H_qqServer = {};
    H_qqServer.clickOpenServer = function () {
        $('.qq-client-open').mouseover(function () {
            $('.qq-client').animate({
                right: '-50'
            }, 400);
            $('.qq-client-content').animate({
                right: '0',
                opacity: 'show'
            }, 800);
        });
        $('.qq-client-close').click(function () {
            $('.qq-client').animate({
                right: '0',
                opacity: 'show'
            }, 400);
            $('.qq-client-content').animate({
                right: '-250',
                opacity: 'show'
            }, 800);
        });
    };
    H_qqServer.run = function () {
        this.clickOpenServer();
    };
    H_qqServer.run();
});
