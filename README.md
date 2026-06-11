# Otaku Zen Vibes — Premium Website V2

Esta versión ajusta la página para acercarla más a la estética real del canal de YouTube:

- Fondo negro premium.
- Rosa neón, azul eléctrico, violeta y acentos tipo club/anime.
- Hero inspirado en el banner actual.
- Video principal de YouTube integrado en el inicio.
- Sección de últimos videos preparada para mostrar los 3 últimos uploads.
- Textos de marca incorporados.
- Merch tratada como extensión de marca, no como tienda genérica.

## Cómo actualizar el repositorio

1. Copia estos archivos sobre tu repositorio actual.
2. No agregues todavía `CNAME` si solo quieres ver la versión de prueba en GitHub Pages.
3. Haz commit.
4. Haz push.
5. Revisa la página en:

```txt
https://gasalanava.github.io/Otaku-Zen-Vibes/
```

## Video principal

El video destacado está en `index.html`:

```html
https://www.youtube.com/embed/CGwweLARPCg?rel=0&modestbranding=1
```

## Últimos 3 videos automáticos

En `script.js` existe esta línea:

```js
youtubeChannelId: "",
```

Para que el mosaico se actualice automáticamente con los últimos 3 videos, debes poner allí el Channel ID real de YouTube. Debe empezar por `UC`.

Ejemplo:

```js
youtubeChannelId: "UCxxxxxxxxxxxxxxxxxxxxxx",
```

El handle `@OtakuZenVibes` no siempre sirve para leer el feed RSS. YouTube usa el Channel ID para este feed:

```txt
https://www.youtube.com/feeds/videos.xml?channel_id=UC...
```

Mientras ese dato esté vacío, el sitio muestra un fallback elegante con enlaces al canal y al video destacado.

## Cuando conectes el dominio real

Antes de conectar `otakuzenvibes.com`, cambia en `index.html` estas URLs:

```html
https://gasalanava.github.io/Otaku-Zen-Vibes/
```

por:

```html
https://otakuzenvibes.com/
```

Luego sí puedes volver a crear el archivo `CNAME` con:

```txt
otakuzenvibes.com
```
