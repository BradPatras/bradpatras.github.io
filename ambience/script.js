const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const minutesText = document.querySelector("#minutes");

const intervalMinutes = 25;

var timer;
let timerStartDate;

window.onload = (event) => {
  Notification.requestPermission();
  
  startBtn.addEventListener("click", () => {
    startTimer();
  });

  resetBtn.addEventListener("click", () => {
    resetTimer();
  });
};

function startTimer() {
  timerStartDate = new Date();
  timer = setInterval(updateTimerText, 1000);
  startBtn.style.display = "none";
  resetBtn.style.display = "inline-flex";
  minutesText.classList.add("heartbeat");
}

function resetTimer() {
  minutesText.innerHTML = getNumberFormattedForClock(intervalMinutes);
  clearInterval(timer);
  startBtn.style.display = "inline-flex";
  resetBtn.style.display = "none";
  minutesText.classList.remove("heartbeat");
}

function finishTimer() {
  var pomodoroNotification = new Notification("🍅 Interval Completed ✔︎");
  setTimeout(() => pomodoroNotification.close(), 10*1000);
  resetTimer();
}

function updateTimerText() {
  let elapsedMilliseconds = Date.now() - timerStartDate.getTime();
  let elapsedSeconds = parseInt(elapsedMilliseconds / 1000);

  let remainingMinutes = intervalMinutes - parseInt(elapsedSeconds / 60);

  if (remainingMinutes < 0) {
    finishTimer();
    return;
  }
  
  minutesText.innerHTML = getNumberFormattedForClock(remainingMinutes);
}

function getNumberFormattedForClock(number) {
  return ("0" + number).slice(-2);
}
