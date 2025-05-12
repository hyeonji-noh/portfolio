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
/* const skillItems = document.querySelectorAll('.sticker-left ul li');
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
}); */

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
});