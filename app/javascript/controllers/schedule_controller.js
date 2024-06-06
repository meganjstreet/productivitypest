import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-movie"
export default class extends Controller {
  static targets = ["tasks", "form", "container", "modal", "deleteForm"]

  openModal(){
    this.modalTarget.classList.remove("hidden")
  }

  closeModal(){
    this.modalTarget.classList.add("hidden")
  }

  deleteTask(event) {
    event.preventDefault()
    const url = this.deleteFormTarget.action
    fetch(url, {
      method: "DELETE",
      headers: {  "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Accept": "text/plain" },
      body: new FormData(this.deleteFormTarget)
    })
    .then(response => response.text())
      .then((data) => {
        this.containerTarget.outerHTML = data
      })
  }


  create(event) {
    event.preventDefault()
    const url = this.formTarget.action
    fetch(url, {
      method: "POST",
      headers: { "Accept": "text/plain" },
      body: new FormData(this.formTarget)
    })
      .then(response => response.text())
      .then((data) => {
        this.containerTarget.outerHTML = data
      })
  }
}
