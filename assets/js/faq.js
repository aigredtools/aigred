document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos del acordeón
    const faqItems = document.querySelectorAll('.faq-item');

    // Función para manejar el clic en un elemento del acordeón
    function toggleAccordion(item) {
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');
        const isOpen = item.classList.contains('active');

        // Cerrar todos los elementos abiertos
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                const otherContent = otherItem.querySelector('.faq-content');
                const otherIcon = otherItem.querySelector('.faq-icon');
                
                gsap.to(otherContent, {
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(otherIcon, {
                    rotation: 0,
                    duration: 0.3
                });
                
                otherItem.classList.remove('active');
            }
        });

        // Abrir/cerrar el elemento actual
        if (!isOpen) {
            item.classList.add('active');
            gsap.set(content, { height: 'auto' });
            gsap.from(content, {
                height: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
            gsap.to(icon, {
                rotation: 180,
                duration: 0.3
            });
        } else {
            gsap.to(content, {
                height: 0,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => item.classList.remove('active')
            });
            gsap.to(icon, {
                rotation: 0,
                duration: 0.3
            });
        }
    }

    // Agregar event listeners a todos los elementos del acordeón
    faqItems.forEach(item => {
        item.addEventListener('click', () => toggleAccordion(item));
    });

    // Animación de entrada para los elementos FAQ
    gsap.from('.faq-item', {
        scrollTrigger: {
            trigger: '.faq-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
});