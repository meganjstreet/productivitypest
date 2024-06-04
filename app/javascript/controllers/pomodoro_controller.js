import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="pomodoro"
export default class extends Controller {

  static targets = ["display", "container"]
  static values = { workTime: Number, shortBreakTime: Number, longBreakTime: Number}

  connect() {

    this.startNewCycle();
    // initialise a work period variable
    this.isWorkPeriod = true;
    // initialise seconds left by converting work time minutes to seconds
    this.timeLeft = this.workTimeValue * 60;
    // initialise session count as 0
    this.sessionCount = 0;
    // initialise pomodoro cycle count
    this.pomodoroCount = 0;
    // updating the display
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
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((data) => {
      console.log(data)
      this.pomodoroId = data.id;
    })
  }

  start() {
    if (this.timer) return;
    if (this.isWorkPeriod) this.containerTarget.classList.add('work-period');
    this.timer = setInterval(() => {
      // minus 1 second from timeLeft
      this.timeLeft--;
      // update the display time
      this.updateDisplay();
      if (this.timeLeft <= 0) {
        document.getElementById('dingdong-audio').play();
        clearInterval(this.timer);
        this.timer = null;
        if (this.isWorkPeriod) {
          this.sessionCount++;
          this.showBreakPrompt();
        } else {
          this.isWorkPeriod = true;
          this.timeLeft = this.workTimeValue * 60;
          this.containerTarget.classList.remove('short-break-period', 'long-break-period');
          this.containerTarget.classList.add('work-period');
          this.updateDisplay();
        }
      }
    }, 1000);
  }

  stop () {
    this.containerTarget.classList.remove('work-period');
    clearInterval(this.timer)
    this.timer = null;
  }

  reset() {
    this.stop();
    this.isWorkPeriod = true;
    this.sessionCount = 0;
    this.timeLeft = this.workTimeValue * 60;
    this.updateDisplay()
    this.containerTarget.classList.add('work-period')
    this.containerTarget.classList.remove('short-break-period', 'long-break-period')

  }

  startBreak() {
    if (this.isWorkPeriod) return;
    this.start();
  }

  showBreakPrompt() {
    this.stop();
    this.isWorkPeriod = false;
    if (this.sessionCount % 4 === 0){
      this.timeLeft = this.longBreakTimeValue * 60;
      this.containerTarget.classList.remove('work-period', 'short-break-period');
      this.containerTarget.classList.add('long-break-period');
      this.pomodoroCount++
      this.completeCycle();
    } else {
      this.timeLeft = this.shortBreakTimeValue * 60;
      this.containerTarget.classList.remove('work-period', 'long-break-period');
      this.containerTarget.classList.add('short-break-period');
    }

    this.updateDisplay();
  }



  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60)
    const seconds = this.timeLeft % 60
    this.displayTarget.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  completeCycle(){
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
      this.startNewCycle()
    })
  }




}
