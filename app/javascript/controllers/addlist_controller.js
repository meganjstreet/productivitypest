import { Controller } from "@hotwired/stimulus"


// Connects to data-controller="addlist"
export default class extends Controller {
  static targets = ["form", "container"]
  connect() {
    console.log("Connected")
  }

  create(event){
    event.preventDefault();
    const url = this.formTarget.action
    fetch(url, {
      method: "POST",
      headers: { "Accept": "text/plain" },
      body: new FormData(this.formTarget)
    })
    .then(response => response.text().then(text => ({ ok: response.ok, text })))
    .then(({ ok, text }) => {
      if (ok) {
        this.containerTarget.outerHTML = text;
      } else {
        console.log(text)
        this.containerTarget.outerHTML = text;
      }
    })
    .catch(error => console.error('Error:', error));
  }
}