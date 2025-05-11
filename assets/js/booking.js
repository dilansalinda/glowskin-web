document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("ELTd2-XSxa8TZ4caP"); // Replace with your actual EmailJS user ID

  const form = document.getElementById("appointmentForm");
  const submitBtn = document.getElementById("submitBtn");
  const popup = document.getElementById("confirmationPopup");
  const closePopup = document.getElementById("closePopup");
  const confirmationMessage = document.getElementById("confirmationMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Booking...";

    const formData = new FormData(form);

    const templateParams = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      date: formData.get("date"),
      time: formData.get("time"),
      message: formData.get("message") || "N/A"
    };

    emailjs.send("service_qzz25oy", "template_04imnke", templateParams)
      .then(function (response) {
        // Populate confirmation message with booking details
        confirmationMessage.innerHTML = `
          Thank you, ${templateParams.name}! <br>
          Your appointment for ${templateParams.service} on ${templateParams.date} at ${templateParams.time} has been booked. <br>
          We’ll send a confirmation to ${templateParams.email}.
        `;
        
        // Show popup
        popup.style.display = "flex";

        // Reset form and button
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Book Appointment";
      }, function (error) {
        console.error("EmailJS error:", error);
        alert("Failed to send appointment request. Please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Book Appointment";
      });
  });

  // Close popup when clicking the close button
  closePopup.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // Close popup when clicking outside the popup content
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});