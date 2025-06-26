document.addEventListener('DOMContentLoaded', function() {
  const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
  const options = {
    threshold: 0.15 // 화면에 15%만 보여도 트리거
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