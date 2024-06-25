import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-movie"
export default class extends Controller {
  static targets = ["tasks", "form", "container", "modal", "deleteForm", "editModal"]

  openModal(){
    this.modalTarget.classList.remove("hidden")
  }

  closeModal(){
    this.modalTarget.classList.add("hidden")
  }

  openEdit(event){
    const taskId = event.currentTarget.dataset.taskId;
    const editForm = this.editModalTargets.find(target => target.dataset.taskId === taskId);
    if (editForm) {
      editForm.classList.remove("hidden");
    }
  }

  closeEdit(event){
    const taskId = event.currentTarget.dataset.taskId;
    const editForm = this.editModalTargets.find(target => target.dataset.taskId === taskId);
    if (editForm) {
      editForm.classList.add("hidden");
    }
  }

  update(event){
    event.preventDefault();
    const form = event.target.closest('form');
    const url = form.action;
    fetch(url, {
      method: "PATCH",
      headers: {  "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Accept": "text/plain" },
      body: new FormData(form)
    })
    .then(response => response.text())
      .then((data) => {
        this.containerTarget.outerHTML = data;
      })
      .catch(error => console.error('Error:', error));
  }


  deleteTask(event) {
    event.preventDefault();
    const form = event.target.closest('form');
    const url = form.action;
    fetch(url, {
      method: "DELETE",
      headers: {  "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Accept": "text/plain" },
      body: new FormData(form)
    })
    .then(response => response.text())
      .then((data) => {
        this.containerTarget.outerHTML = data;
      })
      .catch(error => console.error('Error:', error));
  }


  create(event) {
    event.preventDefault()
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
        this.modalTarget.innerHTML = text;
        this.openModal();
      }
    })
    .catch(error => console.error('Error:', error));
  }
}
