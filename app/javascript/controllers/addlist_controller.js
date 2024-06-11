import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="addlist"
export default class extends Controller {
  static targets = ["form", "container", "listitems"]
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
        console.log(text)
        this.containerTarget.outerHTML = text;
      } else {
        console.log(text)
        this.containerTarget.outerHTML = text;
      }
    })
    .catch(error => console.error('Error:', error));
  }

  deleteList(event) {
    event.preventDefault();
    const form = event.target.closest('form');
    const url = form.action;
    fetch(url, {
      method: "DELETE",
      headers: {  "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Accept": "text/plain" },
      body: new FormData(form)
    })
    .then(response => response.text().then(text => ({ ok: response.ok, text })))
    .then(({ ok, text }) => {
      if (ok) {
        console.log(text)
        this.containerTarget.outerHTML = text;
      } else {
        console.log(text)
        this.containerTarget.outerHTML = text;
      }
    })
    .catch(error => console.error('Error:', error));
  }

  toggleLists(){
    this.containerTarget.classList.toggle("d-none");
  }
}
