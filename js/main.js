// Header sticky
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
  });
});

// Menú mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('active');
});

// Cargar 3 posts del blog
fetch('posts.json')
.then(res => res.json())
.then(posts => {
  const container = document.getElementById('blog-preview');
  if(container) {
    container.innerHTML = posts.slice(0,3).map(post => `
      <div class="card">
        <img src="${post.imagen}" alt="${post.titulo}" style="width:100%;border-radius:10px;margin-bottom:15px">
        <h3>${post.titulo}</h3>
        <p>${post.extracto}</p>
        <a href="post.html?id=${post.id}">Leer más →</a>
      </div>
    `).join('');
  }
});

// Cargar posts del blog
if(document.getElementById('blog-container')){
  fetch('data/posts.json')
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById('blog-container');
      container.innerHTML = posts.map(post => `
        <article class="card-blog">
          <img src="${post.imagen}" alt="${post.titulo}">
          <div class="card-content">
            <span class="card-date">${post.fecha}</span>
            <h3>${post.titulo}</h3>
            <p>${post.extracto}</p>
            <a href="${post.link}" class="btn-link">Leer más →</a>
          </div>
        </article>
      `).join('');
    });
}
