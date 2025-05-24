// ========== CONTROLE DE TEMA ========== //
document.addEventListener('DOMContentLoaded', function() {
    // Configuração inicial do tema
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    document.body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);

    // Botão de alternância de tema
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Inicializa acessibilidade
    initAccessibility();

    // Atalho de teclado Alt+A
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

function initAccessibility() {
    // Painel de acessibilidade
    document.getElementById('accessibilityBtn').addEventListener('click', function() {
        document.getElementById('accessibilityPanel').classList.toggle('active');
    });

    document.getElementById('closePanel').addEventListener('click', function() {
        document.getElementById('accessibilityPanel').classList.remove('active');
    });

    // Controles de fonte
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

    // Controles de contraste
    document.getElementById('highContrast').addEventListener('click', function() {
        document.body.classList.add('high-contrast');
        cleanContrastStyles();
        localStorage.setItem('contrast', 'high');
    });

    document.getElementById('resetContrast').addEventListener('click', function() {
        document.body.classList.remove('high-contrast');
        cleanContrastStyles();
        localStorage.setItem('contrast', 'normal');
    });

    // Outras funções de acessibilidade
    document.getElementById('highlightLinks').addEventListener('click', function() {
        document.body.classList.toggle('highlight-links');
        localStorage.setItem('highlightLinks', document.body.classList.contains('highlight-links'));
    });

    // Carrega preferências
    loadAccessibilityPreferences();
}

function updateFontSize() {
    const sizes = ['font-smaller', 'font-small', 'font-normal', 'font-large', 'font-larger', 'font-largest'];
    document.body.classList.remove(...sizes);
    document.body.classList.add(sizes[currentFontSize + 2]);
    localStorage.setItem('fontSize', currentFontSize);
}

function cleanContrastStyles() {
    document.querySelectorAll('*').forEach(el => {
        el.style.backgroundColor = '';
        el.style.color = '';
    });
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
        cleanContrastStyles();
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
