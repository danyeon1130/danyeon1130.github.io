document.addEventListener('DOMContentLoaded', function() {
  const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
  const options = {
    threshold: 0.5 // 화면 중간쯤(50%)에서 트리거
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 한 번만 실행하려면
      }
    });
  }, options);

  fadeEls.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const svgs = document.querySelectorAll(".svg-draw");
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(handle, {
          threshold: 0.1,
          rootMargin: "0px 0px 0px 0px" // 하단 살짝 여유
        })
      : null;
  
    function handle(entries) {
      entries.forEach(entry => {
        const lines = entry.target.querySelectorAll(".stroke");
        if (entry.isIntersecting) {
          // 보일 때: 애니메이션 재시작
          lines.forEach(el => {
            // 일단 제거 (리셋)
            el.classList.remove("animate");
            // 강제 리플로우로 애니메이션 초기화
            void el.getBoundingClientRect();
            // 다시 시작
            el.classList.add("animate");
          });
        } else {
          // 화면 밖으로 나갔을 때: 다음 진입을 위해 원상복구
          lines.forEach(el => {
            const len = parseFloat(el.style.strokeDasharray) || 1000;
            el.classList.remove("animate");
            el.style.strokeDashoffset = String(len);
          });
        }
      });
    }
  
    // 3) 관찰 시작 (폴백: IO 미지원이면 즉시 애니메이션)
    svgs.forEach(svg => {
      if (observer) {
        observer.observe(svg);
      } else {
        svg.querySelectorAll(".stroke").forEach(el => el.classList.add("animate"));
      }
    });
  });