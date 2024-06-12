import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-water-tracker"
export default class extends Controller {
  static targets = ["infos", "form", "card", "tracker", "frequency", "notification"]

  connect() {
    if (this.notificationTarget.innerText === "true") {
      const frequency = parseInt(this.frequencyTarget.innerText, 10);
      this.setNotificationInterval(frequency);
      console.log(`Notification frequency set to ${frequency} minutes.`);
      window.addEventListener("beforeunload", this.preventPageRefresh.bind(this));
    }
  }

  disconnect() {
    window.removeEventListener("beforeunload", this.preventPageRefresh.bind(this));
    this.stopNotificationTimer();
  }

  displayForm() {
    this.infosTarget.classList.add("d-none");
    this.formTarget.classList.remove("d-none");
  }

  update(event) {
    event.preventDefault();
    this.stopNotificationTimer(); 

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
      this.reinitializeNotificationTimer(); // Restart the timer after update
    })
    .catch(error => console.error('Error:', error));
  }

  setNotificationInterval(frequency) {
    console.log('Setting notification interval.');
    const intervalMinutes = parseInt(frequency, 10);

    if (!isNaN(intervalMinutes) && intervalMinutes > 0) {
      this.startNotificationTimer(intervalMinutes * 60 * 1000);
    } else {
      console.log("Invalid frequency");
    }
  }

  startNotificationTimer(interval) {
    console.log('Starting notification timer.');
    this.stopNotificationTimer();
    this.notificationTimer = setInterval(this.notifyUser.bind(this), interval);
    console.log(`Notification timer set with interval ${interval} ms.`);
  }

  stopNotificationTimer() {
    if (this.notificationTimer) {
      console.log('Stopping notification timer.');
      clearInterval(this.notificationTimer);
      this.notificationTimer = null; // Ensure the timer reference is cleared
    } else {
      console.log('No notification timer to stop.');
    }
  }

  reinitializeNotificationTimer() {
    if (this.notificationTarget.innerText === "true") { // Corrected condition
      const frequency = parseInt(this.frequencyTarget.innerText, 10);
      if (!isNaN(frequency) && frequency > 0) {
        this.startNotificationTimer(frequency * 60 * 1000);
      }
    }
  }

  notifyUser() {
    console.log('Notifying user.');
    const notificationAudio = document.getElementById('notification-audio');
    if (notificationAudio) {
      notificationAudio.play();
    } else {
      console.log('Notification audio element not found.');
    }
  }

  preventPageRefresh(event) {
    const message = "Are you sure you want to leave? Changes you made may not be saved.";
    event.returnValue = message;
    return message;
  }
}
