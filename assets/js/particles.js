document.addEventListener('DOMContentLoaded', function() {
    // Configuración de partículas
    particlesJS("particles-js", {
        particles: {
            number: { value:100, density: { enable: true, value_area:1000 } },
            color: { value: "#00FFFF" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 4, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00FFFF",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.3 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
    
}
);

