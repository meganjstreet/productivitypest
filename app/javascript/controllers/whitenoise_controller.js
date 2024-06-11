import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="whitenoise"
export default class extends Controller {
  static targets = ["togglebuttonWhite", "togglebuttonWaves", "choosebutton", "options", "choosebutton", "switch1", "switch2", "chooseNoiseWave"]
  connect() {
  }

  toggle () {
    if (this.togglebuttonWhiteTarget.checked){
      if (this.choosebuttonTarget.innerHTML == "White Noise"){
        document.getElementById('whitenoise-audio').play();
      } else if (this.choosebuttonTarget.innerHTML == "Waves") {
        document.getElementById('whitenoise-waves-audio').play();
      } else if (this.choosebuttonTarget.innerHTML == "Heater") {
        document.getElementById('whitenoise-heater-audio').play();
      } else if  (this.choosebuttonTarget.innerHTML == "Rain") {
        document.getElementById('whitenoise-rain-audio').play();
      } else if  (this.choosebuttonTarget.innerHTML == "Train") {
        document.getElementById('whitenoise-train-audio').play();
      }

    } else {
      document.getElementById('whitenoise-audio').pause();
      document.getElementById('whitenoise-waves-audio').pause();
      document.getElementById('whitenoise-heater-audio').pause();
      document.getElementById('whitenoise-rain-audio').pause();
      document.getElementById('whitenoise-train-audio').pause();
    }
  }

  toggleWaves() {
    if (this.togglebuttonWavesTarget.checked){
      document.getElementById('whitenoise-waves-audio').play();
    } else {
      document.getElementById('whitenoise-waves-audio').pause();
    }
  }

  chooseNoiseWhite(event) {
    event.preventDefault();
    const selectedNoise = event.target.dataset.noise;
    this.choosebuttonTarget.classList.toggle("d-none");
    this.choosebuttonTarget.innerHTML = event.target.innerHTML
    this.optionsTarget.classList.toggle("d-none");
    console.log("Selected noise: ", selectedNoise);
  }

  toggleOptions(event) {
    event.preventDefault();
    this.optionsTarget.classList.toggle("d-none");
    this.choosebuttonTarget.classList.toggle("d-none");
  }
}
