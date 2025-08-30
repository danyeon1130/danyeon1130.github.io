const audio = document.getElementById('bg-music');
const button = document.getElementById('music-toggle');
let isPlaying = false;

button.addEventListener('click', async () => {
  if (!isPlaying) {
    try {
        await audio.play();
        isPlaying = true;
        button.textContent = "🔊";
        button.classList.add("on");
    } catch (err) {
        console.log("자동 재생이 차단됨:", err);
    }
  } else {
  audio.pause();
  isPlaying = false;
  button.textContent = "🔇";
  button.classList.remove("on");
  }
});