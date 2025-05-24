// ========== CONTROLE DE TEMA ========== //
document.addEventListener('DOMContentLoaded', function() {
  // Verifica o tema salvo ou define escuro como padrão
  const savedTheme = localStorage.getItem('theme') || 'dark-mode';
  document.body.classList.add(savedTheme);
  updateThemeIcon(savedTheme);

  // Configura o botão de alternância
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});

function toggleTheme() {
  const isLight = document.body.classList.contains('light-mode');
  
  // Alterna entre temas
  document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode');
  
  // Atualiza o ícone e salva preferência
  const newTheme = isLight ? 'dark-mode' : 'light-mode';
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  icon.textContent = theme === 'light-mode' ? '☾' : '☀';
}

// ========== MENU MOBILE ========== //
document.getElementById('menuButton').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('sidebar').style.display = 'block';
});

document.getElementById('closeMenu').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('sidebar').style.display = 'none';
});

// Fecha menu ao clicar nos links
document.querySelectorAll('#sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('sidebar').style.display = 'none';
  });
});

// ========== SCROLL SUAVE ========== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ========== ANIMAÇÃO DE CARREGAMENTO ========== //
window.addEventListener('load', function() {
  // Adiciona classe de carregamento concluído
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 300);
});
