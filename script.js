/* ---------- Contact form handling (EmailJS) ---------- */

// Initialize EmailJS
emailjs.init({
  publicKey: "stGslbvIjyBOUV9U7"
});

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    status.classList.remove("error");

    if (!fullName || !email || !phone || !message) {
      status.textContent = "Please fill in all required fields.";
      status.classList.add("error");
      return;
    }

    if (!emailPattern.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.classList.add("error");
      return;
    }

    status.textContent = "Sending your message...";

    emailjs.send(
      "service_pepl427",
      "template_rov9qkn",
      {
        fullName: fullName,
        email: email,
        phone: phone,
        message: message
      }
    )
    .then(function () {
      status.classList.remove("error");
      status.textContent = "✅ Thank you! Your message has been sent successfully.";
      form.reset();
    })
    .catch(function (error) {
      console.error("EmailJS Error:", error);
      status.classList.add("error");
      status.textContent = "❌ Failed to send message. Please try again.";
    });
  });
}