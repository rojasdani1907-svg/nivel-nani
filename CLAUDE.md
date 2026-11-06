# Nivel Nani

App personal de Nani, tipo videojuego, para cumplir hábitos y metas. Cada misión o paso cumplido da monedas y XP; las monedas se canjean por premios reales. La interfaz está en español colombiano, con un tono cálido y casual.

## Cómo trabajar con Nani

Nani está aprendiendo Git, SQL y JavaScript, y quiere entender el código, no solo cambiarlo. Explícale en español y con palabras sencillas qué cambiaste y por qué. Si un cambio es grande, propón un plan corto antes de hacerlo.

## Estructura

- La app vive en `index.html`: HTML, CSS y JavaScript sin frameworks ni build.
- Es una app web instalable (PWA) publicada con GitHub Pages: `manifest.webmanifest` (nombre, colores, íconos), `sw.js` (service worker que guarda los archivos para abrir sin internet) y los íconos `icon-*.png` y `apple-touch-icon.png`. Todas las rutas son relativas porque el sitio vive en `/nivel-nani/`.
- Siempre que cambies cualquier archivo de la app, sube el número de `VERSION` en `sw.js`. Si agregas un archivo nuevo, inclúyelo en `ARCHIVOS`.
- Pestañas: Hoy (misiones diarias, racha, cofre), Metas (metas grandes por etapas y pasos), Tienda (premios) y Coach (chat con IA).
- Diseño móvil primero, con una columna de máximo 560px y la barra de pestañas fija abajo.
- Los colores son tokens CSS en `:root`, con versión oscura en `prefers-color-scheme: dark` y `[data-theme="dark"]`. Un color nuevo se agrega como token en los tres bloques.

## Estado

- Un solo objeto `state`: `{ v, name, missions[], rewards[], metas[], log, chests, redeemed[] }`.
  - `log` es `{ "AAAA-MM-DD": { idMision: monedas } }`.
  - Cada meta tiene `stages[]`, y cada etapa tiene `steps[]` con `{ id, text, coins, done }`. `done` es la fecha en que se cumplió, o `null`.
- Monedas, XP, nivel y racha no se guardan: `stats()` los calcula desde `state`.
- Para cambiar datos: se modifica `state` y se llama `commit()`, que guarda y vuelve a dibujar. `normalize()` valida lo que se carga.
- Las fechas son locales, con `dayKey()` y `todayKey()`.
- El progreso se guarda en `localStorage`, con la clave `nivel-nani-estado`. `INICIO` es el progreso con el que arrancó esta copia.

## Partes que vienen de claude.ai

La app nació como artifact de claude.ai. Por eso llama a `window.claude.use("db")` (guardado en la cuenta) y a `window.claude.use("sample")` (coach). Fuera de claude.ai no existen: la app guarda en `localStorage` y desactiva el coach. Se pueden quitar sin romper nada.

Para conectar el coach aquí se necesita un backend que llame a la API de Anthropic con la clave en el servidor, nunca en el HTML. Las funciones del coach son:

- `coachContext()`: arma el contexto que recibe la IA.
- `ask()`: maneja el chat.
- `genPlan()`: pide planes de metas en JSON. `cleanPlan()` los valida.

## Reglas

- Los textos que escribe el usuario se ponen con `textContent`, nunca con `innerHTML`.
- Todo texto nuevo de la interfaz va en español.
- Después de cambiar el JavaScript, revisa que la página abra sin errores en la consola.
