/* 메인 가방 */
function startMainAnimation() {
    // 1. 가방 등장
    $('.bag').fadeTo(800, 1);

    // 2. 텍스트 타이핑은 동시에 시작
    $('#text1').text('');
    $('#text2').text('');
    $('#text3').text('');
    $('#text4').text('');

    function typeText(element, text, speed, callback) {
        let i = 0;
        let typing = setInterval(() => {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
            } else {
                clearInterval(typing);
                if (callback) callback();
            }
        }, speed);
    }

    typeText($('#text1'), "What’s", 150, function () {
        typeText($('#text2'), "in", 150, function () {
            typeText($('#text3'), "my", 150, function () {
                typeText($('#text4'), "bag?", 150);
            });
        });
    });

    // 3. 아이템 등장 (가방 등장과 동시에 시작, 텍스트보단 살짝 늦게)
    setTimeout(() => {
        $('.item1').fadeTo(300, 1).css('transform', 'translate(-50%, -50%) scale(0.95)');
    }, 500);
    setTimeout(() => {
        $('.item2').fadeTo(300, 1).css('transform', 'translate(-50%, -50%) scale(0.95)');
    }, 800);
    setTimeout(() => {
        $('.item3').fadeTo(300, 1).css('transform', 'translate(-50%, -50%) scale(0.95)');
    }, 1100);
    setTimeout(() => {
        $('.item4').fadeTo(300, 1).css('transform', 'translate(-50%, -50%) scale(0.95)');
    }, 1400);

    // 4. 아이템 다 등장 후 Resume로 스크롤 (아이템 마지막 + 약간의 여유)
    setTimeout(() => {
        document.querySelector('.Resume')?.scrollIntoView({ behavior: 'smooth' });
    }, 1800 + 1200);
}

$('.ham').click(function(){
    $('.main_bag').addClass('on');
    $('.bag, .item1, .item2, .item3, .item4').css({ opacity: 0 });
    startMainAnimation();
});