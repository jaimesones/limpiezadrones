"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const quoteForm = document.querySelector("#quote-form");
const formStatus = document.querySelector("#form-status");
const submissionSuccess = document.querySelector("#submission-success");

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
  const fields = [...quoteForm.querySelectorAll("input:not([type='hidden']):not([name='_gotcha']), select, textarea")];

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

  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (quoteForm.action.endsWith("/TU_FORM_ID")) {
      formStatus.textContent = "El formulario todavía no está conectado. Configura primero el endpoint de Formspree; consulta las instrucciones del proyecto.";
      formStatus.classList.add("is-error");
      return;
    }

    if (!quoteForm.checkValidity()) {
      const invalidFields = fields.filter((field) => !field.validity.valid);
      invalidFields.forEach((field) => field.setAttribute("aria-invalid", "true"));
      formStatus.textContent = "Revisa los campos marcados. Comprueba el formato del correo y completa los datos obligatorios.";
      formStatus.classList.add("is-error");
      invalidFields[0]?.focus();
      return;
    }

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando solicitud...";
    }
    formStatus.textContent = "Enviando tu solicitud...";
    formStatus.classList.remove("is-error");
    formStatus.classList.add("is-pending");

    try {
      const response = await fetch(quoteForm.action, {
        method: "POST",
        body: new FormData(quoteForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        let errorMessage = "Formspree no ha aceptado la solicitud.";
        try {
          const result = await response.json();
          if (Array.isArray(result.errors) && result.errors.length > 0) {
            errorMessage = result.errors
              .map((error) => error.message)
              .filter(Boolean)
              .join(" ");
          }
        } catch {
          // Use the generic message when the provider response is not JSON.
        }
        throw new Error(errorMessage);
      }

      quoteForm.reset();
      fields.forEach((field) => field.removeAttribute("aria-invalid"));
      formStatus.textContent = "";
      formStatus.classList.remove("is-error", "is-pending");

      if (submissionSuccess instanceof HTMLElement) {
        submissionSuccess.textContent = "¡Solicitud enviada! Formspree la ha aceptado. Gracias por contactar con EcoSkyClean Madrid.";
        submissionSuccess.hidden = false;
        window.location.hash = "inicio";
        submissionSuccess.focus({ preventScroll: true });
      } else {
        formStatus.textContent = "Formspree ha aceptado la solicitud.";
      }
    } catch (error) {
      const detail = error instanceof Error ? ` ${error.message}` : "";
      formStatus.textContent = `No se pudo confirmar el envío. Tus datos siguen en el formulario; inténtalo de nuevo.${detail}`;
      formStatus.classList.remove("is-pending");
      formStatus.classList.add("is-error");
    } finally {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Enviar solicitud <span aria-hidden="true">↗</span>';
      }
    }
  });
}
