import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggle-list-items"
export default class extends Controller {
  static targets = ["form"]

  toggleListItems(event){
    const lists = document.querySelectorAll(".list");
    lists.forEach((list) => {
      list.classList.toggle("hidden");
    })
    const button = event.currentTarget;
    const list = button.parentNode.parentNode;
    list.classList.toggle("hidden");
    this.formTarget.classList.toggle("hidden");
    document.querySelector(".list-form").classList.toggle("hidden")
    const listItems = button.parentNode.nextElementSibling;
    listItems.classList.toggle("hidden");
  }
}
