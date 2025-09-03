// ===== Toast helper (your snippet) =====
function ensureToastContainer() {
  var existing = document.getElementById('music-toastContainer');
  if (existing) return existing;
  var container = document.createElement('div');
  container.id = 'music-toastContainer';
  container.className = 'music-toast-container';
  document.body.appendChild(container);
  return container;
}

function showToast(message, options) {
  var opts = options || {};
  var durationMs = typeof opts.duration === 'number' ? opts.duration : 1800;
  var container = ensureToastContainer();

  var toast = document.createElement('div');
  toast.className = 'music-toast-message';
  toast.textContent = message;
  container.appendChild(toast);

  // trigger animation
  requestAnimationFrame(function() {
    toast.classList.add('show');
  });

  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  }, durationMs);
}
// ===== End toast helper =====

const audio = document.getElementById('bg-music');
const button = document.getElementById('music-toggle');
let isPlaying = false;
let autoplayTimer = null;

// Toggle button behavior
async function setPlaying(next) {
  if (next) {
    try {
      await audio.play();
      isPlaying = true;
      button.innerHTML = '<img src="icon/music_on.gif" alt="음악 켜짐">';
      button.classList.add("on");
      button.setAttribute("aria-pressed", "true");
    } catch (err) {
      isPlaying = false;
      button.innerHTML = '<img src="icon/music_off.png" alt="음악 꺼짐">';
      button.classList.remove("on");
      button.setAttribute("aria-pressed", "false");
      // Inform user when autoplay/play fails
      showToast("브라우저가 자동재생을 차단했어요. 우상단 버튼을 눌러 주세요.", { duration: 2600 });
      console.warn("Autoplay/play blocked:", err);
    }
  } else {
    audio.pause();
    isPlaying = false;
    button.innerHTML = '<img src="icon/music_off.png" alt="음악 꺼짐">';
    button.classList.remove("on");
    button.setAttribute("aria-pressed", "false");
  }
}

button.addEventListener('click', () => {
  // If user clicks before the 5s autoplay, cancel that timer
  if (autoplayTimer) {
    clearTimeout(autoplayTimer);
    autoplayTimer = null;
  }
  setPlaying(!isPlaying);
});

// 5-second delayed autoplay notice
window.addEventListener('DOMContentLoaded', () => {
  // 초기 상태: 음악 꺼짐 아이콘 표시
  button.innerHTML = '<img src="icon/music_off.png" alt="음악 꺼짐">';
  showToast("배경음악이 5초 뒤에 재생됩니다. (우상단에서 끌 수 있어요)", { duration: 2400 });

  autoplayTimer = setTimeout(() => {
    // Try autoplay after the delay
    setPlaying(true);
  }, 5000);
});

// Optional: stop music when tab becomes hidden; resume when visible and was playing.
// Comment out if you prefer continuous play regardless of tab visibility.
/*
let wasPlayingBeforeHide = false;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    wasPlayingBeforeHide = isPlaying;
    if (isPlaying) setPlaying(false);
  } else {
    if (wasPlayingBeforeHide) setPlaying(true);
  }
});
*/