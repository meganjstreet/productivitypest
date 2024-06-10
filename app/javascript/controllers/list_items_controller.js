import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="list-items"
export default class extends Controller {
  static targets = ["form", "container"]

  connect() {
    console.log("connected")
  }

  create(event) {
    event.preventDefault();
    const url = this.formTarget.action;
    fetch(url, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    })
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
      this.containerTarget.outerHTML = data.partial_html;
      if (!ok) {
        console.log(data.errors); // You can log errors if needed
      }
    })
    .catch(error => console.error('Error:', error));
  }
}

