import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="meditation"
export default class extends Controller {
  static targets = ["form", "container"]

  update(event){
    event.preventDefault();
    const url = this.formTarget.action
    const formData = new FormData(this.formTarget);

    fetch(url, {
      method: "PATCH",
      headers: { "Accept": "text/plain" },
      body: formData
    })
    .then(response => response.text())
    .then(data => this.containerTarget.outerHTML = data);
  }

}
