// ========== CONTROLE DE TEMA ========== //
document.addEventListener('DOMContentLoaded', function() {
    // Tema escuro como padrão
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    document.body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);

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

// ========== ACESSIBILIDADE COMPLETA ========== //
let currentFontSize = 0;
let currentZoom = 1;

function initAccessibility() {
    // Painel
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
        }
    });
    
    document.getElementById('decreaseFont').addEventListener('click', function() {
        if (currentFontSize > -2) {
            currentFontSize--;
            updateFontSize();
        }
    });
    
    document.getElementById('resetFont').addEventListener('click', function() {
        currentFontSize = 0;
        updateFontSize();
    });

    // Contraste
    document.getElementById('highContrast').addEventListener('click', function() {
        document.body.classList.add('high-contrast');
    });
    
    document.getElementById('resetContrast').addEventListener('click', function() {
        document.body.classList.remove('high-contrast');
    });

    // Zoom
    document.getElementById('zoomIn').addEventListener('click', function() {
        if (currentZoom < 1.2) {
            currentZoom += 0.1;
            updateZoom();
        }
    });
    
    document.getElementById('zoomOut').addEventListener('click', function() {
        if (currentZoom > 0.8) {
            currentZoom -= 0.1;
            updateZoom();
        }
    });
    
    document.getElementById('resetZoom').addEventListener('click', function() {
        currentZoom = 1;
        updateZoom();
    });

    // Leitura
    document.getElementById('readPage').addEventListener('click', readPage);
    document.getElementById('stopReading').addEventListener('click', stopReading);

    // Navegação
    document.getElementById('highlightLinks').addEventListener('click', function() {
        document.body.classList.toggle('highlight-links');
    });
    
    document.getElementById('imageDescriptions').addEventListener('click', describeImages);
}

function updateFontSize() {
    const sizes = ['font-smaller', 'font-small', 'font-normal', 'font-large', 'font-larger', 'font-largest'];
    document.body.classList.remove(...sizes);
    document.body.classList.add(sizes[currentFontSize + 2]);
}

function updateZoom() {
    document.body.style.transform = `scale(${currentZoom})`;
    document.body.style.transformOrigin = 'top left';
    document.body.style.width = '100%';
    document.body.style.overflowX = 'hidden';
}

function readPage() {
    // Implementação da leitura da página
}

function stopReading() {
    // Implementação para parar a leitura
}

function describeImages() {
    // Implementação da descrição de imagens
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
