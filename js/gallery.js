// 모달용 이미지
const imagePaths = [];
for (let i = 1; i <= 54; i++) {
  const num = i.toString().padStart(3, "0");
  imagePaths.push(`img/resize_img/${num}.webp`);
}

// 슬라이더용 이미지지
const imagePaths2 = [];
for (let i = 1; i <= 54; i++) {
  const num = i.toString().padStart(3, "0");
  imagePaths2.push(`img/crop_img/${num}.webp`);
}

const pageSize = 9;
const wrapper = document.getElementById("swiperWrapper");
const modalWrapper = document.getElementById("modalSwiperWrapper");

// 메인 슬라이더 이미지 페이지 생성
for (let i = 0; i < imagePaths2.length; i += pageSize) {
  const slide = document.createElement("div");
  slide.className = "swiper-slide main-swiper-slide";

  imagePaths2.slice(i, i + pageSize).forEach((src, index) => {
    const img = document.createElement("img");
    const realIndex = i + index;
    img.src = src;
    img.alt = `Image ${realIndex + 1}`;
    img.addEventListener("click", () => openModal(realIndex));
    slide.appendChild(img);
  });

  wrapper.appendChild(slide);
}

// 모달 내부 이미지 슬라이드 생성
imagePaths.forEach((src, i) => {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Image ${i + 1}`;
  img.className = "modal-image"
  slide.appendChild(img);
  modalWrapper.appendChild(slide);
});

// 메인 슬라이더 초기화
const swiper = new Swiper('.main-swiper', {
  loop: false,
  grabCursor: true,
  direction: 'horizontal', // ← 명시적으로 가로 방향
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

let modalSwiper;

// ======= 공통: 모바일 뷰포트 높이 계산 =======
function setModalHeight() {
  const modal = document.getElementById("imageModal");
  if (!modal) return;
  const vh = window.innerHeight * 0.01;
  modal.style.setProperty('--vh', `${vh}px`);
}

function openModal(index) {
  document.body.style.overflow = 'hidden';
  
  // 모바일에서 주소창 숨기기 위한 스크롤 방지
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.height = '100%';
  
  const modal = document.getElementById("imageModal");
  modal.style.display = "block";
  
  setModalHeight();
  
  // 화면 크기 변경시에도 높이 재설정
  window.addEventListener('resize', setModalHeight);

  if (!modalSwiper) {
    modalSwiper = new Swiper('.modal-swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      swipeHandler: '.modal-image', // 이미지만 스와이프 허용
      centeredSlides: true, // 슬라이드를 중앙에 정렬
    });
  } else {
    modalSwiper.update(); // 모달 다시 열 때 슬라이더 갱신
  }

  modalSwiper.slideToLoop(index, 0);

  const images = modalWrapper.querySelectorAll('img');
  let loaded = 0;
  images.forEach(img => {
    img.onload = () => {
      loaded++;
      if (loaded === images.length) {
        if (modalSwiper) modalSwiper.update();
        modalSwiper.slideToLoop(index, 0);
      }
    };
  });
  // 만약 이미지가 이미 캐시에 있으면 onload가 안 불릴 수 있으니, 강제 update도 추가
  setTimeout(() => {
    if (modalSwiper) modalSwiper.update();
    modalSwiper.slideToLoop(index, 0);
  }, 500);
}

function closeModal() {
  document.body.style.overflow = ''; // 원래대로
  document.documentElement.style.overflow = ''; // 원래대로
  document.documentElement.style.height = ''; // 원래대로
  
  // 리사이즈 이벤트 리스너 제거
  window.removeEventListener('resize', setModalHeight);
  
  document.getElementById("imageModal").style.display = "none";
}

document.getElementById("imageModal").addEventListener("click", function(event) {
  // 이미지(.modal-image) 또는 닫기 버튼(.modal-close) 이면 무시
  if (
    event.target.classList.contains('modal-image') ||
    event.target.classList.contains('modal-close') ||
    event.target.classList.contains('swiper-button-prev') ||
    event.target.classList.contains('swiper-button-next')
  ) {
    return;
  }
  // 그 외(배경 등)는 모달 닫기
  closeModal();
});
