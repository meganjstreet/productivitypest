import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-water-tracker"
export default class extends Controller {
  static targets = ["infos", "form", "card", "tracker","frequency","fill","tank","goalAmount","currentAmount"]

  connect() {
    this.goalAmount = parseInt(this.goalAmountTarget.innerText);
    this.currentAmount = parseInt(this.currentAmountTarget.innerText);
    console.log(parseInt(this.currentAmountTarget.innerText));
    this.updateWaterFill();
    this.setNotificationInterval(parseInt(this.frequencyTarget.innerText));
    console.log(parseInt(this.frequencyTarget.innerText));
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
      this.setNotificationInterval(this.data.get("frequency"));

    }
    window.addEventListener("beforeunload", this.preventPageRefresh.bind(this));
  }

  disconnect() {
    window.removeEventListener("beforeunload", this.preventPageRefresh.bind(this));
  }

  displayForm() {
    this.infosTarget.classList.add("d-none")
    this.formTarget.classList.remove("d-none")
  }

  update(event) {
    event.preventDefault();
    const url = this.formTarget.action;
    fetch(url, {
      method: "PATCH",
      headers: { "Accept": "text/plain" },
      body: new FormData(this.formTarget)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      this.cardTarget.outerHTML = data;
      this.updateWaterFill();
      console.log(this.trackerTarget)
    })
    .catch(error => console.error('Error:', error));
  }

  updateWaterFill() {
    console.log("filling tank")
    const fillHeight = (this.currentAmount / this.goalAmount) * 100;
    this.fillTarget.style.height = `${fillHeight}%`;
    console.log(fillHeight)
  }

  setNotificationInterval(frequency) {
    console.log('interval set');
    const intervalMinutes = parseInt(frequency, 10);
    if (!isNaN(intervalMinutes) && intervalMinutes > 0) {
      this.notificationInterval = intervalMinutes * 60 * 1000;
      this.startNotificationTimer();
    } else {
      console.log("Invalid frequency" );
    }

  }

  startNotificationTimer() {
    console.log('start timer')
    this.stopNotificationTimer();
    this.notificationTimer = setInterval(this.notifyUser.bind(this), this.notificationInterval);
  }

  stopNotificationTimer() {
    if (this.notificationTimer) {
      console.log('stop notications')
      clearInterval(this.notificationTimer);
    }
  }

  notifyUser() {
    console.log('notify user')
    document.getElementById('notification-audio').play();
  }

  displayTracker(event) {
    event.preventDefault()
    this.trackerTarget.classList.toggle("d-none")
  }

  preventPageRefresh(event) {
    const message = "Are you sure you want to leave? Changes you made may not be saved.";
    event.returnValue = message;
    return message;
  }
}
