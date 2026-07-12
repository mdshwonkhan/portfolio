/* =========================================================================
   Md. Shwon Khan — Professional Portfolio
   Vanilla JS: mobile nav, active-link highlighting, scroll reveal,
   back-to-top button. No dependencies, no server required.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile navigation toggle ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu after a link is clicked
    mainNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActiveLink = () => {
    let currentId = "";
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Scroll reveal animation ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: reveal everything immediately if IntersectionObserver is unsupported
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Back-to-top button ---------- */
  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle("visible", window.scrollY > 480);
    };
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById("site-header");
  if (header) {
    const toggleHeaderShadow = () => {
      header.style.boxShadow = window.scrollY > 8 ? "0 4px 16px rgba(10, 31, 61, 0.06)" : "none";
    };
    window.addEventListener("scroll", toggleHeaderShadow, { passive: true });
    toggleHeaderShadow();
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
