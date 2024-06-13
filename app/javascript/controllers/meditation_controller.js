import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="meditation"
export default class extends Controller {
  static targets = ["form", "container"]
  connect() {
    console.log("connected")
  }

  update(event){
    event.preventDefault();
    const url = this.formTarget.action
    console.log(url)

    const formData = new FormData(this.formTarget);
    console.log(formData)

    fetch(url, {
      method: "PATCH",
      headers: { "Accept": "text/plain" },
      body: formData
    })
    .then(response => response.text())
    .then(data => this.containerTarget.outerHTML = data);
  }

}
