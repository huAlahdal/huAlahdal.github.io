// Portfolio v4 — Scripts

const body = document.body;
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll(".nav a");
const year = document.querySelector("#year");

// Year
if (year) year.textContent = new Date().getFullYear();

// Mobile menu
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Scroll reveal — observe all animatable elements
const animEls = document.querySelectorAll(
  ".reveal, .project-item, .bento-card, .exp-row, .project-featured, .hero-text, .hero-photo"
);

// Set stagger index
document.querySelectorAll(".project-grid, .bento, .exp-list").forEach(parent => {
  [...parent.children].forEach((child, i) => child.style.setProperty("--i", i));
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
);

animEls.forEach(el => observer.observe(el));

// Active nav tracking
const sections = document.querySelectorAll("main section[id]");
const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);
sections.forEach(s => navObserver.observe(s));
