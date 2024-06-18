import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {

    static targets = ["waterTracker", "lists", "streaks", "meditations", "challenges"]




  toggleMeditations(){

    this.listsTarget.classList.remove("hidden");
    this.streaksTarget.classList.remove("hidden");
    this.waterTrackerTarget.classList.remove("hidden");
    this.listsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");
    this.meditationsTarget.classList.toggle("hidden");


  }

  toggleLists(){
    this.meditationsTarget.classList.remove("hidden");
    this.streaksTarget.classList.remove("hidden");
    this.waterTrackerTarget.classList.remove("hidden");
    this.meditationsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");
    this.listsTarget.classList.toggle("hidden");

  }

  toggleStreaks(){
    this.listsTarget.classList.remove("hidden");
    this.meditationsTarget.classList.remove("hidden");
    this.waterTrackerTarget.classList.remove("hidden");
    this.listsTarget.classList.add("hidden");
    this.meditationsTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");

    this.streaksTarget.classList.toggle("hidden");
  }

  toggleWaterTracker(){
    this.listsTarget.classList.remove("hidden");
    this.streaksTarget.classList.remove("hidden");
    this.meditationsTarget.classList.remove("hidden");
    this.listsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.meditationsTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.toggle("hidden");
  }

}
