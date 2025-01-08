document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Simple form validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      alert("Message sent successfully!");
      // Here you could later send this data to your backend API using fetch or AJAX
      // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify({ name, email, message }) });

      // Reset the form
      document.getElementById("contact-form").reset();
    } else {
      alert("Please fill in all fields.");
    }
  });
