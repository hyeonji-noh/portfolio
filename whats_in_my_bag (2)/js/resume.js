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

/* Resume 여권 */
  const passportImg = document.querySelector('.Resume_left img');
  const resumeSection = document.querySelector('.Resume');

  const passportObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        passportImg.classList.remove('jello-horizontal');
        void passportImg.offsetWidth;
        passportImg.classList.add('jello-horizontal');
      }
    });
    }, { threshold: 0.5 });

    passportObserver.observe(resumeSection);    
    
    /* right 튀어나오는 애니메이션 */
    document.querySelector('.Resume_left img').addEventListener('animationend', function () {
    document.querySelector('.Resume_right').classList.add('show');
    });
});