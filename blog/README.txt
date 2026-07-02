BLOG ESTÁTICO COMPLETO PARA GITHUB PAGES

ESTRUCTURA:
- index.html: inicio
- blog/index.html: listado del blog
- blog/ansiedad-y-calma.html: artículo con SEO propio
- blog/mindfulness-cotidiano.html: artículo con SEO propio
- blog.json: listado de artículos y datos de cada tarjeta
- contenido/*.txt: contenido editable del artículo en formato Markdown simple
- img/: imágenes de tarjetas y portada
- assets/css/style.css: diseño
- assets/js/blog-list.js: carga las tarjetas del blog
- assets/js/markdown-renderer.js: convierte los .txt en contenido visual

CÓMO CREAR UN ARTÍCULO NUEVO:
1. Duplicá un HTML dentro de /blog/.
2. Cambiá title, meta description, canonical, og:image, schema y el h1.
3. Cambiá en el body: data-article="nombre-del-articulo".
4. Creá /contenido/nombre-del-articulo.txt.
5. Agregá el artículo en blog.json.
6. Sumá la URL al sitemap.xml.

BLOQUES DISPONIBLES EN LOS .TXT:

:::reflexion
Texto de reflexión.
:::

:::ejercicio
Texto del ejercicio.
:::

:::frase
Frase destacada.
:::

:::video
https://www.youtube.com/embed/ID_DEL_VIDEO
:::

:::reserva
Texto de llamada a la acción.
:::

IMPORTANTE:
- Los archivos .txt son públicos, como cualquier contenido de una web.
- No guardes contraseñas ni datos privados en /contenido/.
- Para uso real, reemplazá https://tudominio.com por tu dominio.
- Si lo subís dentro de /prueba/, mantené la estructura completa dentro de esa carpeta.
