import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="whitenoise"
export default class extends Controller {
  static targets = ["togglebutton"]
  connect() {
  }

  toggle () {
    if (this.togglebuttonTarget.checked){
      document.getElementById('whitenoise-audio').play();
    } else {
      document.getElementById('whitenoise-audio').pause();
    }
  }
}
