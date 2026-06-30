WEB MÍNIMA CON BLOG ESTÁTICO PARA GITHUB PAGES

Cómo probar:
1. Subí todo el contenido de esta carpeta a tu repositorio o a la carpeta /prueba/.
2. Entrá a index.html.
3. Luego abrí Blog.

Cómo crear un nuevo artículo:
1. Duplicá uno de estos HTML:
   blog/ansiedad-y-calma.html
2. Cambiale:
   - title
   - meta description
   - canonical
   - Open Graph
   - Schema Article
   - el atributo data-article del body
   - el h1 visible
3. Creá el contenido en:
   contenido/nombre-del-articulo.txt
4. Agregá el artículo a blog.json.
5. Sumá la URL al sitemap.xml.

Bloques disponibles dentro del .txt:

:::reflexion
Texto de la reflexión.
:::

:::ejercicio
Texto del ejercicio.
:::

:::video
https://www.youtube.com/embed/ID_DEL_VIDEO
:::

:::reserva
Texto de llamada a la acción.
:::

Importante:
- El archivo .txt es público, pero no es inseguro. Solo contiene el texto del artículo.
- No pongas contraseñas, datos privados ni información interna en /contenido/.
- Para uso real, reemplazá https://tudominio.com por tu dominio verdadero.
