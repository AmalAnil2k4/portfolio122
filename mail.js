document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form");
  const btn = document.getElementById("btn-click");

  const nameInput = document.getElementById("fname");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name_error");
  const emailError = document.getElementById("email_error");
  const messageError = document.getElementById("message_error");

  const alertBox = document.getElementById("formAlert");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop default refresh ALWAYS first

    // Reset errors & alert
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    alertBox.style.display = "none";

    let valid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      nameError.textContent = "Name is required";
      valid = false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailError.textContent = "Enter a valid email";
      valid = false;
    }

    // Message validation
    if (messageInput.value.trim().length < 8) {
      messageError.textContent = "Message must be at least 8 characters";
      valid = false;
    }

    // ❌ IF INVALID → REFRESH PAGE
    if (!valid) {
      setTimeout(() => {
        location.reload(); // automatic refresh
      }, 1500); // refresh after 1.5 seconds (user sees errors)
      return;
    }

    // ✅ IF VALID → SEND EMAIL (NO REFRESH)
    btn.value = "Sending...";

    emailjs.sendForm(
      "service_wcmv3zs",
      "template_7fslj5e",
      form
    )
    .then(() => {
      btn.value = "Send Email";
      alertBox.textContent = "✅ Message sent successfully!";
      alertBox.className = "form-alert success";
      alertBox.style.display = "block";
      form.reset();
    })
    .catch(() => {
      btn.value = "Send Email";
      alertBox.textContent = "❌ Failed to send message";
      alertBox.className = "form-alert error";
      alertBox.style.display = "block";
    });
  });

});
