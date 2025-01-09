const themeToggleButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;
const faviconLight = document.getElementById("favicon-light");
const faviconDark = document.getElementById("favicon-dark");
const iconLight = document.getElementById("icon-light");
const iconDark = document.getElementById("icon-dark");

// Set default to dark mode (white icon for dark mode)
htmlElement.setAttribute("data-theme", "dark");
faviconLight.setAttribute("disabled", "true"); // Disable light mode favicon
faviconDark.removeAttribute("disabled"); // Enable dark mode favicon
iconLight.style.display = "none"; // Hide light mode icon
iconDark.style.display = "block"; // Show dark mode icon

// Toggle between light and dark mode
themeToggleButton.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  if (currentTheme === "light") {
    // Switch to dark mode
    htmlElement.setAttribute("data-theme", "dark");
    faviconLight.setAttribute("disabled", "true"); // Disable light mode favicon
    faviconDark.removeAttribute("disabled"); // Enable dark mode favicon
    iconLight.style.display = "none"; // Hide light mode icon
    iconDark.style.display = "block"; // Show dark mode icon
  } else {
    // Switch to light mode
    htmlElement.setAttribute("data-theme", "light");
    faviconLight.removeAttribute("disabled"); // Enable light mode favicon
    faviconDark.setAttribute("disabled", "true"); // Disable dark mode favicon
    iconLight.style.display = "block"; // Show light mode icon
    iconDark.style.display = "none"; // Hide dark mode icon
  }
});

// Contact form submission functionality
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
