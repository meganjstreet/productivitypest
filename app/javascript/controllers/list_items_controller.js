import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="list-items"
export default class extends Controller {
  static targets = ["form", "container", "checkbox", "editForm"]

  toggleEdit(event){
    const itemId = event.currentTarget.dataset.itemId;
    const editForm = this.editFormTargets.find(target => target.dataset.itemId === itemId);
    if (editForm) {
      editForm.classList.toggle("hidden");
      editForm.previousSibling.previousSibling.classList.toggle("hidden");
    }
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
    })
    .catch(error => console.error('Error:', error));
  }

  destroy(event) {
    const itemId = event.currentTarget.dataset.itemId;

    fetch(`/list_items/${itemId}`, {
      method: "DELETE",

      headers: { "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
      "Accept": "application/json" } // Expecting JSON response
    })
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
      if (ok) {
        this.containerTarget.innerHTML = data.partial_html;
      }
    })
    .catch(error => console.error('Error:', error));
  }



  update(event) {
    event.preventDefault();

    const form = event.target.closest('form');
    const url = form.action;
    const formData = new FormData(form);

    if (!event.target.checked) {
      formData.delete(event.target.name);
      formData.append(event.target.name, '0');
    }

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
