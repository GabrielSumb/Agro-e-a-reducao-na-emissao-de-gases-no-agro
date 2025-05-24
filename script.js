// ========== CONTROLE DE TEMA ========== //
document.addEventListener('DOMContentLoaded', function() {
  // Verifica o tema salvo ou define escuro como padrão
  const savedTheme = localStorage.getItem('theme') || 'dark-mode';
  document.body.classList.add(savedTheme);
  updateThemeIcon(savedTheme);

  // Configura o botão de alternância
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Inicializa acessibilidade
  initAccessibility();
});

function toggleTheme() {
  const isLight = document.body.classList.contains('light-mode');
  
  document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode');
  
  const newTheme = isLight ? 'dark-mode' : 'light-mode';
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  icon.textContent = theme === 'light-mode' ? '☾' : '☀';
}

// ========== ACESSIBILIDADE ========== //
function initAccessibility() {
  // Elementos
  const accessibilityBtn = document.getElementById('accessibilityBtn');
  const accessibilityPanel = document.getElementById('accessibilityPanel');
  const closePanel = document.getElementById('closePanel');

  // Abrir/fechar painel
  accessibilityBtn.addEventListener('click', () => {
    accessibilityPanel.classList.toggle('active');
  });

  closePanel.addEventListener('click', () => {
    accessibilityPanel.classList.remove('active');
  });

  // Controles de tamanho de fonte
  document.getElementById('increaseFont').addEventListener('click', () => {
    document.body.classList.add('large-text');
    document.body.classList.remove('larger-text');
    localStorage.setItem('fontSize', 'large');
  });

  document.getElementById('decreaseFont').addEventListener('click', () => {
    document.body.classList.remove('large-text', 'larger-text');
    localStorage.setItem('fontSize', 'normal');
  });

  document.getElementById('resetFont').addEventListener('click', () => {
    document.body.classList.remove('large-text', 'larger-text');
    localStorage.setItem('fontSize', 'normal');
  });

  // Controles de contraste
  document.getElementById('highContrast').addEventListener('click', () => {
    document.body.classList.add('high-contrast');
    localStorage.setItem('contrast', 'high');
  });

  document.getElementById('resetContrast').addEventListener('click', () => {
    document.body.classList.remove('high-contrast');
    localStorage.setItem('contrast', 'normal');
  });

  // Controles de zoom
  document.getElementById('zoomIn').addEventListener('click', () => {
    if (!document.body.classList.contains('zoomed-page')) {
      document.body.classList.add('zoomed-page');
      localStorage.setItem('zoom', 'zoomed');
    } else {
      document.body.classList.replace('zoomed-page', 'double-zoomed');
      localStorage.setItem('zoom', 'double-zoomed');
    }
  });

  document.getElementById('zoomOut').addEventListener('click', () => {
    if (document.body.classList.contains('double-zoomed')) {
      document.body.classList.replace('double-zoomed', 'zoomed-page');
      localStorage.setItem('zoom', 'zoomed');
    } else {
      document.body.classList.remove('zoomed-page');
      localStorage.setItem('zoom', 'normal');
    }
  });

  document.getElementById('resetZoom').addEventListener('click', () => {
    document.body.classList.remove('zoomed-page', 'double-zoomed');
    localStorage.setItem('zoom', 'normal');
  });

  // Destacar links
  document.getElementById('highlightLinks').addEventListener('click', () => {
    document.body.classList.toggle('highlight-links');
    localStorage.setItem('highlightLinks', document.body.classList.contains('highlight-links'));
  });

  // Descrição de imagens
  document.getElementById('imageDescriptions').addEventListener('click', () => {
    const images = document.querySelectorAll('img:not([aria-hidden="true"])');
    let descriptions = "";
    
    images.forEach((img, index) => {
      const alt = img.getAttribute('alt') || 'Imagem sem descrição textual';
      if (index > 0) descriptions += "\n\n";
      descriptions += `Imagem ${index + 1}: ${alt}`;
      
      // Adiciona efeito visual temporário
      img.style.outline = '3px solid yellow';
      setTimeout(() => img.style.outline = '', 2000);
    });
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(descriptions);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    } else {
      alert(descriptions.length > 500 ? descriptions.substring(0, 500) + '...' : descriptions);
    }
  });

  // Leitura de página
  document.getElementById('readPage').addEventListener('click', () => {
    const mainContent = document.querySelector('main') || document.body;
    const text = mainContent.innerText.replace(/\s+/g, ' ').trim();
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Para qualquer leitura anterior
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Seu navegador não suporta leitura de texto. Aqui está o início do conteúdo:\n\n' + 
            text.substring(0, 500) + '...');
    }
  });

  document.getElementById('stopReading').addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });

  // Carrega preferências salvas
  loadAccessibilityPreferences();
}

function loadAccessibilityPreferences() {
  // Fonte
  const fontSize = localStorage.getItem('fontSize');
  if (fontSize === 'large') {
    document.body.classList.add('large-text');
  } else if (fontSize === 'larger') {
    document.body.classList.add('larger-text');
  }

  // Contraste
  if (localStorage.getItem('contrast') === 'high') {
    document.body.classList.add('high-contrast');
  }

  // Zoom
  const zoom = localStorage.getItem('zoom');
  if (zoom === 'zoomed') {
    document.body.classList.add('zoomed-page');
  } else if (zoom === 'double-zoomed') {
    document.body.classList.add('double-zoomed');
  }

  // Links destacados
  if (localStorage.getItem('highlightLinks') === 'true') {
    document.body.classList.add('highlight-links');
  }
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
