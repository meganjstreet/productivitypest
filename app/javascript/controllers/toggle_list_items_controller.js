import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggle-list-items"
export default class extends Controller {
  static targets = ["form"]
  connect() {
    console.log("connected")
  }

  toggleListItems(event){
    const lists = document.querySelectorAll(".list");

    lists.forEach((list) => {
      list.classList.toggle("d-none");
    })
    const button = event.currentTarget;

    const list = button.parentNode;
    list.classList.toggle("d-none");
    this.formTarget.classList.toggle("hidden");

    const listItems = button.nextElementSibling;
    listItems.classList.toggle("d-none");

  }
}
