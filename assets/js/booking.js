document.addEventListener("DOMContentLoaded", function () {
      emailjs.init("ELTd2-XSxa8TZ4caP"); // Replace with your actual EmailJS user ID
    
      const form = document.getElementById("appointmentForm");
    
      form.addEventListener("submit", function (event) {
        event.preventDefault();
    
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
            alert("Appointment request sent successfully!");
            form.reset();
          }, function (error) {
            console.error("EmailJS error:", error);
            alert("Failed to send appointment request. Please try again.");
          });
      });
    });
    