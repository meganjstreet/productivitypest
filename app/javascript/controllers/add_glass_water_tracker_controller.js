import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="add-glass-water-tracker"
export default class extends Controller {
  static targets = ["form", "card"]

  take_glass_of_water(event){
    event.preventDefault()
    const url = this.formTarget.action + "/take_glass_of_water"
    console.log(url)
    fetch(url, {
      method: "PATCH",

      headers: {  "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Accept": "text/plain" },
      body: new FormData(this.formTarget)
    })
      .then(response => response.text())
      .then((data) => {
        this.cardTarget.outerHTML = data
      })

  }
}
