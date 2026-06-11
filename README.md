# Otaku Zen Vibes — Premium Static Website

Primera versión de landing page premium para reemplazar la página hecha en Canva y publicarla desde GitHub Pages.

## Qué incluye

- `index.html`: estructura semántica de la página.
- `styles.css`: diseño premium responsive, sin frameworks.
- `script.js`: menú móvil, efecto de header y revelado suave.
- `assets/favicon.svg`: ícono básico de marca.
- `assets/og-image.png`: imagen social para WhatsApp, Facebook, X y previsualizaciones.
- `CNAME`: preparado para `otakuzenvibes.com`.
- `.nojekyll`: evita que GitHub Pages procese el sitio con Jekyll.

## Enfoque de marca

La página se organiza así:

1. Otaku Zen Vibes como marca musical.
2. YouTube como destino principal.
3. Vibes o mundos musicales.
4. Merch como extensión premium de la marca.
5. About y cierre emocional.

## Cómo subirlo a GitHub

1. Crea un repositorio nuevo, por ejemplo: `otakuzenvibes-web`.
2. Sube todos estos archivos a la raíz del repositorio.
3. En GitHub entra a `Settings > Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Selecciona la rama `main` y carpeta `/root`.
6. Guarda.

## Dominio

El archivo `CNAME` contiene:

```txt
otakuzenvibes.com
```

Si vas a usar `www.otakuzenvibes.com`, cambia el contenido de `CNAME` por:

```txt
www.otakuzenvibes.com
```

Recomendación práctica: usa primero el dominio raíz `otakuzenvibes.com`, y luego configura redirección o DNS para `www`.

## Ajustes pendientes

- Reemplazar los links `Coming soon` de la sección merch por los enlaces reales de compra.
- Agregar Instagram, TikTok o Spotify si quieres llevar tráfico a más plataformas.
- Si tienes logo oficial en PNG o SVG, sustituir el círculo `OZV` por el logo real.
- Cambiar `og-image.png` por una imagen definitiva de marca si luego generamos una visual más potente.

## Publicación recomendada

El sitio está listo para GitHub Pages sin procesos de compilación. No usa React, Vite ni dependencias. Esto reduce errores y facilita que puedas copiar, pegar, subir y publicar.
