async function loadPosts() {
  const list = document.getElementById('blog-list');
  try {
    const response = await fetch('../blog.json');
    const posts = await response.json();
    list.innerHTML = posts.map(post => `
      <article class="post-card">
        <p class="card-category">${post.categoria}</p>
        <h2><a href="../${post.url}">${post.titulo}</a></h2>
        <p>${post.descripcion}</p>
        <time>${formatDate(post.fecha)}</time>
      </article>
    `).join('');
  } catch (error) {
    list.innerHTML = '<p>No se pudieron cargar los artículos.</p>';
  }
}

function formatDate(dateString) {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

loadPosts();
