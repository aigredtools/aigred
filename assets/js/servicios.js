document.addEventListener('DOMContentLoaded', function() {
    // Servicios adicionales que se cargarán dinámicamente
    const serviciosAdicionales = [
        {
            icon: 'fas fa-code',
            nombre: 'Blackbox AI',
            descripcion: 'Transforma la forma en que los desarrolladores escriben, depuran y optimizan código, enfocándose en la eficiencia y precisión al eliminar tareas repetitivas y mejorar el proceso creativo de programación.'
        },
        {
            icon: 'fas fa-image',
            nombre: 'Midjourney Web',
            descripcion: 'Laboratorio de investigación independiente que explora nuevos medios de pensamiento y expande los poderes imaginativos de la humanidad, conocido por su programa de inteligencia artificial generativa que crea imágenes a partir de descripciones textuales.'
        },
        {
            icon: 'fas fa-video',
            nombre: 'Hailuo Video AI',
            descripcion: 'Herramienta innovadora que permite transformar ideas en videos impresionantes mediante inteligencia artificial, facilitando la creación de contenido visual atractivo de manera eficiente.'
        },
        {
            icon: 'fas fa-film',
            nombre: 'CapCut Pro',
            descripcion: 'Editor de video avanzado para PC que ofrece herramientas de creación de video básicas, avanzadas y basadas en IA, permitiendo ediciones de calidad de estudio de manera sencilla.'
        },
        {
            icon: 'fas fa-microphone',
            nombre: 'Fish Audio',
            descripcion: 'Solución de texto a voz potente, rápida y personalizable que ofrece clonación de voz de baja latencia y precios fijos para locuciones con inteligencia artificial.'
        },
        {
            icon: 'fas fa-robot',
            nombre: 'Chat GPT',
            descripcion: 'Modelo de lenguaje desarrollado por OpenAI que permite mantener conversaciones naturales y generar texto coherente en función de las entradas proporcionadas por el usuario.'
        },
        {
            icon: 'fas fa-user-robot',
            nombre: 'Operator AI',
            descripcion: 'Agente de inteligencia artificial de OpenAI que puede interactuar con páginas web para realizar tareas como completar formularios, realizar pedidos y navegar por interfaces gráficas de usuario de manera autónoma.'
        },
        {
            icon: 'fas fa-video-plus',
            nombre: 'Sora',
            descripcion: 'Modelo de generación de video de OpenAI diseñado para tomar entradas de texto, imagen y video y generar un nuevo video como salida, facilitando la creación de contenido audiovisual a partir de descripciones textuales.'
        },
        {
            icon: 'fas fa-file-powerpoint',
            nombre: 'SlideShare',
            descripcion: 'Plataforma en línea que permite a los usuarios compartir y descubrir presentaciones y otros contenidos profesionales, facilitando la difusión de información y conocimientos.'
        },
        {
            icon: 'fas fa-film',
            nombre: 'Runway ML',
            descripcion: 'Empresa de investigación aplicada que desarrolla herramientas avanzadas de inteligencia artificial para la creación y edición de imágenes y videos, acercando la brecha entre la idea y la ejecución creativa.'
        },
        {
            icon: 'fas fa-paint-brush',
            nombre: 'Renderforest AI',
            descripcion: 'Plataforma que ofrece herramientas de diseño basadas en inteligencia artificial, permitiendo a los usuarios crear videos animados, sitios web y otros contenidos visuales de manera sencilla y profesional.'
        },
        {
            icon: 'fas fa-images',
            nombre: 'Freepik',
            descripcion: 'Recurso en línea que proporciona vectores, ilustraciones y fotos de alta calidad para proyectos creativos, facilitando el acceso a recursos gráficos para diseñadores y creadores de contenido.'
        },
        {
            icon: 'fas fa-object-group',
            nombre: 'PlaceIt by Envato',
            descripcion: 'Herramienta en línea que permite crear maquetas, logotipos, videos y diseños profesionales de manera sencilla, ofreciendo una amplia biblioteca de plantillas personalizables.'
        },
        {
            icon: 'fas fa-podcast',
            nombre: 'Adobe Podcast',
            descripcion: 'Plataforma basada en inteligencia artificial que ofrece herramientas para la grabación y edición de audio, permitiendo crear podcasts y locuciones de alta calidad directamente desde la web.'
        },
        {
            icon: 'fas fa-pen-fancy',
            nombre: 'Leonardo AI',
            descripcion: 'Herramienta de generación de imágenes impulsada por inteligencia artificial que permite a los usuarios crear arte y contenido visual de manera rápida y sencilla, adecuada para entusiastas creativos.'
        },
        {
            icon: 'fas fa-video-camera',
            nombre: 'Clipchamp',
            descripcion: 'Editor de video en línea que ofrece herramientas de edición fáciles de usar, permitiendo a los usuarios crear y compartir videos de calidad profesional sin necesidad de software complejo.'
        },
        {
            icon: 'fas fa-layer-group',
            nombre: 'Envato Elements',
            descripcion: 'Suscripción que proporciona acceso ilimitado a una amplia gama de activos digitales, incluyendo gráficos, plantillas, fotos y más, para proyectos creativos.'
        },
        {
            icon: 'fas fa-video-plus',
            nombre: 'HeyGen',
            descripcion: 'Plataforma de generación de videos impulsada por inteligencia artificial que permite crear contenido de video personalizado y atractivo de manera eficiente.'
        },
        {
            icon: 'fas fa-icons',
            nombre: 'Flaticon',
            descripcion: 'Recurso en línea que ofrece una amplia colección de iconos y pegatinas en formato vectorial, útiles para proyectos de diseño y desarrollo web.'
        },
        {
            icon: 'fas fa-brain',
            nombre: 'Ideogram AI',
            descripcion: 'Herramienta que utiliza inteligencia artificial para generar y analizar ideogramas y símbolos visuales, facilitando la creación de representaciones gráficas de conceptos.'
        },
        {
            icon: 'fas fa-vector-square',
            nombre: 'Vecteezy',
            descripcion: 'Plataforma que proporciona vectores, fotos y videos de stock gratuitos y de alta calidad para proyectos creativos.'
        },
        {
            icon: 'fas fa-search',
            nombre: 'Spyhorus',
            descripcion: 'Herramienta de análisis que permite a los usuarios monitorear y analizar el rendimiento de campañas publicitarias y estrategias de marketing en línea.'
        },
        {
            icon: 'fab fa-youtube',
            nombre: 'VidIQ',
            descripcion: 'Extensión y plataforma que ayuda a los creadores de contenido de YouTube a optimizar sus videos y canales para mejorar el alcance y la visibilidad.'
        },
        {
            icon: 'fas fa-ad',
            nombre: 'Adsparo',
            descripcion: 'Herramienta de gestión y optimización de campañas publicitarias en línea, diseñada para mejorar el rendimiento y el retorno de inversión en publicidad digital.'
        },
        {
            icon: 'fas fa-photo-video',
            nombre: 'MotionArray',
            descripcion: 'Plataforma que ofrece plantillas de video, música, efectos de sonido y otros recursos para editores de video y creadores de contenido.'
        },
        {
            icon: 'fas fa-edit',
            nombre: 'Editor Pack + Plantillas',
            descripcion: 'Conjunto de herramientas y plantillas diseñadas para facilitar la edición de contenido digital, incluyendo videos, gráficos y más.'
        },
        {
            icon: 'fas fa-music',
            nombre: 'Musicfy IA',
            descripcion: 'Plataforma impulsada por inteligencia artificial que permite a los usuarios crear música utilizando su propia voz o la de otros, facilitando la generación de canciones de manera innovadora.'
        },
        {
            icon: 'fas fa-image',
            nombre: 'Adobe Photoshop',
            descripcion: 'Editor de imágenes desarrollado por Adobe Systems, ampliamente utilizado para el retoque fotográfico y la creación de gráficos. Ofrece una variedad de herramientas avanzadas para la manipulación y edición de imágenes.'
        },
        {
            icon: 'fas fa-paint-brush',
            nombre: 'Canva Pro',
            descripcion: 'Versión premium de Canva que proporciona acceso ilimitado a contenido y herramientas de diseño premium, incluyendo funciones avanzadas como la programación de publicaciones en redes sociales y animaciones instantáneas.'
        },
        {
            icon: 'fas fa-file-pdf',
            nombre: 'Adobe Acrobat',
            descripcion: 'Solución integral para trabajar con archivos PDF, que permite visualizar, editar, compartir y firmar documentos de manera segura y eficiente.'
        },
        {
            icon: 'fas fa-adjust',
            nombre: 'Adobe Lightroom',
            descripcion: 'Herramienta de Adobe diseñada para la edición y organización de fotografías, que ofrece funciones avanzadas para el procesamiento de imágenes y la gestión de bibliotecas fotográficas.'
        }
    ]

    // Función para cargar servicios adicionales
    function cargarServiciosAdicionales() {
        const contenedor = document.getElementById('servicios-adicionales');
        
        // Limpiar el contenedor
        contenedor.innerHTML = '';
        
        // Agregar cada servicio al contenedor
        serviciosAdicionales.forEach(servicio => {
            const servicioHTML = `
                <div class="service-card rounded-xl p-6 flex flex-col items-center text-center">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-electric-green flex items-center justify-center mb-4">
                        <i class="${servicio.icon} text-black text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2 font-exo">${servicio.nombre}</h3>
                    <p class="text-gray-300">${servicio.descripcion}</p>
                </div>
            `;
            
            contenedor.innerHTML += servicioHTML;
        });
        
        // Mostrar el contenedor
        contenedor.classList.remove('hidden');
        contenedor.classList.add('grid');
        
        // Cambiar el texto del botón
        const boton = document.getElementById('ver-mas-servicios');
        boton.innerHTML = '<i class="fas fa-minus-circle mr-2"></i> Ocultar Servicios Adicionales';
        boton.dataset.mostrado = 'true';
    }
    
    // Función para ocultar servicios adicionales
    function ocultarServiciosAdicionales() {
        const contenedor = document.getElementById('servicios-adicionales');
        contenedor.classList.add('hidden');
        contenedor.classList.remove('grid');
        
        // Cambiar el texto del botón
        const boton = document.getElementById('ver-mas-servicios');
        boton.innerHTML = '<i class="fas fa-plus-circle mr-2"></i> Ver Todos los Servicios';
        boton.dataset.mostrado = 'false';
    }
    
    // Evento para el botón de ver más servicios
    const botonVerMas = document.getElementById('ver-mas-servicios');
    if (botonVerMas) {
        botonVerMas.addEventListener('click', function() {
            if (this.dataset.mostrado === 'true') {
                ocultarServiciosAdicionales();
            } else {
                cargarServiciosAdicionales();
            }
        });
    }
});