document.addEventListener('DOMContentLoaded', function() {
    // Configuración del selector de idiomas
    const languageSelector = document.getElementById('language-selector');
    const languageDropdown = document.getElementById('language-dropdown');
    const langArrow = document.getElementById('lang-arrow');
    const currentLangFlag = document.getElementById('current-lang-flag');
    const currentLangText = document.getElementById('current-lang-text');

    // Función para actualizar el idioma mostrado
    function updateDisplayedLanguage(lang) {
        const langInfo = {
            'es': { flag: '🇪🇸', name: 'Español' },
            'en': { flag: '🇺🇸', name: 'English' }
        };
        currentLangFlag.textContent = langInfo[lang].flag;
        currentLangText.textContent = langInfo[lang].name;
    }

    // Manejar clic en el selector de idiomas
    languageSelector.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !languageDropdown.classList.contains('hidden');
        
        if (isOpen) {
            // Cerrar el menú
            languageDropdown.classList.add('hidden');
            langArrow.style.transform = 'rotate(0deg)';
        } else {
            // Abrir el menú
            languageDropdown.classList.remove('hidden');
            langArrow.style.transform = 'rotate(180deg)';
        }
    });

    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', () => {
        languageDropdown.classList.add('hidden');
        langArrow.style.transform = 'rotate(0deg)';
    });

    // Actualizar el idioma mostrado cuando cambie
    const observer = new MutationObserver(() => {
        if (window.langManager) {
            updateDisplayedLanguage(window.langManager.currentLang);
        }
    });
    observer.observe(document.documentElement, { attributes: true });

    // Cerrar el menú después de seleccionar un idioma
    languageDropdown.addEventListener('click', () => {
        setTimeout(() => {
            languageDropdown.classList.add('hidden');
            langArrow.style.transform = 'rotate(0deg)';
        }, 100);
    });

    // Gestión del menú móvil
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    function toggleMobileMenu(show) {
        const menuButton = document.getElementById('mobile-menu-button');
        const menuIcon = menuButton.querySelector('i');

        if (!show) {
            gsap.to(mobileMenu, {
                opacity: 0,
                y: -20,
                scale: 0.95,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => mobileMenu.classList.add('hidden')
            });
            gsap.to(menuIcon, {
                rotation: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            });
        } else {
            mobileMenu.classList.remove('hidden');
            gsap.fromTo(mobileMenu,
                { opacity: 0, y: -20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.inOut' }
            );
            gsap.to(menuIcon, {
                rotation: 90,
                duration: 0.4,
                ease: 'power2.inOut'
            });
        }
    }

    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = !mobileMenu.classList.contains('hidden');
        toggleMobileMenu(!isOpen);
    });

    // Cerrar menú al hacer clic en cualquier elemento dentro del menú o fuera de él
    document.addEventListener('click', (event) => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            // Si el clic fue dentro del menú en cualquier elemento que no sea un enlace
            if (mobileMenu.contains(event.target) && !event.target.closest('a')) {
                return; // No cerramos el menú
            }
            // Si el clic fue en el botón del menú, ya está manejado por su propio evento
            if (menuButton.contains(event.target)) {
                return;
            }
            // En cualquier otro caso, cerramos el menú
            toggleMobileMenu(false);
        }
    });

    // Cerrar menú móvil al hacer clic en cualquier elemento interactivo dentro del menú
    mobileMenu.addEventListener('click', (event) => {
        // Si el clic fue en un enlace o botón dentro del menú
        if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' || 
            event.target.closest('a') || event.target.closest('button')) {
            toggleMobileMenu(false);
        }
    });
    // Cerrar menú móvil al hacer scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!mobileMenu.classList.contains('hidden')) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                toggleMobileMenu(false);
            }, 100); // Pequeño retraso para evitar cierres innecesarios
        }
    });

    // Registrar el plugin ScrollToPlugin
    gsap.registerPlugin(ScrollToPlugin);

    // Animación de desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Animar el desplazamiento con GSAP
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 70 // Ajuste para el header fijo
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
});
