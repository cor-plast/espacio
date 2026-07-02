const list = document.getElementById('blog-list');
const searchInput = document.getElementById('search-input');
const emptyMessage = document.getElementById('empty-message');
let posts = [];

async function loadPosts() {
  try {
    const response = await fetch('../blog.json');
    if (!response.ok) throw new Error('No se pudo cargar blog.json');
    posts = await response.json();
    renderPosts(posts);
  } catch (error) {
    list.innerHTML = '<p>No se pudieron cargar los artículos. Revisá que blog.json esté en la carpeta principal.</p>';
    console.error(error);
  }
}

function renderPosts(items) {
  emptyMessage.hidden = items.length !== 0;

  list.innerHTML = items.map(post => `
    <a class="post-card" href="../${post.url}">
      <img class="post-card-img" src="../${post.imagen}" alt="${post.titulo}" loading="lazy">
      <div class="post-card-body">
        <p class="post-category">${post.categoria}</p>
        <h2>${post.titulo}</h2>
        <p>${post.descripcion}</p>
        <div class="card-meta">
          <span>📅 ${formatDate(post.fecha)}</span>
          <span>⏱ ${post.lectura}</span>
        </div>
        <span class="read-more">Leer artículo →</span>
      </div>
    </a>
  `).join('');
}

function formatDate(dateString) {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = posts.filter(post =>
    post.titulo.toLowerCase().includes(query) ||
    post.categoria.toLowerCase().includes(query) ||
    post.descripcion.toLowerCase().includes(query)
  );
  renderPosts(filtered);
});

loadPosts();
