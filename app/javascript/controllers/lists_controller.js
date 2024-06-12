import { Controller } from "@hotwired/stimulus"

  export default class extends Controller {
    static targets = ["button", "link"];
  // [...]
  deleteList(event) {

    const form = event.target.closest("form");

    const confirmDelete = confirm("Are you sure you want to delete this list?");
    if (!confirmDelete) {
      return;
    }

    fetch(form.action, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        window.location.href = "/redirect-url";
      })
      .catch(error => {
        console.error("There was a problem with the deletion:", error);

      });
  }
}
