// NAVBAR, SCROLL & ANIMATIONS
$(document).ready(function () {
  // Sticky navbar and scroll-up button
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    if ($(window).scrollTop() > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // Scroll to top
  $(".scroll-up-btn").on("click", function () {
    $("html, body").animate(
      { scrollTop: 0 },
      500
    );
  });

  // Mobile navigation toggle
  $(".menu-toggle").on("click", function () {
    const isOpen = $(".navbar .menu").hasClass("active");

    $(".navbar .menu").toggleClass("active");

    $(this).find("i").toggleClass("fa-bars", isOpen);
    $(this).find("i").toggleClass("fa-times", !isOpen);

    $(this).attr("aria-expanded", String(!isOpen));
  });

  // Close mobile menu after clicking a navigation link
  $(".navbar .menu .menu-btn").on("click", function () {
    $(".navbar .menu").removeClass("active");

    $(".menu-toggle i")
      .removeClass("fa-times")
      .addClass("fa-bars");

    $(".menu-toggle").attr("aria-expanded", "false");
  });

  // Typing animation
  if (typeof Typed !== "undefined") {
    if (document.querySelector(".typing")) {
      new Typed(".typing", {
        strings: [
          "Web Developer",
          "Frontend Developer",
          "Web Designer"
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
      });
    }

    if (document.querySelector(".typing-2")) {
      new Typed(".typing-2", {
        strings: [
          "Web Developer",
          "Frontend Developer",
          "Web Designer"
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
      });
    }
  }
});


// =========================
// AOS ANIMATIONS
// =========================

if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 80
  });
}


// =========================
// CURRENT FOOTER YEAR
// =========================

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================
// EMAILJS CONFIGURATION
// =========================

// Replace this with your EmailJS Public Key.
const EMAILJS_PUBLIC_KEY = "yeN15Pn9QArPzVBpj";

// Replace these with your EmailJS Service ID and Template ID.
const EMAILJS_SERVICE_ID = "service_whpixl9";
const EMAILJS_TEMPLATE_ID = "template_8hpuihd";


// Initialize EmailJS
if (
  typeof emailjs !== "undefined" &&
  EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
) {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    // Check that EmailJS is available
    if (typeof emailjs === "undefined") {
      showFormMessage(
        "The email service is unavailable. Please try again later.",
        "error"
      );
      return;
    }

    // Check that the EmailJS settings have been configured
    if (
      EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
      EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
      EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID"
    ) {
      showFormMessage(
        "Please configure your EmailJS settings before sending.",
        "error"
      );
      return;
    }

    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    showFormMessage("", "");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
      );

      showFormMessage(
        "Thank you! Your message has been sent successfully.",
        "success"
      );

      contactForm.reset();

    } catch (error) {
      console.error("EmailJS error:", error);

      showFormMessage(
        "Sorry, your message could not be sent. Please try again.",
        "error"
      );

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}


// Display contact form status
function showFormMessage(message, type) {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.className = type;
}