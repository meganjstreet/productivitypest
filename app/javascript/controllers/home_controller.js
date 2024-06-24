import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {

    static targets = ["waterTracker", "lists", "streaks", "meditations", "listsBtn", "meditationsBtn", "streaksBtn", "waterTrackerBtn"]




  toggleMeditations(){

    this.listsTarget.classList.remove("hidden");
    this.listsBtnTarget.classList.remove("text-white");

    this.streaksTarget.classList.remove("hidden");
    this.streaksBtnTarget.classList.remove("text-white");

    this.waterTrackerTarget.classList.remove("hidden");
    this.waterTrackerBtnTarget.classList.remove("text-white");

    this.listsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");

    this.meditationsTarget.classList.toggle("hidden");
    this.meditationsBtnTarget.classList.toggle("text-white");

  }

  toggleLists(){
    this.meditationsTarget.classList.remove("hidden");
    this.meditationsBtnTarget.classList.remove("text-white");

    this.streaksTarget.classList.remove("hidden");
    this.streaksBtnTarget.classList.remove("text-white");

    this.waterTrackerTarget.classList.remove("hidden");
    this.waterTrackerBtnTarget.classList.remove("text-white");

    this.meditationsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");

    this.listsTarget.classList.toggle("hidden");
    this.listsBtnTarget.classList.toggle("text-white")

  }

  toggleStreaks(){
    this.listsTarget.classList.remove("hidden");
    this.listsBtnTarget.classList.remove("text-white");

    this.meditationsTarget.classList.remove("hidden");
    this.meditationsBtnTarget.classList.remove("text-white");

    this.waterTrackerTarget.classList.remove("hidden");
    this.waterTrackerBtnTarget.classList.remove("text-white");

    this.listsTarget.classList.add("hidden");
    this.meditationsTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");

    this.streaksTarget.classList.toggle("hidden");
    this.streaksBtnTarget.classList.toggle("text-white");
  }

  toggleWaterTracker(){
    this.listsTarget.classList.remove("hidden");
    this.listsBtnTarget.classList.remove("text-white");

    this.streaksTarget.classList.remove("hidden");
    this.streaksBtnTarget.classList.remove("text-white");

    this.meditationsTarget.classList.remove("hidden");
    this.meditationsBtnTarget.classList.remove("text-white");

    this.listsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.meditationsTarget.classList.add("hidden");

    this.waterTrackerTarget.classList.toggle("hidden");
    this.waterTrackerBtnTarget.classList.toggle("text-white");
  }

}
