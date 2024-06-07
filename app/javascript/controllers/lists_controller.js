import { Controller } from "@hotwired/stimulus"

  export default class extends Controller {
    static targets = ["button", "link"]
  // [...]

  () {
    this.buttonTarget.innerText = "Bingo!";
    this.buttonTarget.setAttribute("disabled", "");
    this.linkTarget.classList.remove("d-none");
  }
}

const selectAllCheckbox = document.querySelector("#select-all-checkbox")
selectAllCheckbox.addEventListener('click', (event) => {
  const checkboxes = document.querySelectorAll('.form-check-input');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = event.currentTarget.checked;
  });
})
