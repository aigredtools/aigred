document.addEventListener('DOMContentLoaded', function() {
    // Datos de las herramientas IA
    const herramientas = [
        // Asistencia de inteligencia artificial
        {
            id: 'chatgpt',
            categoria: 'asistencia',
            icono: 'fa-robot'
        },
        {
            id: 'claude',
            categoria: 'asistencia',
            icono: 'fa-comment-dots'
        },
        {
            id: 'quillbot',
            categoria: 'asistencia',
            icono: 'fa-feather-alt'
        },
        
        // Herramientas de Código y Desarrollo
        {
            id: 'blackbox',
            categoria: 'codigo',
            icono: 'fa-code'
        },
        {
            id: 'operator',
            categoria: 'codigo',
            icono: 'fa-terminal'
        },
        
        // Generadores de Imágenes e Ilustración
        {
            id: 'midjourney',
            categoria: 'imagenes',
            icono: 'fa-image'
        },
        {
            id: 'leonardo',
            categoria: 'imagenes',
            icono: 'fa-paint-brush'
        },
        {
            id: 'ideogram',
            categoria: 'imagenes',
            icono: 'fa-lightbulb'
        },
        
        // Creación y Edición de Video
        {
            id: 'hailuo',
            categoria: 'video-creacion',
            icono: 'fa-video'
        },
        {
            id: 'sora',
            categoria: 'video-creacion',
            icono: 'fa-film'
        },
        {
            id: 'runway',
            categoria: 'video-creacion',
            icono: 'fa-magic'
        },
        {
            id: 'heygen',
            categoria: 'video-creacion',
            icono: 'fa-user-tie'
        },
        
        // Edición y Producción de Video
        {
            id: 'capcut',
            categoria: 'video-edicion',
            icono: 'fa-cut'
        },
        {
            id: 'clipchamp',
            categoria: 'video-edicion',
            icono: 'fa-video-slash'
        },
        {
            id: 'renderforest',
            categoria: 'video-edicion',
            icono: 'fa-tree'
        },
        {
            id: 'motionarray',
            categoria: 'video-edicion',
            icono: 'fa-layer-group'
        },
        {
            id: 'editorpack',
            categoria: 'video-edicion',
            icono: 'fa-box-open'
        },
        
        // Herramientas de Audio
        {
            id: 'fishaudio',
            categoria: 'audio',
            icono: 'fa-music'
        },
        {
            id: 'musicfy',
            categoria: 'audio',
            icono: 'fa-headphones'
        },
        {
            id: 'adobepodcast',
            categoria: 'audio',
            icono: 'fa-microphone-alt'
        },
        
        // Creación y Diseño de Contenido
        {
            id: 'canva',
            categoria: 'diseno',
            icono: 'fa-palette'
        },
        {
            id: 'gamma',
            categoria: 'diseno',
            icono: 'fa-presentation'
        },
        {
            id: 'adobeexpress',
            categoria: 'diseno',
            icono: 'fa-pen-fancy'
        },
        {
            id: 'placeit',
            categoria: 'diseno',
            icono: 'fa-object-group'
        },
        {
            id: 'photoshop',
            categoria: 'diseno',
            icono: 'fa-crop'
        },
        {
            id: 'lightroom',
            categoria: 'diseno',
            icono: 'fa-adjust'
        },
        {
            id: 'acrobat',
            categoria: 'diseno',
            icono: 'fa-file-pdf'
        },
        
        // Herramientas para Análisis y Optimización de Marketing
        {
            id: 'spyhorus',
            categoria: 'marketing',
            icono: 'fa-search'
        },
        {
            id: 'adspy',
            categoria: 'marketing',
            icono: 'fa-eye'
        },
        {
            id: 'adheart',
            categoria: 'marketing',
            icono: 'fa-heart'
        },
        {
            id: 'adsparo',
            categoria: 'marketing',
            icono: 'fa-bullseye'
        },
        {
            id: 'vidiq',
            categoria: 'marketing',
            icono: 'fa-youtube'
        },
        {
            id: 'droptool',
            categoria: 'marketing',
            icono: 'fa-chart-line'
        },
        
        // Recursos Digitales y Stock Creativo
        {
            id: 'freepik',
            categoria: 'recursos',
            icono: 'fa-images'
        },
        {
            id: 'flaticon',
            categoria: 'recursos',
            icono: 'fa-icons'
        },
        {
            id: 'vecteezy',
            categoria: 'recursos',
            icono: 'fa-vector-square'
        },
        {
            id: 'envato',
            categoria: 'recursos',
            icono: 'fa-photo-video'
        },
        
        // Plataformas para Compartir Contenido y Lectura Digital
        {
            id: 'slideshare',
            categoria: 'contenido',
            icono: 'fa-file-powerpoint'
        },
        {
            id: 'scribd',
            categoria: 'contenido',
            icono: 'fa-book'
        },
        {
            id: 'everand',
            categoria: 'contenido',
            icono: 'fa-file-audio'
        },
        
        // Entretenimiento en Streaming
        {
            id: 'crunchyroll',
            categoria: 'entretenimiento',
            icono: 'fa-tv'
        }
    ];

    // Categorías para el filtrado
    const categorias = [
        { id: 'todas', icono: 'fa-th-large' },
        { id: 'asistencia', icono: 'fa-robot' },
        { id: 'codigo', icono: 'fa-code' },
        { id: 'imagenes', icono: 'fa-image' },
        { id: 'video-creacion', icono: 'fa-video' },
        { id: 'video-edicion', icono: 'fa-film' },
        { id: 'audio', icono: 'fa-music' },
        { id: 'diseno', icono: 'fa-palette' },
        { id: 'marketing', icono: 'fa-chart-line' },
        { id: 'recursos', icono: 'fa-images' },
        { id: 'contenido', icono: 'fa-book' },
        { id: 'entretenimiento', icono: 'fa-tv' }
    ];

    // Función para generar los botones de filtrado
    function generarBotonesFiltrado() {
        const contenedorFiltros = document.getElementById('filtros-herramientas');
        if (!contenedorFiltros) return;

        categorias.forEach(categoria => {
            const boton = document.createElement('button');
            boton.className = `filtro-btn px-4 py-2 rounded-full mr-2 mb-2 flex items-center transition-all ${
                categoria.id === 'asistencia' ? 'bg-neon-blue text-black' : 'bg-dark-blue text-white hover:bg-neon-blue/20'
            }`;
            boton.dataset.categoria = categoria.id;
            boton.innerHTML = `<i class="fas ${categoria.icono} mr-2"></i> <span data-i18n="herramientas.categorias.${categoria.id}"></span>`;
            
            boton.addEventListener('click', () => {
                // Remover clase activa de todos los botones
                document.querySelectorAll('.filtro-btn').forEach(btn => {
                    btn.classList.remove('bg-neon-blue', 'text-black');
                    btn.classList.add('bg-dark-blue', 'text-white', 'hover:bg-neon-blue/20');
                });
                
                // Agregar clase activa al botón seleccionado
                boton.classList.remove('bg-dark-blue', 'text-white', 'hover:bg-neon-blue/20');
                boton.classList.add('bg-neon-blue', 'text-black');
                
                // Filtrar herramientas
                filtrarHerramientas(categoria.id);
            });
            
            contenedorFiltros.appendChild(boton);
        });
    }

    // Función para generar las tarjetas de herramientas
    function generarTarjetasHerramientas() {
        const contenedorHerramientas = document.getElementById('herramientas-grid');
        if (!contenedorHerramientas) return;

        herramientas.forEach(herramienta => {
            const tarjeta = document.createElement('div');
            tarjeta.className = `service-card rounded-xl overflow-hidden p-6 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 data-categoria-${herramienta.categoria}`;
            tarjeta.dataset.categoria = herramienta.categoria;
            
            tarjeta.innerHTML = `
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mr-4">
                        <i class="fas ${herramienta.icono} text-neon-blue text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold font-exo" data-i18n="herramientas.items.${herramienta.id}.nombre">${herramienta.nombre}</h3>
                </div>
                <p class="text-gray-300 mb-4 flex-grow" data-i18n="herramientas.items.${herramienta.id}.descripcion">${herramienta.descripcion}</p>
                <div class="mt-auto pt-4 border-t border-neon-blue/10">
                    <span class="text-neon-blue text-sm font-medium" data-i18n="herramientas.acceso_ilimitado">
                        <i class="fas fa-check-circle mr-1"></i>
                    </span>
                </div>
            `;
            
            // Asegurarse de que las traducciones se apliquen después de crear el elemento
            if (window.langManager) {
                window.langManager.updateLanguage();
            }
            
            contenedorHerramientas.appendChild(tarjeta);
        });
    }

    // Función para filtrar herramientas por categoría
    function filtrarHerramientas(categoria) {
        const todasLasTarjetas = document.querySelectorAll('#herramientas-grid > div');
        
        if (categoria === 'todas') {
            // Mostrar todas las tarjetas con animación
            todasLasTarjetas.forEach(tarjeta => {
                gsap.to(tarjeta, {
                    opacity: 1,
                    scale: 1,
                    display: 'flex',
                    duration: 0.3,
                    stagger: 0.05
                });
            });
        } else {
            // Ocultar tarjetas que no coinciden con la categoría
            todasLasTarjetas.forEach(tarjeta => {
                if (tarjeta.dataset.categoria === categoria) {
                    gsap.to(tarjeta, {
                        opacity: 1,
                        scale: 1,
                        display: 'flex',
                        duration: 0.3,
                        stagger: 0.05
                    });
                } else {
                    gsap.to(tarjeta, {
                        opacity: 0,
                        scale: 0.8,
                        display: 'none',
                        duration: 0.3
                    });
                }
            });
        }
    }

    // Función de inicialización
    function inicializar() {
        generarBotonesFiltrado();
        generarTarjetasHerramientas();
        
        // Aplicar filtro de asistencia por defecto
        filtrarHerramientas('asistencia');
    }

    // Inicializar componentes
    inicializar();
});