import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="pomodoro"
export default class extends Controller {

  static targets = ["display", "container"]
  static values = { workTime: Number, shortBreakTime: Number, longBreakTime: Number}

  connect() {
    this.startNewCycle();
    this.isWorkPeriod = true;
    this.initialTimeLeft = this.workTimeValue * 60;
    this.timeLeft = this.initialTimeLeft;
    this.sessionCount = 0;
    this.pomodoroCount = 0;
    this.updateDisplay();
  }

  startNewCycle() {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch('/pomodoros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
    })
    .then((response) => response.json())
    .then((data) => {
      this.pomodoroId = data.id;
    })
  }

  start() {
    if (this.timer) return;
    if (this.isWorkPeriod) this.containerTarget.classList.add('work-period');
    this.startTime = Date.now();
    this.initialTimeLeft = this.timeLeft;
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick() {
    const now = Date.now();
    const elapsed = Math.floor((now - this.startTime) / 1000);
    this.timeLeft = this.initialTimeLeft - elapsed;
    this.updateDisplay();

    if (this.timeLeft <= 0) {
      document.getElementById('whitenoise-audio').pause();
      document.getElementById('dingdong-audio').play();
      clearInterval(this.timer);
      this.timer = null;

      if (this.isWorkPeriod) {
        this.sessionCount++;
        this.showBreakPrompt();
      } else {
        this.isWorkPeriod = true;
        this.initialTimeLeft = this.workTimeValue * 60;
        this.timeLeft = this.initialTimeLeft;
        this.containerTarget.classList.remove('short-break-period', 'long-break-period');
        this.containerTarget.classList.add('work-period');
        this.updateDisplay();
      }
    }
  }

  stop() {
    this.containerTarget.classList.remove('work-period');
    clearInterval(this.timer);
    this.timer = null;
  }

  reset() {
    this.stop();
    this.isWorkPeriod = true;
    this.sessionCount = 0;
    this.initialTimeLeft = this.workTimeValue * 60;
    this.timeLeft = this.initialTimeLeft;
    this.updateDisplay();
    this.containerTarget.classList.add('work-period');
    this.containerTarget.classList.remove('short-break-period', 'long-break-period');
  }

  startBreak() {
    if (this.isWorkPeriod) return;
    this.start();
  }

  showBreakPrompt() {
    this.stop();
    this.isWorkPeriod = false;
    if (this.sessionCount % 4 === 0) {
      this.initialTimeLeft = this.longBreakTimeValue * 60;
      this.timeLeft = this.initialTimeLeft;
      this.containerTarget.classList.remove('work-period', 'short-break-period');
      this.containerTarget.classList.add('long-break-period');
      this.pomodoroCount++;
      this.completeCycle();
    } else {
      this.initialTimeLeft = this.shortBreakTimeValue * 60;
      this.timeLeft = this.initialTimeLeft;
      this.containerTarget.classList.remove('work-period', 'long-break-period');
      this.containerTarget.classList.add('short-break-period');
    }
    this.updateDisplay();
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.displayTarget.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  completeCycle() {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch(`/pomodoros/${this.pomodoroId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      }
    })
    .then(response => response.json())
    .then(data => {
      this.startNewCycle();
    })
  }
}
