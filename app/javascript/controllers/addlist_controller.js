import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="addlist"
export default class extends Controller {
  static targets = ["form", "container", "listitems", "editForm"]

  toggleEdit(event){
    const listId = event.currentTarget.dataset.listId;
    const editForm = this.editFormTargets.find(target => target.dataset.listId === listId);
    if (editForm) {
      editForm.classList.toggle("hidden");
      editForm.previousSibling.previousSibling.classList.toggle("hidden");
    }
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

  update(event){
    event.preventDefault();

    const form = event.target.closest('form');
    const url = form.action;
    const formData = new FormData(form);

    fetch(url, {
      method: "PATCH",
      headers: { "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
      "Accept": "application/json" },
      body: formData
    })
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
      this.containerTarget.outerHTML = data.partial_html;
    })
    .catch(error => console.error('Error:', error));
  }
}
