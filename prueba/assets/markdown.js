function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: markdown };

  const meta = {};
  match[1].split('\n').forEach(line => {
    const index = line.indexOf(':');
    if (index > -1) {
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      meta[key] = value;
    }
  });

  return { meta, body: match[2] };
}

function renderCustomBlocks(text) {
  return text
    .replace(/:::reflexion\n([\s\S]*?)\n:::/g, (_, content) => `
      <div class="custom-block reflection">
        <span class="block-label">Reflexión</span>
        <p>${escapeHtml(content.trim())}</p>
      </div>
    `)
    .replace(/:::ejercicio\n([\s\S]*?)\n:::/g, (_, content) => {
      const items = content.trim().split('\n').filter(Boolean).map(item => `<li>${escapeHtml(item)}</li>`).join('');
      return `
        <div class="custom-block exercise">
          <span class="block-label">Ejercicio práctico</span>
          <ol>${items}</ol>
        </div>
      `;
    })
    .replace(/:::video\n([\s\S]*?)\n:::/g, (_, content) => {
      const url = content.trim();
      const idMatch = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]+)/);
      const id = idMatch ? idMatch[1] : '';
      return `
        <div class="custom-block video-block">
          <span class="block-label">Video</span>
          ${id ? `<iframe src="https://www.youtube.com/embed/${id}" title="Video" allowfullscreen></iframe>` : `<p>URL de video no válida.</p>`}
        </div>
      `;
    })
    .replace(/:::reserva\n?:::/g, `
      <div class="custom-block booking">
        <span class="block-label">Sesión personalizada</span>
        <h3>¿Querés trabajar este tema en una sesión?</h3>
        <p>Podés reservar un encuentro online para profundizar en tu proceso personal.</p>
        <a class="button" href="mailto:tuemail@ejemplo.com">Reservar sesión</a>
      </div>
    `);
}

function renderMarkdown(markdown) {
  let html = renderCustomBlocks(markdown);
  const lines = html.split('\n');
  let output = '';
  let inList = false;

  lines.forEach(rawLine => {
    const line = rawLine.trim();

    if (!line) {
      if (inList) {
        output += '</ul>';
        inList = false;
      }
      return;
    }

    if (line.startsWith('<div') || line.startsWith('<span') || line.startsWith('<ol') || line.startsWith('<iframe') || line.startsWith('</') || line.startsWith('<p>') || line.startsWith('<h3>') || line.startsWith('<a ')) {
      if (inList) {
        output += '</ul>';
        inList = false;
      }
      output += rawLine;
      return;
    }

    if (line.startsWith('# ')) {
      output += `<h2>${escapeHtml(line.slice(2))}</h2>`;
    } else if (line.startsWith('## ')) {
      output += `<h3>${escapeHtml(line.slice(3))}</h3>`;
    } else if (line.startsWith('> ')) {
      output += `<blockquote>${escapeHtml(line.slice(2))}</blockquote>`;
    } else if (line.startsWith('- ')) {
      if (!inList) {
        output += '<ul>';
        inList = true;
      }
      output += `<li>${escapeHtml(line.slice(2))}</li>`;
    } else if (line.startsWith('![')) {
      const img = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (img) output += `<img src="${img[2]}" alt="${escapeHtml(img[1])}">`;
    } else {
      output += `<p>${escapeHtml(line)}</p>`;
    }
  });

  if (inList) output += '</ul>';
  return output;
}
