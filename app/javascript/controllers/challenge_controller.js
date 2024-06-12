import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="challenge"
export default class extends Controller {
  static targets = ["form", "container", "formContainer", "modal"]

  connect(){
    console.log("CHALLENGE CONTROLLER")
  }

  openModal(){
    this.modalTarget.classList.remove("hidden")
  }

  closeModal(){
    this.modalTarget.classList.add("hidden")
  }


  create(event){
    console.log("Clicked")
    event.preventDefault()
    const url = this.formTarget.action

    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "text/plain"
      },
      body: new FormData(this.formTarget)
    })
    .then(response => response.text())
    .then((data) => {
      this.containerTarget.innerHTML = data;
      this.formTarget.reset()
    })

  }

  displayForm(){
    this.formContainerTarget.classList.remove("d-none");
  }

}
