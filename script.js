// Menu Mobile
document.getElementById('menuButton').addEventListener('click', function() {
  document.getElementById('sidebar').style.display = 'block';
});

document.getElementById('closeMenu').addEventListener('click', function() {
  document.getElementById('sidebar').style.display = 'none';
});

// Fechar menu ao clicar em links
document.querySelectorAll('#sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('sidebar').style.display = 'none';
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
}
