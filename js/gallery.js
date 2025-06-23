const imagePaths = [];
for (let i = 1; i <= 5; i++) {
  imagePaths.push(`img/gall_test/${i}.png`);
}
for (let i = 1; i <= 5; i++) {
  imagePaths.push(`img/gall_test/${i}.png`);
}
for (let i = 1; i <= 5; i++) {
  imagePaths.push(`img/gall_test/${i}.png`);
}
for (let i = 1; i <= 5; i++) {
  imagePaths.push(`img/gall_test/${i}.png`);
}
for (let i = 1; i <= 5; i++) {
  imagePaths.push(`img/gall_test/${i}.png`);
}

const pageSize = 9;
const wrapper = document.getElementById("swiperWrapper");
const modalWrapper = document.getElementById("modalSwiperWrapper");

// 메인 슬라이더 이미지 페이지 생성
for (let i = 0; i < imagePaths.length; i += pageSize) {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";

  imagePaths.slice(i, i + pageSize).forEach((src, index) => {
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
const swiper = new Swiper('.swiper:not(.modal-swiper)', {
  loop: false,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

let modalSwiper;

function openModal(index) {
  document.body.style.overflow = 'hidden';
  const modal = document.getElementById("imageModal");
  modal.style.display = "block";

  if (!modalSwiper) {
    modalSwiper = new Swiper('.modal-swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      swipeHandler: '.modal-image', // 이미지만 스와이프 허용
    });
  } else {
    modalSwiper.update(); // 모달 다시 열 때 슬라이더 갱신
  }

  modalSwiper.slideTo(index, 0);
}

function closeModal() {
  document.body.style.overflow = ''; // 원래대로
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
