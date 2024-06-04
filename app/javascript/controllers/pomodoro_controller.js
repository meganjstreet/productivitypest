import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="pomodoro"
export default class extends Controller {
  static targets = ["display"]
  static values = { workTime: Number, shortBreakTime: Number, longBreakTime: Number}

  connect() {
    // initialise a work period variable
    this.isWorkPeriod = true;
    // initialise seconds left by converting work time minutes to seconds
    this.timeLeft = this.workTimeValue * 60;
    // initialise pomodoro count as 0
    this.pomodoroCount = 0;
    // initialise paused as false
    this.isPaused = false;
    // updating the display
    this.updateDisplay();
  }

  start() {
    if (this.timer) return
    this.timer = setInterval(() => {
      // minus 1 second from timeLeft
      this.timeLeft--
      // update the display time
      this.updateDisplay()
      if (this.timeLeft <= 0) this.switchPeriod()

    }, 1000);
  }

  stop () {
    clearInterval(this.timer)
    this.timer = null;
  }

  reset() {
    this.stop();
    this.isWorkPeriod = true;
    this.pomodoroCount = 0;
    this.timeLeft = this.workTimeValue * 60;
    this.updateDisplay()

  }

  pause()

}
