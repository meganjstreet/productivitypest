import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {

    static targets = ["waterTracker", "lists", "streaks", "meditations", "listsBtn", "meditationsBtn", "streaksBtn", "waterTrackerBtn"]




  toggleMeditations(){

    this.listsTarget.classList.remove("hidden");
    this.listsBtnTarget.classList.remove("feature-active");

    this.streaksTarget.classList.remove("hidden");
    this.streaksBtnTarget.classList.remove("feature-active");

    this.waterTrackerTarget.classList.remove("hidden");
    this.waterTrackerBtnTarget.classList.remove("feature-active");

    this.listsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");

    this.meditationsTarget.classList.toggle("hidden");
    this.meditationsBtnTarget.classList.toggle("feature-active");

  }

  toggleLists(){
    this.meditationsTarget.classList.remove("hidden");
    this.meditationsBtnTarget.classList.remove("feature-active");

    this.streaksTarget.classList.remove("hidden");
    this.streaksBtnTarget.classList.remove("feature-active");

    this.waterTrackerTarget.classList.remove("hidden");
    this.waterTrackerBtnTarget.classList.remove("feature-active");

    this.meditationsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");

    this.listsTarget.classList.toggle("hidden");
    this.listsBtnTarget.classList.toggle("feature-active")

  }

  toggleStreaks(){
    this.listsTarget.classList.remove("hidden");
    this.listsBtnTarget.classList.remove("feature-active");

    this.meditationsTarget.classList.remove("hidden");
    this.meditationsBtnTarget.classList.remove("feature-active");

    this.waterTrackerTarget.classList.remove("hidden");
    this.waterTrackerBtnTarget.classList.remove("feature-active");

    this.listsTarget.classList.add("hidden");
    this.meditationsTarget.classList.add("hidden");
    this.waterTrackerTarget.classList.add("hidden");

    this.streaksTarget.classList.toggle("hidden");
    this.streaksBtnTarget.classList.toggle("feature-active");
  }

  toggleWaterTracker(){
    this.listsTarget.classList.remove("hidden");
    this.listsBtnTarget.classList.remove("feature-active");

    this.streaksTarget.classList.remove("hidden");
    this.streaksBtnTarget.classList.remove("feature-active");

    this.meditationsTarget.classList.remove("hidden");
    this.meditationsBtnTarget.classList.remove("feature-active");

    this.listsTarget.classList.add("hidden");
    this.streaksTarget.classList.add("hidden");
    this.meditationsTarget.classList.add("hidden");

    this.waterTrackerTarget.classList.toggle("hidden");
    this.waterTrackerBtnTarget.classList.toggle("feature-active");
  }

}
