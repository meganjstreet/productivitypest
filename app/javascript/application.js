// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "@popperjs/core"
import "bootstrap"
import "@rails/request.js"

import Rails from "@rails/ujs"

Rails.start()

// Ensure CSRF token is included in all AJAX requests
document.addEventListener("turbolinks:load", () => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': token
    }
  });
});
