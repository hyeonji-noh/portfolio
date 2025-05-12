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

/* 클릭시 컬러 변경 */

    $(document).ready(function() {
    const contactSection = $('.contact_main');
    
    // 색상 초기화 함수
    function resetColors() {
      $('.cell').removeClass('highlight-orange highlight-mint');
    }
  
    // 색칠 애니메이션 함수
    function animateCells() {
      // 첫 번째 줄 주황색 칠하기
      $('.row1 .cell').each(function(index) {
        setTimeout(() => {
          $(this).addClass('highlight-orange');
        }, index * 300); // 각 셀마다 0.3초씩 지연
      });
  
      // 두 번째 줄 민트색 칠하기 (9개 셀은 민트색으로, 마지막 셀은 주황색)
      $('.row2 .cell').each(function(index) {
        if (index < 9) {
          setTimeout(() => {
            $(this).addClass('highlight-mint');  // 첫 9개 셀 민트색
          }, (10 + index) * 300); // 10개 셀 후 0.3초씩 지연
        }
        else if (index === 9) {
          // 마지막 셀 (10번째 셀) - 첫 번째 줄이 끝난 후 실행
          setTimeout(() => {
            $(this).removeClass('highlight-mint').addClass('highlight-orange');  // 마지막 셀 주황색
          }, 3000);  // 3초 후에 주황색이 나오도록 설정
        }
      });
  
      // 세 번째 줄 1-6열 민트색 칠하기
      $('.row3 .cell').each(function(index) {
        setTimeout(() => {
          if (index >= 0 && index < 6) {
            $(this).addClass('highlight-mint');
          }
        }, (20 + index) * 300); // 추가 지연
      });
  
      // 네 번째 줄 1-4열 민트색 칠하기
      $('.row4 .cell').each(function(index) {
        setTimeout(() => {
          if (index >= 0 && index < 4) {
            $(this).addClass('highlight-mint');
          }
        }, (30 + index) * 300); // 추가 지연
      });
    }
  
    // 새로고침 후 애니메이션 초기화 및 첫 로드 시 실행
    $(window).on('load', function() {
      // 새로고침 시 Contact 섹션이 화면에 보일 때만 애니메이션 실행
      const sectionTop = contactSection.offset().top;
      const windowTop = $(window).scrollTop();
      const windowBottom = windowTop + $(window).height();
  
      // 페이지 로딩 후 Contact 섹션이 처음 화면에 보일 때만 애니메이션 실행
      if (windowBottom > sectionTop && windowTop < (sectionTop + contactSection.outerHeight())) {
        resetColors();  // 색상 초기화
        animateCells();  // 애니메이션 실행
        contactSection.addClass('animated');  // 애니메이션 완료 표시
      }
    });
  
  });


});