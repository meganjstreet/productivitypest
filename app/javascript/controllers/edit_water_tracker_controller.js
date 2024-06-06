import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-water-tracker"
export default class extends Controller {
  static targets = ["infos", "form", "card", "tracker"]

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


  displayTracker() {
    // event.preventDefault()
    this.trackerTarget.classList.toggle("d-none")
  }
}
