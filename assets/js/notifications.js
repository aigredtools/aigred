class NotificationSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'fixed bottom-4 left-4 z-50';
        this.container.style.cssText = 'pointer-events: none; min-width: 300px;';
        document.body.appendChild(this.container);
        this.currentIndex = 0;
        this.languageManager = window.languageManager;
        this.translations = null;
        this.notifications = [];
        this.notificationQueue = [];
        this.isShowingNotification = false;
        this.init();
    }

    init() {
        if (this.languageManager?.translations?.notifications) {
            this.translations = this.languageManager.translations.notifications;
            this.notifications = this.translations.data || [];
            this.setupNotifications();
        } else {
            setTimeout(() => this.init(), 100);
        }
    }

    setupNotifications() {
        document.addEventListener('languageChanged', () => {
            if (this.languageManager?.translations?.notifications) {
                this.translations = this.languageManager.translations.notifications;
                this.notifications = this.translations.data || [];
            }
        });

        this.showNextNotification();
        this.scheduleNextNotification();
    }

    createNotification(data) {
        if (!this.translations?.recent_purchase || !data) return;

        const notification = document.createElement('div');
        notification.className = 'bg-dark-blue/90 border-2 border-neon-blue/40 rounded-lg p-4 shadow-xl transform translate-y-full opacity-0 transition-all duration-700 mb-4 max-w-sm hover:border-neon-blue/60';
        notification.style.cssText = 'backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(66, 153, 225, 0.2); pointer-events: auto; transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);';

        const planKey = data.plan.toLowerCase();
        const translatedPlan = this.translations.plans?.[planKey] || data.plan;

        notification.innerHTML = `
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3">
                    <i class="fas fa-shopping-cart text-neon-blue"></i>
                </div>
                <div>
                    <p class="text-white text-sm font-semibold">${data.name} ${this.translations.recent_purchase.from} ${data.location}</p>
                    <p class="text-gray-300 text-xs">${this.translations.recent_purchase.message} ${translatedPlan}</p>
                </div>
            </div>
        `;

        this.container.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.remove('translate-y-full', 'opacity-0');
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                notification.classList.add('translate-y-full', 'opacity-0');
                setTimeout(() => {
                    notification.remove();
                    resolve();
                }, 700);
            }, 4000);
        });
    }

    async showNextNotification() {
        if (this.isShowingNotification || !this.translations?.recent_purchase || !this.notifications?.length) return;

        this.isShowingNotification = true;
        const currentNotification = this.notifications[this.currentIndex];
        await this.createNotification(currentNotification);
        this.currentIndex = (this.currentIndex + 1) % this.notifications.length;
        this.isShowingNotification = false;

        if (this.notificationQueue.length > 0) {
            this.notificationQueue.shift()();
        }
    }

    scheduleNextNotification() {
        const randomInterval = Math.floor(Math.random() * (7000 - 3000) + 3000);
        setTimeout(() => {
            if (this.isShowingNotification) {
                this.notificationQueue.push(() => this.showNextNotification());
            } else {
                this.showNextNotification();
            }
            this.scheduleNextNotification();
        }, randomInterval);
    }
}

const initNotifications = () => {
    if (window.languageManager?.translations?.notifications) {
        window.notificationSystem = new NotificationSystem();
    } else {
        setTimeout(initNotifications, 100);
    }
};

initNotifications();