const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navWrap = document.querySelector(".nav-wrap");
const QUOTE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzoLC4jGayiLbkO7_HpfbVkxFbWrRVJYiHJu99CQPQJKJ22oHbX__FmQYqMVaE_Zvy7/exec";
const THEME_STORAGE_KEY = "diaztech-theme";
const LANGUAGE_STORAGE_KEY = "diaztech-language";
const LIGHT_LOGO_SRC = "assets/logo.jpeg";
const DARK_LOGO_SRC = "assets/Dark Mode Logo.png";

const rootElement = document.documentElement;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const brandLogoImages = document.querySelectorAll(".brand img");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const descriptionMeta = document.querySelector('meta[name="description"]');

const originalTextMap = new WeakMap();
const originalAttributesMap = new WeakMap();
const originalTitle = document.title;
const originalDescription = descriptionMeta ? descriptionMeta.getAttribute("content") || "" : "";

const I18N_UI = {
  en: {
    lightMode: "Light mode",
    darkMode: "Dark mode",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    languageLabel: "EN / ES",
    switchToEnglish: "Switch to English",
    switchToSpanish: "Cambiar a español",
    toggleMenu: "Toggle menu",
    formMissing: "Please complete all fields before submitting.",
    formSendingButton: "Sending...",
    formSendingStatus: "Sending your request...",
    formSuccess: "Thank you! Your request was received. DiazTech will contact you shortly.",
    formError: "We could not send your request right now. Please try again in a moment.",
    formSubmit: "Send Request",
  },
  es: {
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
    switchToLight: "Cambiar a modo claro",
    switchToDark: "Cambiar a modo oscuro",
    languageLabel: "ES / EN",
    switchToEnglish: "Switch to English",
    switchToSpanish: "Cambiar a español",
    toggleMenu: "Abrir menú",
    formMissing: "Por favor completa todos los campos antes de enviar.",
    formSendingButton: "Enviando...",
    formSendingStatus: "Enviando tu solicitud...",
    formSuccess: "¡Gracias! Tu solicitud fue recibida. DiazTech te contactará pronto.",
    formError: "No pudimos enviar tu solicitud ahora. Inténtalo de nuevo en un momento.",
    formSubmit: "Enviar solicitud",
  },
};

const I18N_TEXT_ES = {
  "Skip to content": "Saltar al contenido",
  "Toggle menu": "Abrir menú",
  Home: "Inicio",
  Services: "Servicios",
  Gallery: "Galería",
  About: "Nosotros",
  "Get a Quote": "Solicitar cotización",
  "Local technology repair and troubleshooting support.": "Soporte local de reparación y solución de problemas tecnológicos.",
  Pages: "Páginas",
  Contact: "Contacto",
  "Message DiazTech": "Enviar mensaje a DiazTech",
  "All rights reserved.": "Todos los derechos reservados.",
  "Local Tech Repair": "Reparación tecnológica local",
  "Affordable Tech Help for All Your Devices and Builds": "Ayuda tecnológica accesible para todos tus dispositivos y equipos",
  "Hi everyone! My name is Angel, and I am a 17-year-old local student starting DiazTech, a tech repair and setup service focused on helping people with all kinds of devices and custom PC needs.": "¡Hola a todos! Mi nombre es Angel y soy un estudiante local de 17 años que está iniciando DiazTech, un servicio de reparación y configuración tecnológica enfocado en ayudar a personas con todo tipo de dispositivos y PCs personalizadas.",
  "Request Free Diagnosis": "Solicitar diagnóstico gratis",
  "View Services": "Ver servicios",
  "Free Diagnosis Offer": "Oferta de diagnóstico gratis",
  "I am currently offering free diagnosis while I grow and gain more experience.": "Actualmente ofrezco diagnóstico gratis mientras sigo creciendo y ganando experiencia.",
  "If your phone, tablet, laptop, desktop, or custom PC is not working right, message DiazTech and I will gladly take a look.": "Si tu teléfono, tablet, laptop, computadora de escritorio o PC personalizada no funciona bien, envía un mensaje a DiazTech y con gusto lo reviso.",
  "Get Started": "Comenzar",
  "Years Old Founder": "Edad del fundador",
  "Committed Effort (%)": "Compromiso y esfuerzo (%)",
  "Core Service Areas": "Áreas principales de servicio",
  "Diagnosis Cost ($)": "Costo de diagnóstico ($)",
  "What DiazTech Helps With": "En qué ayuda DiazTech",
  "Simple, Honest, and Practical Repair Support": "Soporte de reparación simple, honesto y práctico",
  "Device Speed Fixes": "Mejoras de velocidad",
  "Cleanups, startup optimization, and tuning to make computers and other devices run better.": "Limpieza, optimización de inicio y ajustes para que computadoras y otros dispositivos funcionen mejor.",
  "All Device Issues": "Problemas en todo tipo de dispositivos",
  "Troubleshooting crashes, setup problems, connectivity issues, and other tech symptoms.": "Diagnóstico de fallos, problemas de configuración, conectividad y otros síntomas tecnológicos.",
  "Upgrades & PC Assembly": "Actualizaciones y armado de PC",
  "Component upgrades, custom PC builds, and practical performance recommendations.": "Actualización de componentes, armado de PCs personalizadas y recomendaciones prácticas de rendimiento.",
  "Personal Message": "Mensaje personal",
  "Built with Community Support": "Construido con apoyo de la comunidad",
  "I enjoy working with technology and helping people solve real problems. As DiazTech grows, I appreciate every message, question, referral, and piece of advice.": "Me gusta trabajar con tecnología y ayudar a las personas a resolver problemas reales. Mientras DiazTech crece, agradezco cada mensaje, pregunta, recomendación y consejo.",
  "Thank you for supporting a local student-owned business.": "Gracias por apoyar un negocio local dirigido por un estudiante.",
  "- Angel | Diaz Tech": "- Angel | Diaz Tech",
  "Next step": "Siguiente paso",
  "Tell me what issue you are having and I will follow up with a free diagnosis.": "Cuéntame qué problema tienes y te responderé con un diagnóstico gratis.",
  "Founder · DiazTech": "Fundador · DiazTech",
  Meet: "Conoce",
  Angel: "Angel",
  "Founder & lead technician": "Fundador y técnico principal",
  "Founder age": "Edad del fundador",
  "Effort & care (%)": "Esfuerzo y cuidado (%)",
  "Core service areas": "Áreas principales de servicio",
  "What to include": "Qué incluir",
  "Full Name": "Nombre completo",
  Email: "Correo electrónico",
  Phone: "Teléfono",
  "Device Type": "Tipo de dispositivo",
  "Choose one": "Elige uno",
  "Custom PC Build": "PC personalizada",
  Other: "Otro",
  "Problem Description": "Descripción del problema",
  "Service Area": "Área de servicio",
  "Need help today?": "¿Necesitas ayuda hoy?",
  "Ready to submit?": "¿Listo para enviar?",
  "Browse services": "Explorar servicios",
  "Request a quote": "Solicitar cotización",
  "View recent work": "Ver trabajo reciente",
};

const I18N_ATTRIBUTE_ES = {
  "DiazTech Home": "Inicio de DiazTech",
  "Main navigation": "Navegación principal",
  Highlights: "Destacados",
  "At a glance": "Resumen",
  "Quote page highlights": "Destacados de cotización",
  "DiazTech logo": "Logo de DiazTech",
};

const I18N_TITLE_ES = {
  "DiazTech | Local Device Repair & PC Assembly by Angel": "DiazTech | Reparación local de dispositivos y armado de PC por Angel",
  "About DiazTech | Angel's Tech Story": "Sobre DiazTech | La historia tecnológica de Angel",
  "DiazTech Services | Device Repair & PC Assembly": "Servicios DiazTech | Reparación de dispositivos y armado de PC",
  "DiazTech Gallery | Recent Work": "Galería DiazTech | Trabajos recientes",
  "Get a Quote | DiazTech": "Solicitar cotización | DiazTech",
};

const I18N_DESCRIPTION_ES = {
  "DiazTech is a local tech service by Angel offering help with phones, tablets, computers, troubleshooting, upgrades, and custom PC assembly.": "DiazTech es un servicio tecnológico local de Angel que ofrece ayuda con teléfonos, tablets, computadoras, diagnósticos, mejoras y armado de PCs personalizadas.",
  "Learn about Angel, the founder of DiazTech, and the mission to help with all kinds of devices, repairs, and custom PC builds.": "Conoce a Angel, fundador de DiazTech, y la misión de ayudar con todo tipo de dispositivos, reparaciones y armado de PCs personalizadas.",
  "Explore DiazTech services for phones, tablets, laptops, desktops, troubleshooting, upgrades, and custom PC assembly.": "Explora los servicios de DiazTech para teléfonos, tablets, laptops, computadoras de escritorio, diagnósticos, mejoras y armado de PCs personalizadas.",
  "View DiazTech repair gallery and examples of common computer repair and upgrade jobs.": "Mira la galería de reparaciones de DiazTech y ejemplos de trabajos comunes de reparación y mejora de computadoras.",
  "Request a free diagnosis and quote from DiazTech for phones, tablets, computers, upgrades, and custom PC builds.": "Solicita un diagnóstico gratis y una cotización de DiazTech para teléfonos, tablets, computadoras, mejoras y armado de PCs personalizadas.",
};

let activeLanguage = "en";

const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }
  return prefersDarkScheme.matches ? "dark" : "light";
};

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage === "en" || savedLanguage === "es") {
    return savedLanguage;
  }
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
};

const t = (key) => I18N_UI[activeLanguage][key] || I18N_UI.en[key] || "";

const setTheme = (theme) => {
  rootElement.setAttribute("data-theme", theme);
  const nextLogoSrc = theme === "dark" ? DARK_LOGO_SRC : LIGHT_LOGO_SRC;
  brandLogoImages.forEach((image) => {
    image.setAttribute("src", nextLogoSrc);
  });
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", theme === "dark" ? "#0b1526" : "#0a5fb4");
  }
};

const applyTextLanguage = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node);
    node = walker.nextNode();
  }

  textNodes.forEach((textNode) => {
    const parentTag = textNode.parentElement ? textNode.parentElement.tagName : "";
    if (parentTag === "SCRIPT" || parentTag === "STYLE") return;

    if (!originalTextMap.has(textNode)) {
      originalTextMap.set(textNode, textNode.textContent || "");
    }

    const originalText = originalTextMap.get(textNode) || "";
    const normalized = normalizeText(originalText);
    if (!normalized) return;

    if (activeLanguage === "es" && I18N_TEXT_ES[normalized]) {
      textNode.textContent = I18N_TEXT_ES[normalized];
    } else {
      textNode.textContent = originalText;
    }
  });
};

const applyAttributeLanguage = () => {
  const elements = document.querySelectorAll("[aria-label], [alt], [placeholder], [title]");
  const attributeNames = ["aria-label", "alt", "placeholder", "title"];

  elements.forEach((element) => {
    if (!originalAttributesMap.has(element)) {
      const attrs = {};
      attributeNames.forEach((name) => {
        if (element.hasAttribute(name)) {
          attrs[name] = element.getAttribute(name) || "";
        }
      });
      originalAttributesMap.set(element, attrs);
    }

    const originalAttributes = originalAttributesMap.get(element) || {};
    attributeNames.forEach((name) => {
      if (!(name in originalAttributes)) return;
      const originalValue = originalAttributes[name];
      const normalized = normalizeText(originalValue);
      if (activeLanguage === "es" && I18N_ATTRIBUTE_ES[normalized]) {
        element.setAttribute(name, I18N_ATTRIBUTE_ES[normalized]);
      } else {
        element.setAttribute(name, originalValue);
      }
    });
  });
};

const applyHeadLanguage = () => {
  if (activeLanguage === "es") {
    document.title = I18N_TITLE_ES[originalTitle] || originalTitle;
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", I18N_DESCRIPTION_ES[originalDescription] || originalDescription);
    }
  } else {
    document.title = originalTitle;
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", originalDescription);
    }
  }
};

const applyLanguage = (language) => {
  activeLanguage = language;
  rootElement.setAttribute("lang", language);
  applyTextLanguage();
  applyAttributeLanguage();
  applyHeadLanguage();
};

setTheme(getInitialTheme());
applyLanguage(getInitialLanguage());

const themeToggle = document.createElement("button");
themeToggle.type = "button";
themeToggle.className = "theme-toggle";
themeToggle.innerHTML = '<span class="theme-toggle-track" aria-hidden="true"><span class="theme-toggle-thumb"></span></span><span class="theme-toggle-label"></span>';
const themeToggleLabel = themeToggle.querySelector(".theme-toggle-label");

const languageToggle = document.createElement("button");
languageToggle.type = "button";
languageToggle.className = "language-toggle";
languageToggle.innerHTML = '<span class="language-toggle-label"></span>';
const languageToggleLabel = languageToggle.querySelector(".language-toggle-label");

const syncThemeToggleLabel = () => {
  const activeTheme = rootElement.getAttribute("data-theme") || "light";
  themeToggle.dataset.mode = activeTheme;
  themeToggle.setAttribute("aria-pressed", activeTheme === "dark" ? "true" : "false");
  if (activeTheme === "dark") {
    if (themeToggleLabel) themeToggleLabel.textContent = t("darkMode");
    themeToggle.setAttribute("aria-label", t("switchToLight"));
  } else {
    if (themeToggleLabel) themeToggleLabel.textContent = t("lightMode");
    themeToggle.setAttribute("aria-label", t("switchToDark"));
  }
};

const syncLanguageToggleLabel = () => {
  languageToggle.dataset.lang = activeLanguage;
  if (languageToggleLabel) {
    languageToggleLabel.textContent = t("languageLabel");
  }
  languageToggle.setAttribute("aria-label", activeLanguage === "es" ? t("switchToEnglish") : t("switchToSpanish"));
};

if (navWrap) {
  if (nav) {
    nav.insertAdjacentElement("afterend", themeToggle);
    themeToggle.insertAdjacentElement("afterend", languageToggle);
  } else if (menuToggle) {
    navWrap.insertBefore(themeToggle, menuToggle);
    navWrap.insertBefore(languageToggle, menuToggle);
  } else {
    navWrap.appendChild(themeToggle);
    navWrap.appendChild(languageToggle);
  }

  syncThemeToggleLabel();
  syncLanguageToggleLabel();

  themeToggle.addEventListener("click", () => {
    const activeTheme = rootElement.getAttribute("data-theme") || "light";
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    syncThemeToggleLabel();
  });

  languageToggle.addEventListener("click", () => {
    const nextLanguage = activeLanguage === "en" ? "es" : "en";
    applyLanguage(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    syncThemeToggleLabel();
    syncLanguageToggleLabel();
    if (menuToggle) {
      const menuLabel = menuToggle.querySelector(".sr-only");
      if (menuLabel) {
        menuLabel.textContent = t("toggleMenu");
      }
    }
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

  const menuLabel = menuToggle.querySelector(".sr-only");
  if (menuLabel) {
    menuLabel.textContent = t("toggleMenu");
  }

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

  const syncSubmitButtonLabel = () => {
    if (submitButton && !submitButton.disabled) {
      submitButton.textContent = t("formSubmit");
    }
  };

  syncSubmitButtonLabel();

  languageToggle.addEventListener("click", () => {
    syncSubmitButtonLabel();
  });

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const missingRequired = [...formData.entries()].some(([, value]) => !String(value).trim());

    if (missingRequired) {
      status.textContent = t("formMissing");
      status.style.color = "#c85e00";
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = t("formSendingButton");
      }

      status.textContent = t("formSendingStatus");
      status.style.color = "#36506f";

      const payload = new URLSearchParams();
      formData.forEach((value, key) => {
        payload.append(key, String(value));
      });

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

      const explicitError = result && result.result && result.result !== "success";
      if (!response.ok || explicitError) {
        throw new Error("Submission failed");
      }

      status.textContent = t("formSuccess");
      status.style.color = "#0b7d42";
      bookingForm.reset();
    } catch (_error) {
      status.textContent = t("formError");
      status.style.color = "#c85e00";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = t("formSubmit");
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
