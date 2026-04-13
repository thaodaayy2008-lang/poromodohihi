let workTime = 25 * 60;
let breakTime = 5 * 60;
let longBreakTime = 15 * 60;
let currentTime = workTime;
let timer = null;
let isRunning = false;
let isWorkSession = true;

const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const sessionType = document.getElementById("sessionType");

function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    timeDisplay.textContent =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (currentTime > 0) {
            currentTime--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            switchSession();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    pauseTimer();
    currentTime = isWorkSession ? workTime : breakTime;
    updateDisplay();
}

function switchSession() {
    isWorkSession = !isWorkSession;
    currentTime = isWorkSession ? workTime : breakTime;
    sessionType.textContent = isWorkSession ? "Work Session" : "Break Time";
    updateDisplay();
    startTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();