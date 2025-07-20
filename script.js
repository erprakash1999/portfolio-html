// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Back to top button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Typing animation for hero section
const typingText = document.querySelector(".typing-text");
const words = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Expert",
  "Cloud Architect",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const typeSpeed = isDeleting ? 50 : 100;
  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
setTimeout(typeWriter, 1000);

// Skill progress bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress-bar");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = width + "%";
    }, 100);
  });
}

// Intersection Observer for skill bars
const skillsSection = document.querySelector("#skills");
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
      }
    });
  },
  { threshold: 0.5 }
);

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
    submitBtn.className = "btn btn-success";

    // Reset form after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.className = "btn btn-gradient";
      submitBtn.disabled = false;
      this.reset();

      // Show success message
      const alertDiv = document.createElement("div");
      alertDiv.className =
        "alert alert-success alert-dismissible fade show mt-3";
      alertDiv.innerHTML = `
                        <i class="fas fa-check-circle me-2"></i>
                        Thank you! Your message has been sent successfully. I'll get back to you soon.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    `;
      this.appendChild(alertDiv);

      // Remove alert after 5 seconds
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.remove();
        }
      }, 5000);
    }, 2000);
  }, 1500);
});

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// Add loading animation to external links
document.querySelectorAll('a[href^="http"]').forEach((link) => {
  link.addEventListener("click", function () {
    const icon = this.querySelector("i");
    if (icon) {
      const originalClass = icon.className;
      icon.className = "fas fa-spinner fa-spin";
      setTimeout(() => {
        icon.className = originalClass;
      }, 2000);
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-section");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add intersection observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all cards and elements with fade-in classes
document.querySelectorAll(".card, .fade-in-up, .scale-in").forEach((el) => {
  observer.observe(el);
});

// Service cards click functionality
document.querySelectorAll("#services .card").forEach((card) => {
  card.addEventListener("click", function () {
    const title = this.querySelector(".card-title").textContent;
    alert(`Interested in ${title}? Let's discuss your project requirements!`);
  });
});

// Blog post tracking
document.querySelectorAll("#blog .btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const postTitle =
      this.closest(".card").querySelector(".card-title").textContent;
    console.log(`Blog post clicked: ${postTitle}`);
    // Here you would typically track this event with analytics
  });
});

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // Close any open modals or overlays
    const modals = document.querySelectorAll(".modal.show");
    modals.forEach((modal) => {
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    });
  }
});

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Add theme toggle functionality (bonus feature)
function createThemeToggle() {
  const themeToggle = document.createElement("button");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.className = "btn btn-outline-secondary position-fixed";
  themeToggle.style.cssText =
    "top: 100px; right: 30px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px;";

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    const icon = this.querySelector("i");
    icon.className = document.body.classList.contains("dark-theme")
      ? "fas fa-sun"
      : "fas fa-moon";
  });

  document.body.appendChild(themeToggle);
}

// Initialize theme toggle
createThemeToggle();

// Add print styles optimization
window.addEventListener("beforeprint", function () {
  document.body.classList.add("printing");
});

window.addEventListener("afterprint", function () {
  document.body.classList.remove("printing");
});

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio loaded successfully!");

  // Add any additional initialization here
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }
});
