import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-water-tracker"
export default class extends Controller {
  static targets = ["infos", "form", "card", "tracker"]

  connect() {
    console.log('SOMETHING')
  }
  displayForm() {
    this.infosTarget.classList.add("d-none")
    this.formTarget.classList.remove("d-none")
  }

  update(event) {
    // event.preventDefault()
    const url = this.formTarget.action
    fetch(url, {
      method: "PATCH",
      headers: { "Accept": "text/plain" },
      body: new FormData(this.formTarget)
    })
      .then(response => response.text())
      .then((data) => {
        this.cardTarget.outerHTML = data
      })
  }

  displayTraker(event) {
    event.preventDefault()
    this.trackerTarget.classList.toggle("d-none")
  }
}
