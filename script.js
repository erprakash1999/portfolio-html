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
  if(!typingText) return; // Ensure typingText exists
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
// createThemeToggle();
