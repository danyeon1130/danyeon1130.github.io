document.getElementById("groomBtn").onclick = function() {
  document.getElementById("groomModal").style.display = "flex";
}
document.getElementById("brideBtn").onclick = function() {
  document.getElementById("brideModal").style.display = "flex";
}
document.getElementById("contactBtn").onclick = function() {
  document.getElementById("contactModal").style.display = "flex";
}

// 모달 외부 클릭 시 닫기
document.querySelectorAll('.contact-modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) { // 바깥 영역 클릭시만 닫기
      modal.style.display = 'none';
    }
  });
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    showToast("복사되었습니다");
  }, function(err) {
    showToast("복사 실패: " + err);
  });
}

function closeContactModal(id) {
  document.getElementById(id).style.display = "none";
}

// Toast helper
function ensureToastContainer() {
  var existing = document.getElementById('toastContainer');
  if (existing) return existing;
  var container = document.createElement('div');
  container.id = 'toastContainer';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

function showToast(message, options) {
  var opts = options || {};
  var durationMs = typeof opts.duration === 'number' ? opts.duration : 1800;
  var container = ensureToastContainer();

  var toast = document.createElement('div');
  toast.className = 'toast-message';
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