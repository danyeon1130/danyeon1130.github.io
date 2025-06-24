// 1. 카카오 SDK 초기화: YOUR_APP_KEY를 실제 앱 키로 교체하세요
Kakao.init('809eab14a2f69f9dd38fb03332cecb31');
console.log('kakao sdk ready:', Kakao.isInitialized());

// 2. 카카오톡 공유 버튼 이벤트
Kakao.Share.createDefaultButton({
  container: '#kakao-share-btn',
  objectType: 'feed',
  content: {
    title: '연수 ♥ 단비 결혼합니다.',
    description: '11월 30일 오후 3시 40분',
    imageUrl:
      'https://danyeon1130.github.io/img/head.png',
    link: {
      // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
      mobileWebUrl: 'https://danyeon1130.github.io/',
      webUrl: 'https://danyeon1130.github.io/',
    },
  },
  buttons: [
    {
      title: '웹으로 보기',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://developers.kakao.com',
      },
    }
  ],
});

// 3. 링크 복사 버튼 이벤트
document.getElementById('link-copy-btn').addEventListener('click', function() {
  navigator.clipboard.writeText(window.location.href)
    .then(() => {
      alert('링크가 복사되었습니다!');
    })
    .catch(err => {
      console.error('링크 복사 실패:', err);
      alert('복사에 실패했습니다.');
    });
});
