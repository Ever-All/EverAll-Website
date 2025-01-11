// Home button functionality
const homeButton = document.getElementById("home-button");
homeButton.addEventListener("click", () => {
  window.location.href = "/"; // Redirect to the homepage
});

// Dark mode toggle functionality
const themeToggleButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;
const images = document.querySelectorAll("img"); // Select all images to update

// Function to update images based on the theme
const updateImagesForTheme = (theme) => {
  images.forEach((img) => {
    const src = img.getAttribute("data-" + theme); // Get the source for the current theme
    if (src) {
      img.setAttribute("src", src); // Update the image source
    }
  });

  // Update favicon based on theme
  const faviconLight = document.getElementById("favicon-light");
  const faviconDark = document.getElementById("favicon-dark");
  if (theme === "dark") {
    faviconLight.setAttribute("disabled", "true");
    faviconDark.removeAttribute("disabled");
  } else {
    faviconLight.removeAttribute("disabled");
    faviconDark.setAttribute("disabled", "true");
  }

  // Update Discord button based on theme
  const discordIconLight = document.getElementById("discord-icon-light");
  const discordIconDark = document.getElementById("discord-icon-dark");
  if (theme === "dark") {
    discordIconLight.classList.remove("visible");
    discordIconDark.classList.add("visible");
  } else {
    discordIconLight.classList.add("visible");
    discordIconDark.classList.remove("visible");
  }
};

// Default to dark mode
const savedTheme = localStorage.getItem("theme") || "dark";
htmlElement.setAttribute("data-theme", savedTheme);
updateImagesForTheme(savedTheme); // Set the images to the saved theme

// Toggle between light and dark mode
themeToggleButton.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light"; // Toggle theme

  htmlElement.setAttribute("data-theme", newTheme);
  updateImagesForTheme(newTheme); // Update images for the new theme
  localStorage.setItem("theme", newTheme); // Save the new theme
});

// Handle scroll event to toggle 'scrolling' class on the body
let isScrolling;
window.addEventListener("scroll", () => {
  document.body.classList.add("scrolling");

  // Clear timeout if it exists
  window.clearTimeout(isScrolling);

  // Set a timeout to remove the class after scrolling stops
  isScrolling = setTimeout(() => {
    document.body.classList.remove("scrolling");
  }, 300);
});

// Parallax effect for the layered image
const layeredImage = document.querySelector(".layered-image");
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  layeredImage.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Adjust the multiplier for desired parallax effect
});

// Limit scrolling past the footer
window.addEventListener("scroll", () => {
  const footer = document.querySelector("footer");
  const footerRect = footer.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (footerRect.bottom <= viewportHeight) {
    window.scrollTo(0, document.body.scrollHeight - viewportHeight);
  }
});
