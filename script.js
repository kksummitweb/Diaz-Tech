const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navWrap = document.querySelector(".nav-wrap");
const QUOTE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzoLC4jGayiLbkO7_HpfbVkxFbWrRVJYiHJu99CQPQJKJ22oHbX__FmQYqMVaE_Zvy7/exec";
const THEME_STORAGE_KEY = "diaztech-theme";

const rootElement = document.documentElement;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }
  return prefersDarkScheme.matches ? "dark" : "light";
};

const setTheme = (theme) => {
  rootElement.setAttribute("data-theme", theme);
};

setTheme(getInitialTheme());

const themeToggle = document.createElement("button");
themeToggle.type = "button";
themeToggle.className = "theme-toggle";
themeToggle.innerHTML = '<span class="theme-toggle-track" aria-hidden="true"><span class="theme-toggle-thumb"></span></span><span class="theme-toggle-label"></span>';
const themeToggleLabel = themeToggle.querySelector(".theme-toggle-label");

const syncThemeToggleLabel = () => {
  const activeTheme = rootElement.getAttribute("data-theme") || "light";
  themeToggle.dataset.mode = activeTheme;
  themeToggle.setAttribute("aria-pressed", activeTheme === "dark" ? "true" : "false");
  if (activeTheme === "dark") {
    if (themeToggleLabel) themeToggleLabel.textContent = "Dark mode";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    if (themeToggleLabel) themeToggleLabel.textContent = "Light mode";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
};

if (navWrap) {
  if (menuToggle) {
    navWrap.insertBefore(themeToggle, menuToggle);
  } else if (nav) {
    navWrap.insertBefore(themeToggle, nav);
  } else {
    navWrap.appendChild(themeToggle);
  }
  syncThemeToggleLabel();

  themeToggle.addEventListener("click", () => {
    const activeTheme = rootElement.getAttribute("data-theme") || "light";
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    syncThemeToggleLabel();
  });

  prefersDarkScheme.addEventListener("change", (event) => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      return;
    }
    setTheme(event.matches ? "dark" : "light");
    syncThemeToggleLabel();
  });
}

if (menuToggle && nav) {
  const closeMenu = () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    nav.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const clickTarget = event.target;
    if (!(clickTarget instanceof Node)) return;
    if (!nav.classList.contains("open")) return;
    if (nav.contains(clickTarget) || menuToggle.contains(clickTarget)) return;
    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });
}

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const targetValue = Number(counter.dataset.counter || 0);
      const duration = 1600;
      const start = performance.now();

      const animate = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        counter.textContent = Math.floor(progress * targetValue).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      observer.unobserve(counter);
    });
  },
  { threshold: 0.65 }
);

document.querySelectorAll("[data-counter]").forEach((counter) => {
  statsObserver.observe(counter);
});

const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  const status = bookingForm.querySelector(".form-msg");
  const submitButton = bookingForm.querySelector('button[type="submit"]');

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const missingRequired = [...formData.entries()].some(([, value]) => !String(value).trim());

    if (missingRequired) {
      status.textContent = "Please complete all fields before submitting.";
      status.style.color = "#c85e00";
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      status.textContent = "Sending your request...";
      status.style.color = "#36506f";

      const payload = new URLSearchParams();
      formData.forEach((value, key) => {
        payload.append(key, String(value));
      });

      // Backward compatibility for Apps Script versions still using old names.
      const deviceValue = String(formData.get("device") || "");
      const issueValue = String(formData.get("issue") || "");
      payload.append("service", deviceValue);
      payload.append("message", issueValue);

      const response = await fetch(QUOTE_WEB_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: payload.toString(),
      });

      let result = null;
      try {
        result = await response.json();
      } catch (_error) {
        result = null;
      }

      // Apps Script web apps sometimes return redirects/HTML despite successful doPost execution.
      // Treat explicit JSON errors as failures; otherwise accept 2xx/redirect responses as submitted.
      const explicitError = result && result.result && result.result !== "success";
      if (!response.ok || explicitError) {
        throw new Error("Submission failed");
      }

      status.textContent = "Thank you! Your request was received. DiazTech will contact you shortly.";
      status.style.color = "#0b7d42";
      bookingForm.reset();
    } catch (_error) {
      status.textContent = "We could not send your request right now. Please try again in a moment.";
      status.style.color = "#c85e00";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Request";
      }
    }
  });
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const revealCards = document.querySelectorAll("[data-reveal]");
if (revealCards.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 70}ms`;
    revealObserver.observe(card);
  });
}
