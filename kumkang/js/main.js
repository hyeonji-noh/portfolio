$(function () {

    /* nav */
    $('nav ul.gnb>li').mouseenter(function () {
        $('nav ul.gnb>li>ul').stop().slideDown();
    });
    $('nav ul.gnb>li').mouseleave(function () {
        $('nav ul.gnb>li>ul').stop().slideUp();
    });

    /* content1 배경화면 & 마우스 신발 커서 */
    let startPos = $('.cursor').offset().top; // 시작 위치
    let endPos = $('.content2_brand').offset().top - 300;  // 끝 위치 (조절 가능);
    let bgOff = [];
    for (let i = 0; i < $('.content1_company ul.bg li').length; i++) {
        bgOff[i] = $('.content1_company ul.bg li').eq(i).offset().top - 300;
    }
    // console.log(bgOff);
    $(window).on("scroll", function () {
        let scrollTop = $(window).scrollTop();
        let movePos = Math.min(endPos, Math.max(startPos, scrollTop + 100)); // 이동 범위 설정
        let lineHeight = movePos - startPos; // 선의 높이 조절

        $(".cursor").css("top", movePos + "px");
        $(".line").css({
            "height": lineHeight + "px"
        });
        for (let i = 0; i < $('.content1_company ul.bg li').length; i++) {
            if (scrollTop >= bgOff[i]) {
                $('.content1_company ul.bg li').eq(i).addClass('on').siblings().removeClass('on');

            }
        }

        if (startPos - 400 <= scrollTop) {
            $('.cursor').addClass('on');
        }
    });

    /* content2_line 등장 */
    const content2BrandMain = document.querySelector(".content2_brand_main");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, { threshold: 0.8 });

    observer.observe(content2BrandMain);


    /* content2 이미지 */
    let images = $(".brand_all li"); // 모든 이미지 리스트 가져오기
    let index = 0; // 현재 보여지는 이미지 인덱스

    function changeImage() {
        images.eq(index).fadeOut(1000); // 현재 이미지 숨기기
        index = (index + 1) % images.length; // 다음 이미지 인덱스로 변경
        images.eq(index).fadeIn(1000); // 새로운 이미지 표시
    }

    images.hide(); // 처음엔 모든 이미지 숨기기
    images.eq(0).show(); // 첫 번째 이미지만 보이도록 설정
    setInterval(changeImage, 2000); // 2초마다 이미지 변경

    /* content2 slide */
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".next",
            prevEl: ".prev",
        },
    });

    /* content3 name */
    $('.txtAni1').simplyScroll({
        speed: 10,
        continuous: true,
    });
    $('.txtAni2').simplyScroll({
        speed: 10,
        continuous: true
    })
    $('.txtAni3').simplyScroll({
        speed: 10,
        continuous: true
    });

    /* magazine arcodian  */
    $('ul.magazine_txt li').click(function () {
        $('ul.magazine_txt li,ul.magazine_img li').removeClass('on');
        $('ul.magazine_txt p').hide();
        $(this).find('p').slideDown();
        let i = $(this).index();
        $('ul.magazine_img li').eq(i).addClass('on');
        $(this).addClass('on');
    });
});//ready end