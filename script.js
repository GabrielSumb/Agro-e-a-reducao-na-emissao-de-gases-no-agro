// ========== CONTROLE DE TEMA ========== //
document.addEventListener('DOMContentLoaded', function() {
    // Configuração inicial do tema
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    document.body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);

    // Carrega preferências
    loadAccessibilityPreferences();

    // Botão de tema
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Inicializa acessibilidade
    initAccessibility();

    // Atalho Alt+A
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key.toLowerCase() === 'a') {
            document.getElementById('accessibilityPanel').classList.toggle('active');
        }
    });
});

function toggleTheme() {
    const isLight = document.body.classList.contains('light-mode');
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isLight ? 'dark-mode' : 'light-mode');
    updateThemeIcon(isLight ? 'dark-mode' : 'light-mode');
}

function updateThemeIcon(theme) {
    document.getElementById('themeIcon').textContent = theme === 'light-mode' ? '☾' : '☀';
}

// ========== ACESSIBILIDADE ========== //
let currentFontSize = 0;
let currentZoom = 1;

function initAccessibility() {
    // Painel de acessibilidade
    document.getElementById('accessibilityBtn').addEventListener('click', function() {
        document.getElementById('accessibilityPanel').classList.toggle('active');
    });

    document.getElementById('closePanel').addEventListener('click', function() {
        document.getElementById('accessibilityPanel').classList.remove('active');
    });

    // Tamanho da fonte
    document.getElementById('increaseFont').addEventListener('click', function() {
        if (currentFontSize < 3) {
            currentFontSize++;
            updateFontSize();
            localStorage.setItem('fontSize', currentFontSize);
        }
    });
    
    document.getElementById('decreaseFont').addEventListener('click', function() {
        if (currentFontSize > -2) {
            currentFontSize--;
            updateFontSize();
            localStorage.setItem('fontSize', currentFontSize);
        }
    });
    
    document.getElementById('resetFont').addEventListener('click', function() {
        currentFontSize = 0;
        updateFontSize();
        localStorage.setItem('fontSize', currentFontSize);
    });

    // Contraste
    document.getElementById('highContrast').addEventListener('click', function() {
        document.body.classList.add('high-contrast');
        localStorage.setItem('contrast', 'high');
    });
    
    document.getElementById('resetContrast').addEventListener('click', function() {
        document.body.classList.remove('high-contrast');
        localStorage.setItem('contrast', 'normal');
    });

    // Zoom
    document.getElementById('zoomIn').addEventListener('click', function() {
        if (currentZoom < 1.2) {
            currentZoom += 0.1;
            updateZoom();
            localStorage.setItem('zoom', currentZoom);
        }
    });
    
    document.getElementById('zoomOut').addEventListener('click', function() {
        if (currentZoom > 0.8) {
            currentZoom -= 0.1;
            updateZoom();
            localStorage.setItem('zoom', currentZoom);
        }
    });
    
    document.getElementById('resetZoom').addEventListener('click', function() {
        currentZoom = 1;
        updateZoom();
        localStorage.setItem('zoom', currentZoom);
    });

    // Leitura
    document.getElementById('readPage').addEventListener('click', readPage);
    document.getElementById('stopReading').addEventListener('click', stopReading);

    // Navegação
    document.getElementById('highlightLinks').addEventListener('click', function() {
        document.body.classList.toggle('highlight-links');
        localStorage.setItem('highlightLinks', document.body.classList.contains('highlight-links'));
    });
    
    document.getElementById('imageDescriptions').addEventListener('click', describeImages);
}

function updateFontSize() {
    const sizes = ['font-smaller', 'font-small', 'font-normal', 'font-large', 'font-larger', 'font-largest'];
    document.body.classList.remove(...sizes);
    document.body.classList.add(sizes[currentFontSize + 2]);
}

function updateZoom() {
    if (currentZoom === 1) {
        document.body.classList.remove('zoomed-page', 'double-zoomed');
    } else if (currentZoom <= 1.1) {
        document.body.classList.remove('double-zoomed');
        document.body.classList.add('zoomed-page');
    } else {
        document.body.classList.remove('zoomed-page');
        document.body.classList.add('double-zoomed');
    }
}

function readPage() {
    const mainContent = document.querySelector('main') || document.body;
    const text = mainContent.innerText.replace(/\s+/g, ' ').trim();
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Seu navegador não suporta leitura de texto.');
    }
}

function stopReading() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

function describeImages() {
    const images = document.querySelectorAll('img:not([aria-hidden="true"])');
    let descriptions = "";
    
    images.forEach((img, index) => {
        const alt = img.getAttribute('alt') || 'Imagem sem descrição';
        descriptions += `Imagem ${index + 1}: ${alt}\n\n`;
        img.style.outline = '3px dashed yellow';
        setTimeout(() => img.style.outline = '', 2000);
    });
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(descriptions);
        utterance.lang = 'pt-BR';
        window.speechSynthesis.speak(utterance);
    } else {
        alert(descriptions);
    }
}

function loadAccessibilityPreferences() {
    // Tamanho da fonte
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
    const savedZoom = localStorage.getItem('zoom');
    if (savedZoom) {
        currentZoom = parseFloat(savedZoom);
        updateZoom();
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
    link.addEventListener('click', function() {
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
