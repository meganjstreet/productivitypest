import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-water-tracker"
export default class extends Controller {
  static targets = ["tracker"]

  connect() {
    console.log("connected")
  }
}
