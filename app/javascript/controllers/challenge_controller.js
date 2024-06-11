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
        "Accept": "application/json"
      },
      body: new FormData(this.formTarget)
    })
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
      if (ok) {
        this.containerTarget.innerHTML = data.partial;
      } else {
        this.containerTarget.innerHTML = data.partial;
        console.error('Errors:', data.errors);
      }
    })
    .catch(error => console.error('Error:', error));
  }
}
