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
    alert("계좌번호가 복사되었습니다: " + text);
  }, function(err) {
    alert("복사 실패: " + err);
  });
}

function closeContactModal(id) {
  document.getElementById(id).style.display = "none";
}