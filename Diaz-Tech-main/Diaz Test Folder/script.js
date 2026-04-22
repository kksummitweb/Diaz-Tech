const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
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

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const missingRequired = [...formData.entries()].some(([, value]) => !String(value).trim());

    if (missingRequired) {
      status.textContent = "Please complete all fields before submitting.";
      status.style.color = "#c85e00";
      return;
    }

    status.textContent = "Thank you! Your request was received. DiazTech will contact you shortly.";
    status.style.color = "#0b7d42";
    bookingForm.reset();
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
