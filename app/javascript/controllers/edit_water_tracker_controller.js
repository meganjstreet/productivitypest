import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-water-tracker"
export default class extends Controller {
  static targets = ["infos", "form", "card", "tracker","frequency"]

  connect() {
    this.setNotificationInterval(parseInt(this.frequencyTarget.innerText));
    console.log(parseInt(this.frequencyTarget.innerText));
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
      this.setNotificationInterval(this.data.get("frequency"));

    }
  }
  displayForm() {
    this.infosTarget.classList.add("d-none")
    this.formTarget.classList.remove("d-none")
  }

  update(event) {
    event.preventDefault()
    const url = this.formTarget.action
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
      console.log(this.trackerTarget)
    })
    .catch(error => console.error('Error:', error));
  }

  updateFrequency() {
    const frequency = this.frequencyInputTarget.value;
    this.setNotificationInterval(frequency);
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

  displayTracker() {
    // event.preventDefault()
    this.trackerTarget.classList.toggle("d-none")
  }
}
