// Green Leaf order form checker
// Checks name, email, product and quantity when the form is sent,
// and writes a message under each empty or wrong field.

var form = document.getElementById("order-form");

function showError(fieldId, message) {
  var field = document.getElementById("field-" + fieldId);
  document.getElementById(fieldId + "-error").textContent = message;
  field.classList.add("invalid");
}

function clearError(fieldId) {
  var field = document.getElementById("field-" + fieldId);
  document.getElementById(fieldId + "-error").textContent = "";
  field.classList.remove("invalid");
}

function validateForm(event) {
  // Stop the page reloading so we can check the fields first
  event.preventDefault();

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var product = document.getElementById("product").value;
  var quantityText = document.getElementById("quantity").value.trim();
  var status = document.getElementById("form-status");
  var errors = 0;

  // Name: must not be empty and needs at least 2 characters
  if (name === "") {
    showError("name", "Please enter your name.");
    errors++;
  } else if (name.length < 2) {
    showError("name", "Your name must have at least 2 characters.");
    errors++;
  } else {
    clearError("name");
  }

  // Email: must not be empty and must look like name@site.com
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    showError("email", "Please enter your email address.");
    errors++;
  } else if (!emailPattern.test(email)) {
    showError("email", "That email does not look right. Try something like name@example.com.");
    errors++;
  } else {
    clearError("email");
  }

  // Product: one must be chosen
  if (product === "") {
    showError("product", "Please choose a product.");
    errors++;
  } else {
    clearError("product");
  }

  // Quantity: a whole number from 1 to 50
  var quantity = Number(quantityText);
  if (quantityText === "") {
    showError("quantity", "Please enter how many you would like.");
    errors++;
  } else if (isNaN(quantity) || quantity % 1 !== 0) {
    showError("quantity", "Quantity must be a whole number, like 3.");
    errors++;
  } else if (quantity < 1 || quantity > 50) {
    showError("quantity", "Quantity must be between 1 and 50.");
    errors++;
  } else {
    clearError("quantity");
  }

  // Final message
  if (errors > 0) {
    status.className = "form-status bad";
    status.textContent = errors === 1
      ? "Please fix the 1 problem shown above and send again."
      : "Please fix the " + errors + " problems shown above and send again.";
  } else {
    status.className = "form-status ok";
    status.textContent = "Thank you, " + name + "! We have received your order for " +
      quantity + " x " + product + " and will email you at " + email + " to confirm.";
    form.reset();
  }
}

form.addEventListener("submit", validateForm);
