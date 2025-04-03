/**
 * Código JavaScript optimizado y ligero
 * - Mínimas animaciones
 * - Enfoque en rendimiento
 * - Funcionalidad esencial
 */

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar solo las funcionalidades esenciales
    initMinimalScrollEffects();
    initContactForm();
    
    // Inicializar contadores simples si existen
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        initSimpleCounters();
    }
});

// Efectos mínimos de scroll para navegación
function initMinimalScrollEffects() {
    // Resaltado de navegación
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section[id]');
    
    if (navLinks.length > 0 && sections.length > 0) {
        // Función debounce para mejorar rendimiento
        const debounce = (func, wait = 100) => {
            let timeout;
            return function() {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, arguments), wait);
            };
        };
        
        // Función para actualizar la navegación activa
        const updateActiveNav = debounce(() => {
            let current = '';
            const scrollPosition = window.pageYOffset;
            
            // Encontrar la sección actual
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            // Actualizar enlaces de navegación
            navLinks.forEach(link => {
                link.classList.remove('text-neon-blue');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-neon-blue');
                }
            });
        }, 100);
        
        // Evento de scroll con debounce
        window.addEventListener('scroll', updateActiveNav);
        
        // Activar inicialmente
        updateActiveNav();
    }
}

// Contadores simples y ligeros
function initSimpleCounters() {
    const counters = document.querySelectorAll('.counter');
    
    // Usar IntersectionObserver para detectar cuando los contadores son visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                
                // Calcular incremento optimizado para animación más corta
                const duration = 1000; // Solo 1 segundo
                const frameRate = 30; // Menor tasa de frames
                const increment = Math.ceil(target / (duration / (1000 / frameRate)));
                
                // Animación simple
                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = count;
                        setTimeout(updateCounter, 1000 / frameRate);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.1 });
    
    // Observar todos los contadores
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

