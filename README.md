# Nivel Nani

Mi app tipo videojuego para cumplir hábitos y metas, ganar monedas, subir de nivel y canjear premios reales.

## Cómo abrirla

Abre `index.html` en el navegador (doble clic). No hay que instalar nada: es un solo archivo con HTML, CSS y JavaScript.

## Cómo publicarla con GitHub Pages

1. En GitHub, crea un repositorio público llamado `nivel-nani`.
2. Sube todos los archivos de esta carpeta con "uploading an existing file" y haz el commit.
3. Ve a Settings → Pages. En "Source" elige "Deploy from a branch", luego la rama `main` y la carpeta `/ (root)`, y guarda.
4. Espera unos minutos. Queda en `https://TU-USUARIO.github.io/nivel-nani/`.
5. En el celular, ábrela en Chrome y en el menú ⋮ elige "Instalar app" o "Agregar a la pantalla principal".

## Cuando cambies algo

`sw.js` guarda la app en el celular para que abra sin internet. Cada vez que subas cambios, aumenta el número de `VERSION` en `sw.js` (por ejemplo, de `nivel-nani-v1` a `nivel-nani-v2`) para que el celular baje la versión nueva.

## Qué cambia frente a la versión de Claude

Funciona todo, menos dos cosas:

- **Guardado:** el progreso se guarda en el navegador donde la abras. No se sincroniza entre el celular y el computador, y si borras los datos del navegador, se borra.
- **Coach con IA:** dentro de Claude, el coach usa tu cuenta. Aquí hay que conectarlo a la API de Claude, y eso necesita un pequeño servidor: la clave de la API nunca puede ir dentro del HTML, porque cualquiera que abra la página la podría ver.

La app arranca con mi progreso del 4 de noviembre de 2026 (misiones, premios y mis 3 metas). Desde ahí, esta copia y la app de Claude son independientes.

## Ideas para practicar

Van en orden con mi meta "Aprender Git, SQL y JavaScript":

1. **Git:** subir esta carpeta a un repositorio de GitHub y hacer un commit por cada cambio.
2. **JavaScript:** cambiar algo pequeño, como las frases de felicitación (`PHRASES`) o los rangos de nivel (`RANKS`).
3. **JavaScript:** agregar una pestaña de gastos.
4. **SQL:** guardar el progreso en una base de datos real en vez del navegador.
5. **Proyecto final:** un servidor pequeño que conecte el coach con la API de Claude.
