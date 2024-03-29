const intervalMinutes = 25;
var timer;
let timerStartDate;

window.onload = (event) => {
  setup();
};

function setup() {
  Notification.requestPermission();

  document.querySelector("#start").addEventListener("click", () => {
    startTimer();
  });

  document.querySelector("#reset").addEventListener("click", () => {
    resetTimer();
  });

  if (localStorage.tomatoCount == null) {
    localStorage.tomatoCount = 0
  }

  setTomatoCount();
}

function startTimer() {
  timerStartDate = new Date();
  timer = setInterval(updateTimerText, 1000);
  document.querySelector("#start").style.display = "none";
  document.querySelector("#reset").style.display = "inline-flex";
  document.querySelector("#minutes").classList.add("heartbeat");
  document.getElementById("chime").load();
  document.getElementById("chime").volume = 0.75;
}

function resetTimer() {
  document.querySelector("#minutes").innerHTML = getNumberFormattedForClock(intervalMinutes);
  clearInterval(timer);
  document.querySelector("#start").style.display = "inline-flex";
  document.querySelector("#reset").style.display = "none";
  document.querySelector("#minutes").classList.remove("heartbeat");
}

function finishTimer() {
  localStorage.tomatoCount = parseInt(localStorage.tomatoCount) + 1;
  document.getElementById("chime").play();
  var pomodoroNotification = new Notification("🍅 Interval Completed ✔︎");
  setTimeout(() => pomodoroNotification.close(), 60*1000);
  resetTimer();
  setTomatoCount();
}

function setTomatoCount() {
  if (localStorage.tomatoCount == null || parseInt(localStorage.tomatoCount) == 0) {
    document.querySelector("#title").innerHTML = ""
  } else {
    document.querySelector("#title").innerHTML = "🍅 x" + parseInt(localStorage.tomatoCount)
  }
}

function updateTimerText() {
  let elapsedMilliseconds = Date.now() - timerStartDate.getTime();
  let elapsedSeconds = parseInt(elapsedMilliseconds / 1000);

  let remainingMinutes = intervalMinutes - parseInt(elapsedSeconds / 60);

  if (remainingMinutes < 0) {
    finishTimer();
    return;
  }
  
  document.querySelector("#minutes").innerHTML = getNumberFormattedForClock(remainingMinutes);
}

function getNumberFormattedForClock(number) {
  return ("0" + number).slice(-2);
}
