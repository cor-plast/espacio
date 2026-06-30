const articleSlug = document.body.dataset.article;
const target = document.getElementById('article-content');

async function loadArticle() {
  try {
    const response = await fetch(`../contenido/${articleSlug}.txt`);
    if (!response.ok) throw new Error('Archivo no encontrado');
    const text = await response.text();
    target.innerHTML = renderMarkdownWithBlocks(text);
  } catch (error) {
    target.innerHTML = '<p>No se pudo cargar el artículo.</p>';
  }
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function renderMarkdownWithBlocks(markdown) {
  let html = escapeHtml(markdown);

  html = html.replace(/:::reflexion\n([\s\S]*?)\n:::/g, (_, content) => `
    <aside class="custom-block reflection">
      <span>🌿 Reflexión</span>
      <p>${content.trim().replace(/\n/g, '<br>')}</p>
    </aside>
  `);

  html = html.replace(/:::ejercicio\n([\s\S]*?)\n:::/g, (_, content) => `
    <aside class="custom-block exercise">
      <span>📝 Ejercicio práctico</span>
      <p>${content.trim().replace(/\n/g, '<br>')}</p>
    </aside>
  `);

  html = html.replace(/:::video\n([\s\S]*?)\n:::/g, (_, content) => `
    <div class="video-box">
      <iframe src="${content.trim()}" title="Video" allowfullscreen loading="lazy"></iframe>
    </div>
  `);

  html = html.replace(/:::reserva\n([\s\S]*?)\n:::/g, (_, content) => `
    <aside class="custom-block booking">
      <h3>Reservá una sesión</h3>
      <p>${content.trim().replace(/\n/g, '<br>')}</p>
      <a class="button" href="mailto:fernandoarielcb1@gmail.com">Consultar disponibilidad</a>
    </aside>
  `);

  html = html
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>');

  html = html.split(/\n\n+/).map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<aside') || trimmed.startsWith('<div')) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  return html;
}

loadArticle();
