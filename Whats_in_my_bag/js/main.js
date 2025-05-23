$(function () {
  window.scrollTo(0, 0);
    if (window.location.hash) {
    history.replaceState(null, null, ' ');
  }

/* 레일, 가방 애니메이션 */
let percent = 0; // 시작 퍼센트
const gateEl = document.getElementById("gate-number");
const rail = document.querySelector(".rail-img");
const bag = document.querySelector(".first_loading .bag");
const firstLoading = document.querySelector(".first_loading");
const mainBag = document.querySelector(".main_bag");

// 로딩 애니메이션 실행
document.body.style.overflow = "hidden";
firstLoading.style.display = "block";
mainBag.style.display = "none";

const interval = setInterval(() => {
    percent++;
    gateEl.textContent = `gate ${String(percent).padStart(2, '0')}`; // 텍스트 업데이트

    if (percent >= 100) {
      clearInterval(interval);
      // sessionStorage.setItem("loadedOnce", "true");
      // location.href = '#con1';
      setTimeout(() => {
      firstLoading.style.display = "none";
      mainBag.style.display = "block";
      document.body.style.overflow = "auto";
      document.querySelector('#con1')?.scrollIntoView({ behavior: 'smooth' });
      
      startMainAnimation();
    }, 300);
  }
  }, 40);


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

  /* 다른 section 이동 */

  $(function () {
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

/* resume_stamp */

const stamp = document.querySelector('.stamp');
const section = document.querySelector('.Resume_stamp');
const overlay = document.querySelector('.boarding-text-wrapper');
const text = document.querySelector(".boarding-line");
const stampEffect = document.querySelector(".stamp-effect1");
const waveEffect = document.querySelector(".wave-effect2");

let typingInterval;
let i = 0;
const content = "Boarding complete!\nNow entering the world of design.";

function clearTyping() {
  clearInterval(typingInterval);
  text.innerHTML = "";
}

function resetStampAnimation() {
  clearTyping();
  overlay.classList.remove("on");

  stampEffect.style.opacity = 0;
  waveEffect.style.opacity = 0;

  stampEffect.classList.remove("show");
  waveEffect.classList.remove("show");

  stamp.classList.remove("animate");
  void stamp.offsetWidth;
}

function startTyping() {
  i = 0;
  text.innerHTML = "";
  stampEffect.style.opacity = 0;
  waveEffect.style.opacity = 0;

  typingInterval = setInterval(() => {
    if (i >= content.length) {
      clearInterval(typingInterval);

      // 마지막 글자도 빨간색으로 바꾸기
      const allChars = text.querySelectorAll(".char");
      if (allChars.length > 0) {
        allChars[allChars.length - 1].classList.add("red");
      }
      
      setTimeout(() => {
        overlay.classList.remove("on"); 
      }, 1000);
      return;
    }

    const char = content[i++];

    if (char === "\n") {
      text.appendChild(document.createElement("br"));
    } else {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("char");

      // 이전 글자를 빨간색으로
      const prev = text.querySelectorAll(".char");
      if (prev.length > 0) {
        prev[prev.length - 1].classList.add("red");
      } 
      

      text.appendChild(span);

      // 특수 타이밍 이벤트 (예시: 도장 끝나고 wave 등장)
      if (i === "Boarding complete!".length) {
        // boarding complete! 끝난 직후: 도장 이미지 등장
        stampEffect.style.opacity = 1;
        stampEffect.classList.add("show");
      }

      if (i === "Boarding complete!\nNow entering".length) {
        // Now entering 타이핑 시작할 때 wave 등장
        waveEffect.style.opacity = 1;
        waveEffect.classList.add("show");
      }
    }
  }, 150);
}

let hasScrolledIntoStamp = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if(!hasScrolledIntoStamp){
        // 처음 들어왔는지 확인
        hasScrolledIntoStamp = true;
        // 메인 페이지에서 너무 위쪽이면 실행 방지
        if (window.scrollY < 500) return;
      }
      resetStampAnimation();

      setTimeout(() => {
        stamp.classList.add('animate');
      }, 80);

      setTimeout(() => {
        overlay.classList.add("on");
        startTyping();
      }, 2100);
    } else {
      resetStampAnimation();
    }
  });
}, { threshold: 0.5 });

observer.observe(section);

// 히스토리 뒤로가기로 복귀할 때도 초기화
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    resetStampAnimation();
  }
});

/* sticker_book */
const clickMe = document.querySelector('.click-me-text');
  const stickerSection = document.querySelector('.sticker_book');

  window.addEventListener('scroll', () => {
    const sectionTop = stickerSection.offsetTop;
    const sectionHeight = stickerSection.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 스크롤 위치가 sticker_book 영역에 들어왔을 때만 표시
    if (scrollY + windowHeight > sectionTop + 100 && scrollY < sectionTop + sectionHeight) {
      clickMe.style.display = 'block';
    } else {
      clickMe.style.display = 'none';
    }
  });

//클릭시 말풍선 등장
const character = document.querySelector('.character');
const bubble = document.querySelector('.speech-bubble');

character.addEventListener('click', () => {
  bubble.classList.toggle('show');
  bubble.classList.remove('hidden');
});

// li 클릭
const skillItems = document.querySelectorAll('.sticker-left ul li');
const flowerBubble = document.querySelector('.flower-bubble');
const flowerText = document.querySelector('.flower-text');

const leftWrapper = document.querySelector('.sticker-left');
const skilldescriptions = [
  "일러스트 : 중", 
  "포토샵 : 상", 
  "피그마 : 상", 
  "VS Code : 중"
];

skillItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const rect = item.getBoundingClientRect();
    const wrapperRect = leftWrapper.getBoundingClientRect();

    const top = rect.top - wrapperRect.top - 250; // li 위쪽에 띄우기
    const left = rect.left - wrapperRect.left + (rect.width / 0.6) - (flowerBubble.offsetWidth / 2);

    flowerBubble.style.bottom = `${top}px`;
    flowerBubble.style.left = `${left}px`;
    
    flowerText.textContent = skilldescriptions[index];
    flowerBubble.classList.add('active');

    // 자동으로 사라지게 (선택사항)
    setTimeout(() => {
      flowerBubble.classList.remove('active');
    }, 3000);
  });
});

/* sticker_right 클릭시 p등장 */
document.querySelectorAll('.sticker-right .sticker').forEach((sticker) => {
  sticker.addEventListener('click', () => {
    sticker.classList.toggle('active');
/*     setTimeout(() => {
      sticker.classList.remove('active');
    },3000); */ //3초후 사라짐
  });
});


/* right_img popup */
const stickers = document.querySelectorAll('.sticker-right .sticker');
const popup = document.getElementById('stickerPopup');
const popupText = document.getElementById('popupText');
const popupOverlay = document.getElementById('popupOverlay');

// 각 스티커에 대한 설명 텍스트 배열
const stickerDescriptions = [
  "유연하게 상황에 맞춰 움직이는 타입!",
  "창의력 넘치는 아이디어 메이커",
  "사람들을 이끄는 리더십과 협업 능력!",
  "시간 관리는 기본! 효율적인 스타일",
  "다리 힘으로 버티는 체력왕",
  "손재주 좋은 디테일 마스터",
  "운동으로 체력 유지 중!",
  "에너지 레벨 10000%! 활력 넘치는 스타일"
];

// 닫기 함수
function closePopup() {
  popup.classList.remove('show');
  popupOverlay.classList.remove('show');
}

// 팝업, 배경 클릭 시 닫힘
popup.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);


// 스티커 클릭 이벤트
stickers.forEach((sticker, index) => {
  sticker.addEventListener('click', () => {
    // p 태그 등장
    sticker.classList.add('active');

    // popup은 약간 딜레이 후 등장 (p 태그 등장 이후)
    setTimeout(() => {
      popupText.textContent = stickerDescriptions[index];
      popup.classList.add('show');
      popupOverlay.classList.add('show');
      setTimeout(closePopup, 2000); // 자동 닫힘
    }, 500); // p가 자연스럽게 등장하고 나서 팝업 등장
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

  // 스크롤 이벤트에 따라 애니메이션 실행
  $(window).on('scroll', function() {
    const sectionTop = contactSection.offset().top;
    const sectionBottom = sectionTop + contactSection.outerHeight();
    const windowTop = $(window).scrollTop();
    const windowBottom = windowTop + $(window).height();

    // 섹션이 화면에 보일 때만 애니메이션 실행
    if (windowBottom > sectionTop && windowTop < sectionBottom) {
      // 이미 애니메이션이 실행되었는지 체크
      if (!contactSection.hasClass('animated')) {
        resetColors();  // 색상 초기화
        animateCells();  // 애니메이션 실행
        contactSection.addClass('animated');  // 애니메이션 완료 상태 표시
      }
    }
  });
});
})