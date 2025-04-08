// Sistema de traducción multilingüe avanzado
class LanguageManager {
    constructor() {
        this.currentLang = 'es';
        this.translations = {};
        this.translationsCache = new Map();
        this.supportedLanguages = ['es', 'en'];
        this.detectionMethod = 'auto'; // 'auto', 'browser', 'ip', 'manual'
        this.init();
    }

    async init() {
        // Primero intentamos cargar el idioma guardado por el usuario
        const savedLang = localStorage.getItem('selectedLanguage');
        
        if (savedLang) {
            // Si el usuario ya seleccionó un idioma, lo respetamos
            this.currentLang = savedLang;
            this.detectionMethod = 'manual';
        } else {
            // Si no hay idioma guardado, intentamos detectar por IP
            try {
                await this.detectLanguageByIP();
            } catch (error) {
                // Si falla la detección por IP, usamos el idioma del navegador
                this.currentLang = this.getBrowserLanguage();
                this.detectionMethod = 'browser';
            }
        }

        // Cargar las traducciones
        await this.loadTranslations();
        
        // Aplicar traducciones iniciales
        this.updateLanguage();
    }

    getBrowserLanguage() {
        const lang = navigator.language.toLowerCase().split('-')[0];
        return this.supportedLanguages.includes(lang) ? lang : 'es';
    }
    
    async detectLanguageByIP() {
        try {
            // Utilizamos una API gratuita para detectar el país por IP
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            // Mapeamos países a idiomas (simplificado)
            const countryToLang = {
                // Países de habla hispana
                'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es', 'CL': 'es', 
                'VE': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es', 
                'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 'CR': 'es', 'PA': 'es', 
                'UY': 'es', 'PR': 'es', 'GQ': 'es',
                
                // Países de habla inglesa
                'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en', 
                'ZA': 'en', 'JM': 'en', 'BZ': 'en', 'TT': 'en'
                // Se pueden añadir más países según sea necesario
            };
            
            const detectedLang = countryToLang[data.country_code] || 'es';
            this.currentLang = detectedLang;
            this.detectionMethod = 'ip';
            
            // Guardamos el idioma detectado en localStorage para futuras visitas
            // pero con una marca especial para saber que fue detectado automáticamente
            localStorage.setItem('detectedLanguage', detectedLang);
            
            return detectedLang;
        } catch (error) {
            console.warn('Error al detectar idioma por IP:', error);
            throw error;
        }
    }

    async loadTranslations() {
        try {
            // Verificar si las traducciones están en caché
            if (this.translationsCache.has(this.currentLang)) {
                this.translations = this.translationsCache.get(this.currentLang);
                return;
            }

            // Intentamos cargar el idioma solicitado
            const response = await fetch(`assets/lang/${this.currentLang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newTranslations = await response.json();
            
            // Si el idioma no es español (idioma base), cargamos también el español como fallback
            if (this.currentLang !== 'es') {
                try {
                    const fallbackResponse = await fetch('assets/lang/es.json');
                    const fallbackTranslations = await fallbackResponse.json();
                    
                    // Combinamos las traducciones, priorizando el idioma seleccionado
                    this.translations = this.deepMerge(fallbackTranslations, newTranslations);
                } catch (fallbackError) {
                    console.warn('Error loading fallback translations:', fallbackError);
                    this.translations = newTranslations;
                }
            } else {
                this.translations = newTranslations;
                // Guardar en caché
                this.translationsCache.set(this.currentLang, this.translations);
            }
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback a español si hay error
            this.currentLang = 'es';
            const response = await fetch('assets/lang/es.json');
            this.translations = await response.json();
        }
    }

    async changeLanguage(lang) {
        if (this.currentLang === lang) return;
        
        // Guardamos el idioma anterior para poder revertir en caso de error
        const previousLang = this.currentLang;
        
        try {
            // Actualizamos el idioma actual
            this.currentLang = lang;
            this.detectionMethod = 'manual';
            
            // Guardamos la preferencia del usuario
            localStorage.setItem('selectedLanguage', lang);
            
            // Cargamos las traducciones silenciosamente
            await this.loadTranslations();
            
            // Aplicamos las traducciones
            this.updateLanguage();
            
            // Mostramos una notificación sutil si está disponible
            if (window.notificationManager) {
                const langNames = {
                    'es': 'Español',
                    'en': 'English'
                };
                window.notificationManager.showNotification({
                    message: `${langNames[lang]} ${this.getTranslation('language.activated')}`,
                    type: 'info',
                    duration: 2000
                });
            }
        } catch (error) {
            console.error('Error changing language:', error);
            // Revertimos al idioma anterior en caso de error
            this.currentLang = previousLang;
            
            // Mostramos un mensaje de error si está disponible
            if (window.notificationManager) {
                window.notificationManager.showNotification({
                    message: this.getTranslation('language.error'),
                    type: 'error',
                    duration: 3000
                });
            }
        }
    }

    updateLanguage() {
        // Actualizar el atributo lang del HTML
        document.documentElement.lang = this.currentLang;

        // Traducir elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const variables = {};
            
            // Obtener variables dinámicas del elemento
            Array.from(element.attributes)
                .filter(attr => attr.name.startsWith('data-i18n-var-'))
                .forEach(attr => {
                    const varName = attr.name.replace('data-i18n-var-', '');
                    variables[varName] = attr.value;
                });
                
            const translation = this.getTranslation(key, variables);
            if (translation) element.textContent = translation;
        });

        // Traducir placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');  
            const translation = this.getTranslation(key);
            if (translation) element.placeholder = translation;
        });
        
        // Traducir atributos title (tooltips)
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.getTranslation(key);
            if (translation) element.title = translation;
        });
        
        // Traducir atributos alt de imágenes
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.getTranslation(key);
            if (translation) element.alt = translation;
        });

        // Actualizar enlaces de WhatsApp
        document.querySelectorAll('a[href*="wa.me"]').forEach(element => {
            const baseUrl = 'https://wa.me/14504089635';
            const message = encodeURIComponent(this.getTranslation('whatsapp.message'));
            element.href = `${baseUrl}?text=${message}`;
        });
        
        // Actualizar meta tags
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && metaDescription.hasAttribute('data-i18n')) {
            const key = metaDescription.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) metaDescription.content = translation;
        }
        
        // Actualizar el título de la página
        const titleTag = document.querySelector('title');
        if (titleTag && titleTag.hasAttribute('data-i18n')) {
            const key = titleTag.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) titleTag.textContent = translation;
        }
    }

    getTranslation(key, variables = {}) {
        // Si la clave está vacía o no es un string, devolvemos la clave
        if (!key || typeof key !== 'string') return key;
        
        // Dividimos la clave por puntos para navegar en el objeto de traducciones
        let translation = key.split('.').reduce((obj, k) => obj && obj[k], this.translations);
        
        // Si encontramos una traducción, procesamos las variables
        if (translation !== undefined && translation !== null) {
            // Reemplazar variables dinámicas
            Object.entries(variables).forEach(([varKey, value]) => {
                translation = translation.replace(new RegExp(`\\{${varKey}\\}`, 'g'), value);
            });
            return translation;
        }
        
        // Si no encontramos traducción, devolvemos la clave como fallback
        return key;
    }
    
    // Método para combinar profundamente dos objetos (para el sistema de fallback)
    deepMerge(target, source) {
        const output = Object.assign({}, target);
        
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = this.deepMerge(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        
        return output;
    }
    
    // Método auxiliar para verificar si un valor es un objeto
    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
}

// Inicializar el sistema de idiomas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.langManager = new LanguageManager();
window.languageManager = window.langManager;
});