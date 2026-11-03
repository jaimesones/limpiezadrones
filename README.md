# EcoSkyClean Madrid

Landing page estática, creada con HTML, CSS y JavaScript sin frameworks ni pasos de compilación. El nombre comercial es provisional; comprueba su disponibilidad como marca y dominio antes de utilizarlo comercialmente.

## Abrir la web

Abre `index.html` directamente en un navegador o usa la opción **Open with Live Server** si ya tienes esa extensión. No es necesario instalar dependencias ni ejecutar un proceso de build. Para revisar el formulario, sirve la carpeta mediante HTTP(S), ya que los proveedores externos pueden no aceptar envíos desde `file://`.

## Archivos

- `index.html`: contenido, navegación y formulario de presupuesto.
- `styles.css`: identidad visual, diseño responsive, estados de foco y movimiento reducido.
- `script.js`: menú móvil, selección del servicio, validación y estado de envío.
- `politica-privacidad.html`: borrador no definitivo del aviso de privacidad enlazado desde el formulario.

## Personalización

- **Textos:** modifica los elementos de `index.html`.
- **Colores y tipografía:** ajusta las variables al principio de `styles.css`. Las fuentes DM Sans y Manrope se cargan desde Google Fonts; si no hay conexión, se usan fuentes del sistema.
- **Imágenes:** reemplaza las URL de Unsplash en `index.html` por imágenes propias o recursos con licencia adecuada. Las fotos actuales son ilustrativas y no representan trabajos de EcoSkyClean Madrid. Si no cargan, queda un fondo de color como alternativa.
- **Contacto y ubicación:** añade únicamente datos reales y confirma el área de servicio antes de publicar.

## Activar el envío con FormSubmit

1. En `index.html`, busca `action="https://formsubmit.co/TU_CORREO@EJEMPLO.COM"` y sustituye **solo** `TU_CORREO@EJEMPLO.COM` por la dirección real que recibirá las solicitudes. No introduzcas credenciales ni claves.
2. Publica el sitio o sírvelo desde una URL HTTPS accesible y envía una solicitud de prueba usando una dirección que puedas consultar.
3. En el primer envío, FormSubmit puede enviar un mensaje de activación/confirmación a la dirección de destino. Abre ese correo y confirma la activación siguiendo las instrucciones del proveedor.
4. Vuelve a enviar el formulario y comprueba la respuesta final de FormSubmit y la recepción del mensaje en la bandeja de entrada y spam. El formulario utiliza envío HTML convencional: el navegador muestra la respuesta real del proveedor. La página no anuncia éxito por adelantado ni usa `fetch`.
5. Si el proveedor muestra un error, regresa a la página para corregir los datos e intentarlo de nuevo. La navegación del formulario puede hacer que el navegador conserve los valores al volver atrás; comprueba este comportamiento en el navegador que vayas a utilizar.

El asunto del mensaje está configurado como **Nueva solicitud de presupuesto - EcoSkyClean Madrid**. Los campos se envían con nombres legibles y el campo `email` permite a FormSubmit utilizar el correo del cliente para responder. El formato de mensaje está configurado como tabla. Se conserva activada la protección CAPTCHA predeterminada y se incluye un campo honeypot; no se ha desactivado la protección antispam.

FormSubmit es un proveedor externo gratuito con sus propias condiciones, disponibilidad y tratamiento de datos. El envío depende de su servicio y de la activación de la dirección receptora; la página estática no puede garantizar la entrega. Si necesitas controlar la entrega, privacidad o disponibilidad, evalúa un proveedor de formularios alternativo o un backend propio y configura su integración segura. No insertes claves secretas en el código público.

## Privacidad y preparación para publicar

`politica-privacidad.html` es solo un borrador de estructura. Antes de publicar, completa y revisa la información legal real, incluyendo:

- identidad o razón social, NIF, domicilio y datos de contacto del responsable;
- finalidad y base jurídica del tratamiento, conservación, destinatarios y derechos de las personas;
- información y garantías aplicables al proveedor FormSubmit, incluidos posibles tratamientos o transferencias internacionales;
- política de privacidad definitiva, aviso legal y cualquier otra información exigible para la actividad y el sitio.

El formulario recoge datos personales. Revisa la normativa aplicable y las condiciones de FormSubmit antes de activarlo. No añadas una finalidad publicitaria ni utilices estos datos para publicidad no solicitada. El borrador de privacidad no sustituye una revisión legal.

## Publicación estática

Sube los archivos de esta carpeta a un alojamiento estático que admita HTML, CSS y JavaScript (por ejemplo, un hosting web estático o un proveedor de páginas estáticas) y configura HTTPS. No hace falta compilar. Después de publicar, prueba navegación, diseño móvil y el flujo real de FormSubmit, incluida la confirmación inicial del correo.
