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
- **Imágenes:** reemplaza las URL de imágenes en `index.html` por imágenes propias o recursos con licencia adecuada. La foto principal muestra paneles fotovoltaicos sobre tejados de teja y se atribuye a Marta Victoria (CC BY-SA 4.0) discretamente en el pie de página. Las fotos son ilustrativas y no representan trabajos de EcoSkyClean Madrid. Si no cargan, queda un fondo de color como alternativa.
- **Contacto y ubicación:** añade únicamente datos reales y confirma el área de servicio antes de publicar.

## Activar el envío con Formspree

El formulario envía por `fetch` (POST con respuesta JSON) al endpoint de Formspree. No requiere backend propio, paquetes ni API keys en el navegador. Cuando Formspree responde con éxito, se limpian los campos y se vuelve al inicio con un aviso visible. Si el servicio devuelve un error o la conexión falla, el formulario conserva los datos y permite reintentarlo.

1. Crea o inicia sesión en [Formspree](https://formspree.io/), y verifica tu dirección de correo.
2. Usa este [enlace de configuración de Formspree](https://formspree.io/claim?name=EcoSkyClean%20Madrid%20-%20Presupuestos&field.email=email,required&field.Nombre=text,required&field.Empresa=text&field.Tel%C3%A9fono=text&field.Tipo%20de%20servicio=text,required&field.Superficie%20aproximada%20%28m%C2%B2%29=numeric&field.Ubicaci%C3%B3n%20de%20la%20instalaci%C3%B3n=text,required&field.Mensaje=text,required,maxlength:3000) para iniciar la creación del formulario con sus campos. Inicia sesión si te lo solicita y confirma la creación.
3. En el panel de Formspree, establece tu correo como destino de las notificaciones y copia el endpoint que aparece en **Integration**. Tendrá el formato `https://formspree.io/f/FORM_ID`.
4. En `index.html`, sustituye `https://formspree.io/f/TU_FORM_ID` en el atributo `action` por ese endpoint.
5. Despliega de nuevo el sitio en Cloudflare Pages y envía una prueba válida. Verifica que Formspree la acepte, que la solicitud aparezca en el panel y que llegue la notificación a tu correo (incluida la carpeta de spam). El mensaje de éxito aparece únicamente cuando la respuesta HTTP de Formspree indica que aceptó la solicitud; esto no garantiza por sí solo la entrega a la bandeja de entrada.

No puedo crear ni adivinar el endpoint desde el código: Formspree lo genera dentro de tu cuenta, después de que confirmes el formulario. Mientras `TU_FORM_ID` siga en `index.html`, el script bloquea el envío y avisa que falta configurar el endpoint.

El asunto está configurado como **Nueva solicitud de presupuesto - EcoSkyClean Madrid**; el email del visitante se envía en el campo `email` para que se pueda responder. El formulario incluye el campo trampa `_gotcha` y utiliza el filtrado antispam de Formspree. No se ha añadido una API key ni se desactivan las protecciones del proveedor. El envío AJAX requiere que Formspree permita el origen del sitio publicado; comprueba la configuración de dominios/orígenes si el navegador informa un error CORS.

El endpoint es un marcador hasta que lo sustituyas por el tuyo; mientras siga así, el JavaScript impide el envío y avisa que falta configurarlo. La página no simula un envío correcto. Para solucionar errores, revisa el endpoint y los envíos/errores en el panel de Formspree. Los límites, planes, funciones antispam, disponibilidad y tratamiento de datos dependen del servicio y pueden cambiar: consulta sus condiciones y privacidad antes de usarlo en producción.

## Privacidad y preparación para publicar

`politica-privacidad.html` es solo un borrador de estructura. Antes de publicar, completa y revisa la información legal real, incluyendo:

- identidad o razón social, NIF, domicilio y datos de contacto del responsable;
- finalidad y base jurídica del tratamiento, conservación, destinatarios y derechos de las personas;
- información y garantías aplicables al proveedor Formspree, incluidos posibles tratamientos o transferencias internacionales;
- política de privacidad definitiva, aviso legal y cualquier otra información exigible para la actividad y el sitio.

El formulario recoge datos personales. Revisa la normativa aplicable y las condiciones de Formspree antes de activarlo. No añadas una finalidad publicitaria ni utilices estos datos para publicidad no solicitada. El borrador de privacidad no sustituye una revisión legal.

## Publicación estática

Sube los archivos de esta carpeta a un alojamiento estático que admita HTML, CSS y JavaScript (por ejemplo, un hosting web estático o un proveedor de páginas estáticas) y configura HTTPS. No hace falta compilar. Después de publicar, prueba navegación, diseño móvil y el envío real a tu endpoint de Formspree, incluyendo el retorno al inicio y el borrado del formulario tras una respuesta aceptada.
