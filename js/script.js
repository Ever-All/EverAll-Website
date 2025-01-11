// Function to load external components (buttons and footer)
async function loadComponents() {
  // Fetch the buttons HTML from the external file
  const buttons = await fetch("/html/buttons.html").then((res) => res.text());
  // Fetch the footer HTML from the external file
  const footer = await fetch("/html/footer.html").then((res) => res.text());

  // Insert the fetched HTML into the respective placeholders
  document.getElementById("buttons-placeholder").innerHTML = buttons;
  document.getElementById("footer-placeholder").innerHTML = footer;

  // Force re-rendering by appending styles again after a delay
  setTimeout(() => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/css/styles.css";
    document.head.appendChild(stylesheet);

    // Ensure elements are available before applying styles
    applyStyles();
  }, 100);
}

// Function to apply styles and add event listeners to the loaded components
function applyStyles() {
  // Home button functionality
  const homeBtn = document.getElementById("home-btn");
  homeBtn.addEventListener("click", () => {
    window.location.href = "/"; // Redirect to the homepage
  });

  // Dark mode toggle functionality
  const themeToggleBtn = document.getElementById("theme-toggle");
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
  themeToggleBtn.addEventListener("click", () => {
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

  // Parallax effect for the gradient image
  const gradientImage = document.querySelector(".gradient-image");
  const aboutSection = document.getElementById("about");
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const aboutSectionTop = aboutSection.offsetTop;
    const parallaxOffset = Math.max(0, scrollPosition - aboutSectionTop);
    gradientImage.style.transform = `translateY(${parallaxOffset * -20}px)`; // Adjust the multiplier for desired parallax effect
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

  // Show the buttons after styles are applied
  document.getElementById("buttons-placeholder").style.display = "block";
}

// Hide the buttons initially
document.getElementById("buttons-placeholder").style.display = "none";

// Load the components when the script is executed
loadComponents();
