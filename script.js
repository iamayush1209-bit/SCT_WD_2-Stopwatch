let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function formatTime(time) {
  const ms = Math.floor((time % 1000) / 10);
  const sec = Math.floor((time / 1000) % 60);
  const min = Math.floor((time / (1000 * 60)) % 60);
  const hr  = Math.floor(time / (1000 * 60 * 60));

  return (
    String(hr).padStart(2, "0") + ":" +
    String(min).padStart(2, "0") + ":" +
    String(sec).padStart(2, "0") + "." +
    String(ms).padStart(2, "0")
  );
}

function startTimer() {
  if (timerInterval) return;

  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  lapCount = 0;
  display.textContent = "00:00:00.00";
  lapList.innerHTML = "";
}

function addLap() {
  if (!elapsedTime) return;

  lapCount++;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount} — ${formatTime(elapsedTime)}`;
  lapList.appendChild(li);
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", addLap);
