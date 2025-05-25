
// ========== TECLA DE ATALHO (Alt+A) ========== //
document.addEventListener('keydown', function(e) {
  if (e.altKey && e.key.toLowerCase() === 'a') {
    document.getElementById('accessibilityPanel').classList.toggle('active');
    e.preventDefault();
  }
});

// ========== CONTROLE DE TEMA ========== //
document.addEventListener('DOMContentLoaded', function() {
  // Verifica o tema salvo ou define escuro como padrão
  const savedTheme = localStorage.getItem('theme') || 'dark-mode';
  document.body.classList.add(savedTheme);
  updateThemeIcon(savedTheme);

  // ========== CONTROLE DE COR DOS ÍCONES ========== //
function toggleTheme() {
  const isLight = document.body.classList.contains('light-mode');
  
  document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode');
  
  // Atualiza cores dos ícones
  const icons = document.querySelectorAll('.feature-icon');
  icons.forEach(icon => {
    if (isLight) {
      icon.style.color = '#ffffff'; // Tema escuro - ícones brancos
    } else {
      icon.style.color = '#333333'; // Tema claro - ícones pretos
    }
  });
  
  const newTheme = isLight ? 'dark-mode' : 'light-mode';
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

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
let currentFontSize = 0; // -2 = smaller, -1 = small, 0 = normal, 1 = large, 2 = larger, 3 = largest

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
    if (currentFontSize < 3) {
      currentFontSize++;
      updateFontSize();
    }
  });

  document.getElementById('decreaseFont').addEventListener('click', () => {
    if (currentFontSize > -2) {
      currentFontSize--;
      updateFontSize();
    }
  });

  document.getElementById('resetFont').addEventListener('click', () => {
    currentFontSize = 0;
    updateFontSize();
  });

  function updateFontSize() {
    document.body.classList.remove('font-smaller', 'font-small', 'font-normal', 
                                 'font-large', 'font-larger', 'font-largest');
    
    const fontClasses = [
      'font-smaller',  // -2
      'font-small',    // -1
      'font-normal',   // 0
      'font-large',    // 1
      'font-larger',   // 2
      'font-largest'   // 3
    ];
    
    document.body.classList.add(fontClasses[currentFontSize + 2]);
    localStorage.setItem('fontSize', currentFontSize);
  }

  // Controles de contraste
  document.getElementById('highContrast').addEventListener('click', () => {
    document.body.classList.add('high-contrast');
    localStorage.setItem('contrast', 'high');
  });

  document.getElementById('resetContrast').addEventListener('click', () => {
    document.body.classList.remove('high-contrast');
    localStorage.setItem('contrast', 'normal');
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
      window.speechSynthesis.cancel();
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
  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) {
    currentFontSize = parseInt(savedFontSize);
    updateFontSize();
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
