import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="challenge"
export default class extends Controller {
  static targets = ["form", "container"]

  create(event){
    event.preventDefault()
    const url = this.formTarget.action

    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "text/plain"
      },
      body: new FormData(this.formTarget)
    })
    .then(response => response.text())
    .then((data) => {
      this.containerTarget.outerHTML = data;

    })

  }

}
