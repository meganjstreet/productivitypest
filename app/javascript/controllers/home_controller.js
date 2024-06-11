import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {

    static targets = ["waterTracker", "lists", "streaks", "meditations"]

  hideAll(){
    this.meditationsTarget.classList.add("hidden");
    this.listsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");
  }


  toggleMeditations(){

    this.meditationsTarget.classList.toggle("hidden");


  }

  toggleLists(){
    
    this.listsTarget.classList.toggle("hidden");

  }

  toggleStreaks(){
    
    this.streaksTarget.classList.toggle("hidden");
  }

  toggleWaterTracker(){
    
    this.waterTrackerTarget.classList.toggle("hidden");
  }
}
