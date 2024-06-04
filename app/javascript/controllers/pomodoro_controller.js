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
    document.body.classList.add('work-period')
    document.body.classList.remove('short-break-period', 'long-break-period')

  }



  switchPeriod() {
    if(this.isWorkPeriod){
      //increment pomodoroCount if this is the end of a work period
      this.pomodoroCount++
      console.log(this.pomodoroCount)
      if (this.pomodoroCount % 4 === 0) {
        this.isWorkPeriod = false;
        this.timeLeft = this.longBreakTimeValue * 60
        console.log("long break")
        console.log(this.timeLeft)
        document.body.classList.remove('work-period', 'short-break-period')
        document.body.classList.add('long-break-period')
      } else {
        this.isWorkPeriod = false;
        this.timeLeft = this.shortBreakTimeValue * 60
        console.log("short break")
        console.log(this.timeLeft)
        document.body.classList.remove('work-period', 'long-break-period')
        document.body.classList.add('short-break-period')
      }
    } else {
      this.isWorkPeriod = true
      this.timeLeft = this.workTimeValue * 60
      document.body.classList.remove('short-break-period', 'long-break-period')
      document.body.classList.add('work-period')
    }

    this.updateDisplay()
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60)
    const seconds = this.timeLeft % 60
    this.displayTarget.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

}
