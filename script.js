"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const quoteForm = document.querySelector("#quote-form");
const formStatus = document.querySelector("#form-status");

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const service = document.querySelector("#service");
    if (!service) return;
    service.value = link.dataset.service === "solar"
      ? "Limpieza de placas solares"
      : "Limpieza de fachadas";
  });
});

document.querySelectorAll(".image-frame img").forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("image-unavailable");
  }, { once: true });
});

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

if (quoteForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
  const submitButton = quoteForm.querySelector('button[type="submit"]');
  const fields = [...quoteForm.querySelectorAll("input:not([type='hidden']):not([name='_honey']), select, textarea")];

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      field.removeAttribute("aria-invalid");
      if (quoteForm.checkValidity()) {
        formStatus.textContent = "";
        formStatus.classList.remove("is-error");
      }
    });
    field.addEventListener("change", () => field.removeAttribute("aria-invalid"));
  });

  quoteForm.addEventListener("submit", (event) => {
    if (!quoteForm.checkValidity()) {
      event.preventDefault();
      const invalidFields = fields.filter((field) => !field.validity.valid);
      invalidFields.forEach((field) => field.setAttribute("aria-invalid", "true"));
      formStatus.textContent = "Revisa los campos marcados. Comprueba el formato del correo y completa los datos obligatorios.";
      formStatus.classList.add("is-error");
      invalidFields[0]?.focus();
      return;
    }

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando solicitud…";
    }
    formStatus.textContent = "Enviando a FormSubmit. Espera la respuesta del servicio: esta página no confirmará la recepción por adelantado. Si aparece un error, vuelve a esta página para revisar los datos e intentarlo de nuevo.";
    formStatus.classList.remove("is-error");
    formStatus.classList.add("is-pending");
  });
}
