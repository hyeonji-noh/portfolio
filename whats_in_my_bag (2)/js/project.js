$(function(){

/* 다른 section 이동 */
$('.move-to').on('click', function () {
    const targetId = $(this).data('target');

    // 모든 섹션 숨기고
    $('.section').removeClass("show");

    // 메인백 사라지게 하고
    $('.main_bag').fadeOut(800, function () {
      // 타겟 섹션만 보여주기
      $('#' + targetId).addClass("show").fadeIn(800);
    });
  });    



/* 포스트잇 이동 */

document.querySelectorAll('.postit-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const img = tab.querySelector('img');
      const url = tab.getAttribute('data-url');
  
      img.classList.add('animate');
  
      setTimeout(() => {
        if (url) {
          window.open(url, '_blank');
        }
      }, 1000);
    });
  });
  
  // 페이지로 다시 돌아왔을 때 포스트잇 복원
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      document.querySelectorAll('.postit-tab img').forEach(img => {
        img.classList.remove('animate');
      });
    }
  });
  
  //다른 페이지로 이동
  document.querySelectorAll('.postit-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      const img = tab.querySelector('img');
      const p = tab.querySelector('p');
      const targetPage = tab.getAttribute('data-url');
  
      if (img && p && targetPage) {
        img.classList.add('animate');
        p.classList.add('animate');
  
        setTimeout(() => {
          window.open(targetPage, '_blank'); // 새 창 열기
  
          // 1초 뒤에 다시 돌아오게 하기
          img.classList.remove('animate');
          p.classList.remove('animate');
        }, 1500); // 페이지 이동 전에 여유 두고 복구
      }
    });
  });
  
});