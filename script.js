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
  "About DiazTech | Angel's Tech Story": "Sobre DiazTech | La historia tecnológica de Angel",
  "DiazTech Services | Device Repair & PC Assembly": "Servicios DiazTech | Reparación de dispositivos y armado de PC",
  "DiazTech Gallery | Recent Work": "Galería DiazTech | Trabajos recientes",
  "Get a Quote | DiazTech": "Solicitar cotización | DiazTech",
  "Meet": "Conoce",
  "Angel is the founder of DiazTech, a local technology service focused on dependable support, clear communication,": "Angel es el fundador de DiazTech, un servicio tecnológico local enfocado en soporte confiable y comunicación clara,",
  "and practical solutions for device repair, upgrades, and custom PC builds.": "y soluciones prácticas para reparación de dispositivos, mejoras y armado de PCs personalizadas.",
  "The mission is a professional, trustworthy experience: honest help, straightforward recommendations, and quality": "La misión es una experiencia profesional y confiable: ayuda honesta, recomendaciones claras y calidad",
  "service for everyday technology needs.": "de servicio para las necesidades tecnológicas del día a día.",
  "Free diagnosis": "Diagnóstico gratis",
  "Student-owned": "Negocio de estudiante",
  "Repair & custom PCs": "Reparación y PCs personalizadas",
  "What DiazTech stands for": "Lo que representa DiazTech",
  "Reliable local service with a personal, refined approach.": "Servicio local confiable con un enfoque personal y profesional.",
  "Every interaction is built around clarity, respect for your time, and work you can feel confident recommending to": "Cada interacción se basa en claridad, respeto por tu tiempo y trabajo que puedas recomendar con confianza a",
  "friends and family.": "amigos y familia.",
  "Mission": "Misión",
  "DiazTech exists to make technology support feel approachable: helpful, affordable, and honest. Repairs and": "DiazTech existe para que el soporte tecnológico se sienta accesible: útil, económico y honesto. Las reparaciones y",
  "recommendations stay clear, practical, and accessible for the local community.": "recomendaciones se mantienen claras, prácticas y accesibles para la comunidad local.",
  "Why it started": "Por qué comenzó",
  "DiazTech was created to fill the gap between rushed big-box service and opaque online help—with a personal": "DiazTech se creó para cubrir el vacío entre el servicio apresurado de grandes tiendas y la ayuda en línea poco clara, con un trato personal",
  "touch and straight answers.": "y respuestas directas.",
  "How it works": "Cómo funciona",
  "Clear communication first, then respectful service and straightforward options. Every project begins with a": "Primero comunicación clara, luego servicio respetuoso y opciones directas. Cada proyecto comienza con un",
  "free diagnosis so you understand the issue before moving forward.": "diagnóstico gratis para que entiendas el problema antes de continuar.",
  "Community first": "La comunidad primero",
  "DiazTech is built on trust, consistency, and steady growth. Every project is a chance to serve the community": "DiazTech se construye sobre confianza, constancia y crecimiento. Cada proyecto es una oportunidad para servir a la comunidad",
  "well and strengthen a local reputation.": "bien y fortalecer una reputación local.",
  "It is not only about fixing devices—it is about making sure each client feels informed, respected, and confident": "No se trata solo de reparar dispositivos, sino de asegurar que cada cliente se sienta informado, respetado y con confianza",
  "in the service they receive.": "en el servicio que recibe.",
  "Work with DiazTech": "Trabaja con DiazTech",
  "Phones, tablets, computers, upgrades, or custom builds—reach out for a free diagnosis and a clear next step.": "Teléfonos, tablets, computadoras, mejoras o equipos personalizados: contáctanos para un diagnóstico gratis y un siguiente paso claro.",
  "Get started": "Comenzar",
  "I care about getting it right the first time, explaining what happened in plain language, and leaving you confident": "Me importa hacerlo bien desde la primera vez, explicar lo ocurrido en lenguaje simple y dejarte con confianza",
  "your tech is in good hands.": "de que tu tecnología está en buenas manos.",
  "Support a student business": "Apoya un negocio estudiantil",
  "Every project helps DiazTech grow.": "Cada proyecto ayuda a que DiazTech crezca.",
  "Choosing DiazTech supports a motivated local business focused on learning, improving, and showing up with": "Elegir DiazTech apoya un negocio local motivado, enfocado en aprender, mejorar y presentarse con",
  "dependable help on every repair and setup.": "ayuda confiable en cada reparación y configuración.",
  "Transparent recommendations": "Recomendaciones transparentes",
  "Respect for your budget and timeline": "Respeto por tu presupuesto y tiempos",
  "Quality-focused workmanship": "Trabajo enfocado en calidad",
  "Ready when you are": "Listo cuando tú lo estés",
  "Share what is going on with your device or build. Angel will reply with a free diagnosis and clear options—no": "Comparte qué ocurre con tu dispositivo o equipo. Angel responderá con un diagnóstico gratis y opciones claras, sin",
  "pressure, no jargon wall.": "presión ni tecnicismos innecesarios.",
  "Services · DiazTech": "Servicios · DiazTech",
  "Repair, setup, and": "Reparación, configuración y",
  "real tech help": "ayuda tecnológica real",
  "Phones, tablets, laptops, desktops, gaming setups, and everyday troubleshooting—with custom PC assembly,": "Teléfonos, tablets, laptops, computadoras, equipos gamer y diagnósticos cotidianos, con armado de PC personalizada,",
  "upgrades, and a": "mejoras y un",
  "Every service is explained in plain language so you always know what is wrong, what it will take to fix, and": "Cada servicio se explica en lenguaje simple para que sepas qué está mal, qué se necesita para arreglarlo y",
  "what it is likely to cost before you approve the next step.": "cuánto podría costar antes de aprobar el siguiente paso.",
  "Many device types": "Muchos tipos de dispositivos",
  "Custom PCs & upgrades": "PCs personalizadas y mejoras",
  "Request free diagnosis": "Solicitar diagnóstico gratis",
  "Core support": "Soporte principal",
  "Services tuned for the problems people hit every day.": "Servicios diseñados para los problemas que la gente enfrenta cada día.",
  "From slow computers to mystery errors and full custom builds—these are the service lanes DiazTech is built around.": "Desde computadoras lentas hasta errores difíciles y equipos totalmente personalizados, estas son las áreas en que se enfoca DiazTech.",
  "Performance & speed optimization": "Optimización de rendimiento y velocidad",
  "All device repair & troubleshooting": "Reparación y diagnóstico de todo tipo de dispositivos",
  "General tech support": "Soporte tecnológico general",
  "What to expect": "Qué esperar",
  "Simple process. No confusing tech talk.": "Proceso simple. Sin lenguaje técnico confuso.",
  "Share the issue": "Comparte el problema",
  "Free diagnosis for every service": "Diagnóstico gratis en cada servicio",
  "Most software cleanups: often within 1–3 days": "La mayoría de limpiezas de software: generalmente entre 1 y 3 días",
  "Hardware upgrades depend on part availability": "Las mejoras de hardware dependen de la disponibilidad de piezas",
  "Pricing is confirmed before repair work begins": "El precio se confirma antes de iniciar la reparación",
  "Typical turnaround": "Tiempo de entrega típico",
  "Quick answers before you book.": "Respuestas rápidas antes de solicitar servicio.",
  "Service Area": "Área de servicio",
  "Current local coverage": "Cobertura local actual",
  "DiazTech currently serves the local area shown below. If you are nearby, send your issue details and you will": "DiazTech actualmente atiende el área local mostrada abajo. Si estás cerca, envía los detalles de tu problema y",
  "get clear availability and next-step options.": "recibirás disponibilidad clara y opciones para el siguiente paso.",
  "Straightforward quote and approval process": "Proceso claro de cotización y aprobación",
  "How DiazTech works with you": "Cómo trabaja DiazTech contigo",
  "You should never feel rushed into a repair. The goal is a fix you understand, at a pace you are comfortable with,": "Nunca deberías sentirte presionado a reparar. El objetivo es una solución que entiendas, a un ritmo cómodo para ti,",
  "with communication that respects your time.": "con comunicación que respete tu tiempo.",
  "Need help now?": "¿Necesitas ayuda ahora?",
  "Start with a free diagnosis request.": "Comienza con una solicitud de diagnóstico gratis.",
  "Describe the issue in your own words": "Describe el problema con tus propias palabras",
  "Include device type and age if you know it": "Incluye el tipo de dispositivo y su antigüedad si la conoces",
  "Expect a thoughtful reply—not a copy-paste script": "Espera una respuesta pensada, no un mensaje genérico",
  "Request support": "Solicitar soporte",
  "There is no cost to ask questions or get an initial diagnosis.": "No tiene costo hacer preguntas o recibir un diagnóstico inicial.",
  "Gallery · Real Work": "Galería · Trabajo real",
  "See the": "Mira el",
  "repair process": "proceso de reparación",
  "up close": "de cerca",
  "Every image below comes from real DiazTech repair and upgrade work. These examples show the same careful process used for each phone,": "Cada imagen abajo proviene de trabajos reales de reparación y mejora en DiazTech. Estos ejemplos muestran el mismo proceso cuidadoso usado en cada teléfono,",
  "laptop, desktop, and custom PC project.": "laptop, computadora de escritorio y proyecto de PC personalizada.",
  "The goal is simple: clean workmanship, honest diagnostics, and results that hold up after handoff.": "El objetivo es simple: trabajo limpio, diagnósticos honestos y resultados que se mantienen después de la entrega.",
  "Verified project photos": "Fotos de proyectos verificados",
  "Repair and upgrade workflow": "Flujo de reparación y mejora",
  "Clear service outcomes": "Resultados de servicio claros",
  "Browse showcase": "Explorar galería",
  "Showcase categories": "Categorías de galería",
  "Desktop internals and upgrades": "Internos y mejoras de escritorio",
  "Smartphone teardown and reassembly": "Desarme y reensamblaje de smartphone",
  "Laptop maintenance and diagnostics": "Mantenimiento y diagnóstico de laptop",
  "View all services": "Ver todos los servicios",
  "Diagnostics before assumptions": "Diagnóstico antes de suposiciones",
  "Clean bench workflow": "Flujo de trabajo limpio en banco",
  "Final verification before handoff": "Verificación final antes de entregar",
  "Repair Showcase": "Galería de reparaciones",
  "Project snapshots from active service work.": "Instantáneas de proyectos en trabajos de servicio activos.",
  "This gallery highlights real device states during repair, restoration, and upgrade stages.": "Esta galería muestra estados reales de dispositivos durante etapas de reparación, restauración y mejora.",
  "Custom desktop internal hardware": "Hardware interno de escritorio personalizado",
  "Smartphone teardown view": "Vista de desarme de smartphone",
  "Laptop internal service stage": "Etapa de servicio interno de laptop",
  "Phone reassembly workflow": "Flujo de reensamblaje de teléfono",
  "Desktop RAM upgrade": "Mejora de RAM en escritorio",
  "Craft over shortcuts": "Calidad por encima de atajos",
  "Need your device checked?": "¿Necesitas revisar tu dispositivo?",
  "Book a free diagnosis and get clear next steps.": "Solicita un diagnóstico gratis y recibe pasos claros a seguir.",
  "Ready to start?": "¿Listo para empezar?",
  "Get a Quote · Free Diagnosis": "Solicitar cotización · Diagnóstico gratis",
  "Tell us what is wrong and get a": "Cuéntanos qué está mal y recibe un",
  "clear next step": "siguiente paso claro",
  "Share your device issue and DiazTech will follow up with a free diagnosis, practical recommendations,": "Comparte el problema de tu dispositivo y DiazTech responderá con diagnóstico gratis y recomendaciones prácticas,",
  "clear communication and no-pressure options.": "comunicación clara y opciones sin presión.",
  "No hidden steps": "Sin pasos ocultos",
  "Repair + upgrades + custom PCs": "Reparación + mejoras + PCs personalizadas",
  "Start request": "Iniciar solicitud",
  "View service area": "Ver área de servicio",
  "What happens next": "Qué pasa después",
  "Submit your issue details": "Envía los detalles de tu problema",
  "Receive free diagnosis feedback": "Recibe respuesta del diagnóstico gratis",
  "Review quote and approve your option": "Revisa la cotización y aprueba tu opción",
  "Send request now": "Enviar solicitud ahora",
  "Diagnosis first": "Diagnóstico primero",
  "Clear quote details": "Detalles de cotización claros",
  "Approval before repair": "Aprobación antes de reparar",
  "Device type (phone, tablet, laptop, desktop, or other)": "Tipo de dispositivo (teléfono, tablet, laptop, escritorio u otro)",
  "Problem details and when it started": "Detalles del problema y cuándo comenzó",
  "Any error messages shown": "Cualquier mensaje de error mostrado",
  "Whether you need repair, setup, or PC assembly help": "Si necesitas ayuda con reparación, configuración o armado de PC",
  "Free diagnosis is currently available while DiazTech grows.": "Actualmente hay diagnóstico gratis mientras DiazTech crece.",
  "Typical request flow": "Flujo típico de solicitud",
  "Submit form details": "Enviar datos del formulario",
  "Receive free diagnosis message": "Recibir mensaje de diagnóstico gratis",
  "Choose repair or upgrade option": "Elegir opción de reparación o mejora",
  "Where DiazTech currently serves": "Dónde atiende actualmente DiazTech",
  "DiazTech focuses on local service coverage shown on the map below. If you are near this area,": "DiazTech se enfoca en la cobertura local mostrada en el mapa. Si estás cerca de esta área,",
  "send your issue details and Angel will confirm availability and next steps.": "envía los detalles de tu problema y Angel confirmará disponibilidad y próximos pasos.",
  "Free diagnosis still available": "Diagnóstico gratis aún disponible",
  "Our promise": "Nuestra promesa",
  "You get honest diagnostics, a clear quote, and a respectful process from first message to final fix.": "Recibes diagnósticos honestos, una cotización clara y un proceso respetuoso desde el primer mensaje hasta la solución final.",
  "DiazTech is ready when you are.": "DiazTech está listo cuando tú lo estés.",
  "Submit your request now and get a free diagnosis response with practical options for repair,": "Envía tu solicitud ahora y recibe respuesta de diagnóstico gratis con opciones prácticas para reparación,",
  "troubleshooting, optimization, or custom PC support.": "diagnóstico, optimización o soporte para PC personalizada.",
  "Local, student-owned service": "Servicio local dirigido por un estudiante",
  "Clear communication throughout the process": "Comunicación clara durante todo el proceso",
  "No-pressure quote review before approval": "Revisión de cotización sin presión antes de aprobar",
  "Use the form above or browse services to describe your exact issue.": "Usa el formulario de arriba o explora servicios para describir tu problema exacto.",
  "Start quote request": "Iniciar solicitud de cotización",
  "Do you charge for diagnosis?": "¿Cobran por el diagnóstico?",
  "No. DiazTech currently offers free diagnosis so you can understand the issue first.": "No. DiazTech actualmente ofrece diagnóstico gratis para que entiendas el problema primero.",
  "What types of devices do you work on?": "¿Qué tipos de dispositivos trabajan?",
  "DiazTech can help with phones, tablets, laptops, desktops, gaming setups, and other everyday tech devices.": "DiazTech puede ayudar con teléfonos, tablets, laptops, computadoras, equipos gamer y otros dispositivos tecnológicos de uso diario.",
  "Can you help with custom PC assembly?": "¿Pueden ayudar con el armado de PC personalizada?",
  "Yes. DiazTech can help with part selection, compatibility guidance, assembly, and upgrade planning for custom PCs.": "Sí. DiazTech puede ayudar con selección de partes, compatibilidad, armado y planificación de mejoras para PCs personalizadas.",
  "Coverage snapshot": "Resumen de cobertura",
  "Phones, tablets & wearables": "Teléfonos, tablets y wearables",
  "Laptops & desktops": "Laptops y computadoras",
  "Gaming rigs & custom builds": "Equipos gamer y builds personalizadas",
  "Software, speed & connectivity": "Software, velocidad y conectividad",
  "Tell us what broke": "Cuéntanos qué falló",
  "Choose an option": "Elige una opción",
  "Approve the plan": "Aprueba el plan",
  "Nothing billable moves ahead until you understand the next step and agree to it.": "No se avanza con nada facturable hasta que entiendas el siguiente paso y estés de acuerdo.",
  "Send what you are seeing, the device type, and any error messages—screenshots welcome.": "Envía lo que estás viendo, el tipo de dispositivo y cualquier error. Las capturas son bienvenidas.",
  "The situation is reviewed and likely causes are explained in plain language.": "Se revisa la situación y se explican las causas probables en lenguaje simple.",
  "You receive a clear recommendation: repair, upgrade, tune-up, or leave it as-is.": "Recibes una recomendación clara: reparar, mejorar, optimizar o dejarlo como está.",
  "Whether it is a phone, tablet, laptop, desktop, or a custom PC, you get clear options before anything moves": "Ya sea teléfono, tablet, laptop, escritorio o PC personalizada, recibes opciones claras antes de que algo avance",
  "forward—no pressure, no surprises.": "sin presión ni sorpresas.",
  "Turnaround and final cost can vary by issue, but the process stays simple and transparent end to end.": "El tiempo de entrega y costo final pueden variar según el problema, pero el proceso se mantiene simple y transparente de principio a fin.",
  "See the work": "Ver el trabajo",
  "a tech repair and setup service focused on helping people with all kinds of devices and custom PC needs.": "un servicio de reparación y configuración tecnológica enfocado en ayudar a personas con todo tipo de dispositivos y PCs personalizadas.",
  "and a straightforward quote before any paid work begins.": "y una cotización clara antes de comenzar cualquier trabajo pagado.",
  "grows, I appreciate every message, question, referral, and piece of advice.": "crece, agradezco cada mensaje, pregunta, recomendación y consejo.",
  "take a look.": "revisarlo.",
  "up with options.": "con opciones.",
  "Approve before repair": "Aprueba antes de reparar",
  "Clear next steps before any work continues": "Pasos claros antes de continuar cualquier trabajo",
  "Clear quote provided before paid work begins": "Cotización clara antes de iniciar trabajo pagado",
  "Compatibility and budget recommendations": "Recomendaciones de compatibilidad y presupuesto",
  "Component seating and housing alignment checked before final close and post-repair testing.": "Se verifica la colocación de componentes y la alineación de carcasa antes del cierre final y pruebas posteriores.",
  "Cooling path and motherboard area inspected while verifying thermal and storage-related issues.": "Se inspeccionan la ruta de enfriamiento y la zona de la placa base mientras se verifican problemas térmicos y de almacenamiento.",
  "Custom PC part selection and assembly": "Selección de piezas y armado de PC personalizada",
  "Desktop": "Escritorio",
  "Desktop PC": "PC de escritorio",
  "Diagnosis cost ($)": "Costo de diagnóstico ($)",
  "Diagnosis first, always": "Diagnóstico primero, siempre",
  "Diagnostics": "Diagnóstico",
  "DiazTech primary service coverage area.": "Área principal de cobertura de servicio de DiazTech.",
  "Each repair photo represents one standard: do the work carefully, verify the result, and return devices with confidence.": "Cada foto de reparación representa un estándar: trabajar con cuidado, verificar resultados y devolver dispositivos con confianza.",
  "Error message diagnosis": "Diagnóstico de mensajes de error",
  "Explanations you can actually use": "Explicaciones que realmente puedes usar",
  "For the “something is off” problems that are hard to Google—DiazTech digs in with patience and clarity.": "Para esos problemas de “algo no está bien” que son difíciles de buscar en Google, DiazTech investiga con paciencia y claridad.",
  "Free diagnosis before paid work begins": "Diagnóstico gratis antes de empezar trabajo pagado",
  "From phones and tablets to laptops, desktops, and custom PC builds, every request is reviewed with": "Desde teléfonos y tablets hasta laptops, equipos de escritorio y PCs personalizadas, cada solicitud se revisa con",
  "Hands-on help for phones, tablets, laptops, desktops, and other personal tech that is not behaving.": "Ayuda práctica para teléfonos, tablets, laptops, computadoras y otra tecnología personal que no está funcionando bien.",
  "Hardware Setup": "Configuración de hardware",
  "Ideal when things feel sluggish, freeze often, or take forever to open apps and files.": "Ideal cuando todo se siente lento, se congela seguido o tarda demasiado en abrir apps y archivos.",
  "If your phone, tablet, laptop, desktop, or custom PC is acting unusual, send the details and DiazTech will follow": "Si tu teléfono, tablet, laptop, escritorio o PC personalizada está fallando, envía los detalles y DiazTech responderá",
  "If your phone, tablet, laptop, desktop, or custom PC is not working right, message DiazTech and I will gladly": "Si tu teléfono, tablet, laptop, escritorio o PC personalizada no funciona bien, envía un mensaje a DiazTech y con gusto",
  "If your phone, tablet, laptop, or desktop is acting up, share the issue and receive a straightforward plan before any paid work starts.": "Si tu teléfono, tablet, laptop o equipo de escritorio está fallando, comparte el problema y recibe un plan claro antes de empezar trabajo pagado.",
  "Internal frame, battery, and camera assembly exposed for targeted diagnostics and repair planning.": "Estructura interna, batería y módulo de cámara expuestos para diagnóstico dirigido y planificación de reparación.",
  "Internet and connectivity checks": "Revisión de internet y conectividad",
  "Laptop": "Laptop",
  "Memory upgrade completed with compatibility checks and configuration validation.": "Actualización de memoria completada con validación de compatibilidad y configuración.",
  "More speed, more storage, or a ground-up desktop—planned around your budget and how you use the machine.": "Más velocidad, más almacenamiento o un equipo desde cero, todo planificado según tu presupuesto y uso.",
  "Motherboard, cooling, and graphics components installed and cable-managed for stable performance.": "Placa base, enfriamiento y componentes gráficos instalados y organizados para un rendimiento estable.",
  "No jargon walls": "Sin barreras de tecnicismos",
  "No-pressure approval before work continues": "Aprobación sin presión antes de continuar",
  "Phone": "Teléfono",
  "Phones, tablets, laptops, desktops, and custom PC support": "Soporte para teléfonos, tablets, laptops, computadoras y PCs personalizadas",
  "Plain-language summary of what changed": "Resumen en lenguaje simple de lo que cambió",
  "RAM, SSD, and component upgrade guidance": "Guía para mejorar RAM, SSD y otros componentes",
  "Reassembly": "Reensamblaje",
  "Repair and upgrade options explained clearly": "Opciones de reparación y mejora explicadas claramente",
  "Send your issue details and DiazTech will follow up with a free diagnosis and practical options.": "Envía los detalles de tu problema y DiazTech dará seguimiento con diagnóstico gratis y opciones prácticas.",
  "Setup help and performance tuning after the build": "Ayuda de configuración y ajuste de rendimiento después del armado",
  "Smartphone": "Smartphone",
  "Software setup and stability review": "Configuración de software y revisión de estabilidad",
  "Software, setup, and connectivity checks": "Revisión de software, configuración y conectividad",
  "Startup app cleanup and tune-up": "Limpieza y ajuste de apps de inicio",
  "Startup, crash, and error troubleshooting": "Diagnóstico de inicio, bloqueos y errores",
  "Storage, update, and background process review": "Revisión de almacenamiento, actualizaciones y procesos en segundo plano",
  "System checks to improve everyday performance": "Revisiones del sistema para mejorar el rendimiento diario",
  "Tablet": "Tablet",
  "Teardown": "Desarme",
  "Upgrade": "Mejora",
  "Upgrades & custom PC assembly": "Mejoras y armado de PC personalizada",
  "before any repair work begins.": "antes de comenzar cualquier trabajo de reparación.",
  "free diagnosis": "diagnóstico gratis",
  "— Angel,": "— Angel,",
  "FAQ": "Preguntas frecuentes",
  "Hi everyone! My name is Angel, and I am a 17-year-old local student starting DiazTech,": "¡Hola a todos! Mi nombre es Angel y soy un estudiante local de 17 años que está iniciando DiazTech,",
  "I enjoy working with technology and helping people solve real problems. As DiazTech": "Me gusta trabajar con tecnología y ayudar a resolver problemas reales. Mientras DiazTech",
  "Honest guidance if parts or replacement make more sense": "Orientación honesta si conviene más reemplazar piezas o el equipo",
  "DiazTech. All rights reserved.": "DiazTech. Todos los derechos reservados.",
  "Send Request": "Enviar solicitud",
};

const I18N_ATTRIBUTE_ES = {
  "DiazTech Home": "Inicio de DiazTech",
  "Main navigation": "Navegación principal",
  Highlights: "Destacados",
  "Gallery highlights": "Destacados de la galería",
  "At a glance": "Resumen",
  "Quote page highlights": "Destacados de cotización",
  "What DiazTech covers": "Lo que cubre DiazTech",
  "What this gallery includes": "Lo que incluye esta galería",
  "Request timeline": "Cronograma de solicitud",
  "Service principles": "Principios del servicio",
  "Service standards": "Estándares del servicio",
  "Quote process standards": "Estándares del proceso de cotización",
  "DiazTech logo": "Logo de DiazTech",
  "DiazTech Instagram": "Instagram de DiazTech",
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
const I18N_TEXT_ES_ENTRIES = Object.entries(I18N_TEXT_ES).sort((a, b) => b[0].length - a[0].length);

const canonicalizeText = (value) =>
  normalizeText(value)
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createFlexiblePattern = (source) => {
  let pattern = escapeRegex(source);
  pattern = pattern.replace(/\\\s\+/g, "\\\\s+");
  pattern = pattern.replace(/\s+/g, "\\\\s+");
  pattern = pattern.replace(/['’‘]/g, "['’‘]");
  pattern = pattern.replace(/["“”]/g, '["“”]');
  pattern = pattern.replace(/[-–—]/g, "[-–—]");
  return new RegExp(pattern, "gi");
};

const I18N_TEXT_ES_CANONICAL = new Map(
  I18N_TEXT_ES_ENTRIES.map(([source, target]) => [canonicalizeText(source), target])
);

const I18N_TEXT_ES_PATTERNS = I18N_TEXT_ES_ENTRIES.map(([source, target]) => ({
  target,
  pattern: createFlexiblePattern(source),
}));

const safeStorageGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (_error) {
    return null;
  }
};

const safeStorageSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (_error) {
    // Ignore storage write failures (private mode / blocked storage).
  }
};

const getLanguageFromUrl = () => {
  const langParam = new URLSearchParams(window.location.search).get("lang");
  return langParam === "es" || langParam === "en" ? langParam : null;
};

const setLanguageInUrl = (language) => {
  const url = new URL(window.location.href);
  if (language === "es") {
    url.searchParams.set("lang", "es");
  } else {
    url.searchParams.delete("lang");
  }
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
};

const updateInternalLanguageLinks = (language) => {
  document.querySelectorAll('a[href]').forEach((link) => {
    const rawHref = link.getAttribute("href");
    if (!rawHref) return;
    if (rawHref.startsWith("#")) return;
    if (rawHref.startsWith("mailto:")) return;
    if (rawHref.startsWith("tel:")) return;
    if (rawHref.startsWith("javascript:")) return;

    const targetUrl = new URL(rawHref, window.location.href);
    if (targetUrl.origin !== window.location.origin) return;
    if (!targetUrl.pathname.endsWith(".html")) return;

    if (language === "es") {
      targetUrl.searchParams.set("lang", "es");
    } else {
      targetUrl.searchParams.delete("lang");
    }

    link.setAttribute("href", `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`);
  });
};

const translateNormalized = (value, entries) => {
  let output = value;
  entries.forEach(([source, translated]) => {
    if (!source || output.indexOf(source) === -1) return;
    output = output.split(source).join(translated);
  });
  return output;
};

const translateFlexible = (value) => {
  let output = value;
  I18N_TEXT_ES_PATTERNS.forEach(({ pattern, target }) => {
    output = output.replace(pattern, target);
  });
  return output;
};

const getInitialTheme = () => {
  const savedTheme = safeStorageGet(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }
  return prefersDarkScheme.matches ? "dark" : "light";
};

const getInitialLanguage = () => {
  const urlLanguage = getLanguageFromUrl();
  if (urlLanguage) {
    return urlLanguage;
  }

  const savedLanguage = safeStorageGet(LANGUAGE_STORAGE_KEY);
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

    if (activeLanguage === "es") {
      const leadingSpace = originalText.match(/^\s+/)?.[0] || "";
      const trailingSpace = originalText.match(/\s+$/)?.[0] || "";

      const directTranslation = I18N_TEXT_ES[normalized];
      if (directTranslation) {
        textNode.textContent = leadingSpace + directTranslation + trailingSpace;
        return;
      }

      const canonicalTranslation = I18N_TEXT_ES_CANONICAL.get(canonicalizeText(normalized));
      if (canonicalTranslation) {
        textNode.textContent = leadingSpace + canonicalTranslation + trailingSpace;
        return;
      }

      // Fallback for wrapped/multi-line text nodes where phrases are split by formatting whitespace.
      const normalizedReplacement = translateNormalized(normalized, I18N_TEXT_ES_ENTRIES);
      if (normalizedReplacement !== normalized) {
        textNode.textContent = leadingSpace + normalizedReplacement + trailingSpace;
        return;
      }

      const flexibleReplacement = translateFlexible(originalText);
      if (flexibleReplacement !== originalText) {
        textNode.textContent = flexibleReplacement;
        return;
      }
    }

    textNode.textContent = originalText;
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
  setLanguageInUrl(language);
  updateInternalLanguageLinks(language);
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
    safeStorageSet(THEME_STORAGE_KEY, nextTheme);
    syncThemeToggleLabel();
  });

  languageToggle.addEventListener("click", () => {
    const nextLanguage = activeLanguage === "en" ? "es" : "en";
    applyLanguage(nextLanguage);
    safeStorageSet(LANGUAGE_STORAGE_KEY, nextLanguage);
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
    const savedTheme = safeStorageGet(THEME_STORAGE_KEY);
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
