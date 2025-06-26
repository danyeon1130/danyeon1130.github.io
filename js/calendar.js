// D-day 고정: 2025-11-30
const dDayYear = 2025;
const dDayMonth = 10; // 0-based (10 = 11월)
const dDayDate = 30;
const dDayString = `${dDayYear}-${String(dDayMonth+1).padStart(2,'0')}-${String(dDayDate).padStart(2,'0')}`;

// 오늘 날짜
const today = new Date();
today.setHours(0,0,0,0);

// 달력 생성 함수 (2025년 11월 고정)
function generateCalendar(year, month) {
  const calendarBody = document.getElementById('calendar-body');
  calendarBody.innerHTML = '';
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    row.classList.add('fade-in-on-scroll'); // 각 행에 fade-in 클래스 추가
    
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        cell.innerHTML = '';
      } else if (date > lastDate) {
        cell.innerHTML = '';
      } else {
        cell.innerHTML = date;
        // 2025-11-30에만 selected 클래스 적용
        if (date === dDayDate) {
          cell.classList.add('selected');
        }
        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
    if (date > lastDate) break;
  }
  
  // 헤더에도 fade-in-on-scroll 클래스 추가
  const headerRow = document.querySelector('#calendar thead tr');
  if (headerRow) {
    headerRow.classList.add('fade-in-on-scroll');
  }
}

// 달력 행별 순차 애니메이션 트리거
function triggerCalendarAnimation() {
  const calendarTable = document.getElementById('calendar');
  const headerRow = calendarTable.querySelector('thead fade-in-on-scroll');
  const calendarRows = calendarTable.querySelectorAll('tbody fade-in-on-scroll');
  
  // IntersectionObserver로 달력이 화면에 보이면 행별 애니메이션 시작
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 헤더 먼저 표시
        if (headerRow) {
          headerRow.classList.add('visible');
        }
        
        // 각 행을 순차적으로 나타나게 함 (헤더 표시 후 0.3초부터 시작)
        calendarRows.forEach((row, index) => {
          setTimeout(() => {
            row.classList.add('visible');
          }, (index + 1) * 300); // 헤더 후 0.3초, 0.6초, 0.9초... 간격으로 순차 실행
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(calendarTable);
}

// D-day 계산 및 멘트 표시
function showDdayMessage() {
  const dDay = new Date(dDayYear, dDayMonth, dDayDate);
  dDay.setHours(0,0,0,0);
  const diff = Math.floor((dDay - today) / (1000 * 60 * 60 * 24));
  let msg = '';
  if (diff > 0) {
    msg = `신랑 ♥ 신부 결혼식이 ${diff}일 남았습니다.`;
  } else if (diff === 0) {
    msg = `신랑 ♥ 신부 결혼식 당일 입니다!`;
  } else {
    msg = `신랑 ♥ 신부 결혼식으로부터 ${Math.abs(diff)}일 지났습니다.`;
  }
  document.getElementById('dDayMessage').textContent = msg;
}

// 실행
generateCalendar(2025, 10); // 11월 (0-based)
showDdayMessage();
triggerCalendarAnimation();