import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="list-items"
export default class extends Controller {
  static targets = ["form", "container", "checkbox", "editForm"]

  connect() {
    console.log("connected")
  }

  toggleEdit(event){
    const itemId = event.currentTarget.dataset.itemId;
    console.log(itemId); // Debugging output
    const editForm = this.editFormTargets.find(target => target.dataset.itemId === itemId);
    console.log(editForm); // Debugging output
    if (editForm) {
      editForm.classList.toggle("hidden");
      editForm.previousSibling.previousSibling.classList.toggle("hidden");
    } else {
      console.error(`Edit form for item ${itemId} not found.`);
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
      if (!ok) {
        console.log(data.errors); // You can log errors if needed
      }
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
      } else {
        console.log(data.errors); // Log errors if any
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
      if (!ok) {
        console.log(data.errors); // You can log errors if needed
      }
    })
    .catch(error => console.error('Error:', error));
  }


  updateItem(event) {
    event.preventDefault();

    const form = event.target.closest('form');
    console.log(form);
    const url = form.action;
    console.log(url);
    const formData = new FormData(form);
    console.log(formData);
  }

}
