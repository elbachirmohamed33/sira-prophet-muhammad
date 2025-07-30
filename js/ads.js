// ===========================
// ADVERTISING SYSTEM JS
// Ad management and tracking
// ===========================

class AdManager {
    constructor() {
        this.ads = [];
        this.revenue = 0;
        this.impressions = 0;
        this.clicks = 0;
        this.init();
    }

    init() {
        this.loadAdBlocker();
        this.setupEventListeners();
        this.loadAds();
        this.startTracking();
        console.log('📢 Ad Manager Initialized');
    }

    // Detect AdBlocker
    loadAdBlocker() {
        const adBlockerDiv = document.createElement('div');
        adBlockerDiv.className = 'adsbox';
        adBlockerDiv.style.display = 'none';
        document.body.appendChild(adBlockerDiv);
        
        setTimeout(() => {
            if (adBlockerDiv.offsetHeight === 0) {
                this.showAdBlockerMessage();
            }
            document.body.removeChild(adBlockerDiv);
        }, 100);
    }

    showAdBlockerMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #D4AF37, #B8860B);
                color: white;
                padding: 1rem;
                border-radius: 15px;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            ">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">🤲 Cher Visiteur</div>
                <div style="font-size: 0.9rem; line-height: 1.4;">
                    Nous avons détecté un bloqueur de pub. Les revenus publicitaires nous aident à maintenir ce site éducatif gratuit. Considérez nous ajouter à votre liste blanche.
                </div>
                <button onclick="this.parentNode.parentNode.remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 10px;
                    margin-top: 1rem;
                    cursor: pointer;
                    width: 100%;
                ">
                    Je comprends
                </button>
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 10000);
    }

    // Setup event listeners
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.ad-container, .ad-banner, .content-ad')) {
                this.trackClick(e.target.closest('[data-ad-id]'));
            }
        });

        // Track impressions on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackImpression(entry.target);
                }
            });
        });

        document.querySelectorAll('[data-ad-id]').forEach(ad => {
            observer.observe(ad);
        });
    }

    // Load different types of ads
    loadAds() {
        this.loadGoogleAdsense();
        this.loadIslamicAds();
        this.loadAffiliateAds();
        this.loadFloatingAds();
    }

    loadGoogleAdsense() {
        // Simulate Google AdSense integration
        const adsenseSlots = document.querySelectorAll('.adsense-slot');
        adsenseSlots.forEach((slot, index) => {
            if (!slot.dataset.loaded) {
                slot.innerHTML = `
                    <div class="adsense-placeholder">
                        <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">Google AdSense</div>
                        <div style="font-size: 0.8rem; opacity: 0.7;">Publicité contextuelle</div>
                    </div>
                `;
                slot.dataset.loaded = 'true';
                slot.dataset.adId = `adsense-${index}`;
            }
        });
    }

    loadIslamicAds() {
        const islamicAds = [
            {
                title: "📚 Librairie Islamique Salam",
                description: "Corans, livres de Hadith, ouvrages de Fiqh et littérature islamique authentique",
                cta: "Découvrir",
                link: "#",
                revenue: 2.50
            },
            {
                title: "🕌 Institut Al-Azhar en Ligne",
                description: "Cours d'arabe, théologie islamique et mémorisation du Coran avec des professeurs qualifiés",
                cta: "S'inscrire",
                link: "#",
                revenue: 15.00
            },
            {
                title: "🕋 Agence Hajj & Omra Premium",
                description: "Packages complets pour le Hajj et la Omra avec accompagnement spirituel",
                cta: "Réserver",
                link: "#",
                revenue: 200.00
            },
            {
                title: "🌿 Produits Halal Bio",
                description: "Alimentation biologique certifiée halal, cosmétiques et produits d'hygiène naturels",
                cta: "Acheter",
                link: "#",
                revenue: 5.75
            }
        ];

        const containers = document.querySelectorAll('.islamic-ad-container');
        containers.forEach((container, index) => {
            if (!container.dataset.loaded && islamicAds[index]) {
                const ad = islamicAds[index];
                container.innerHTML = `
                    <div class="islamic-ad" data-ad-id="islamic-${index}" data-revenue="${ad.revenue}">
                        <h4>${ad.title}</h4>
                        <p style="color: #2C1810; margin-bottom: 1rem; line-height: 1.5;">${ad.description}</p>
                        <a href="${ad.link}" class="ad-cta" style="
                            background: #27AE60;
                            color: white;
                            padding: 0.8rem 1.5rem;
                            border-radius: 20px;
                            text-decoration: none;
                            font-weight: 600;
                            display: inline-block;
                            transition: all 0.3s ease;
                        ">${ad.cta}</a>
                    </div>
                `;
                container.dataset.loaded = 'true';
            }
        });
    }

    loadAffiliateAds() {
        const affiliateProducts = [
            {
                name: "Coran Digital Interactif",
                price: "29,99€",
                commission: "30%",
                image: "🕌",
                description: "Application mobile avec récitation, traduction et apprentissage interactif"
            },
            {
                name: "Cours d'Arabe Intensif",
                price: "199€",
                commission: "40%",
                image: "📖",
                description: "Formation complète en ligne avec professeurs natifs"
            },
            {
                name: "Kit Famille Musulmane",
                price: "79,99€",
                commission: "25%",
                image: "👨‍👩‍👧‍👦",
                description: "Ressources éducatives pour toute la famille"
            }
        ];

        const affiliateContainer = document.getElementById('affiliate-ads');
        if (affiliateContainer && !affiliateContainer.dataset.loaded) {
            affiliateContainer.innerHTML = `
                <div style="background: #F8F6F0; padding: 2rem; border-radius: 20px; border: 2px solid #D4AF37;">
                    <h3 style="text-align: center; color: #0F4C3A; font-family: 'Amiri', serif; margin-bottom: 2rem;">
                        🛒 Produits Recommandés
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                        ${affiliateProducts.map((product, index) => `
                            <div class="affiliate-product" data-ad-id="affiliate-${index}" style="
                                background: white;
                                padding: 1.5rem;
                                border-radius: 15px;
                                text-align: center;
                                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                                transition: transform 0.3s ease;
                            ">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">${product.image}</div>
                                <h4 style="color: #0F4C3A; margin-bottom: 0.5rem;">${product.name}</h4>
                                <p style="color: #8B4513; font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.4;">
                                    ${product.description}
                                </p>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                    <span style="font-weight: 600; color: #D4AF37; font-size: 1.1rem;">${product.price}</span>
                                    <span style="background: #27AE60; color: white; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">
                                        ${product.commission} comm.
                                    </span>
                                </div>
                                <button style="
                                    background: #D4AF37;
                                    color: white;
                                    border: none;
                                    padding: 0.8rem 1.5rem;
                                    border-radius: 20px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    width: 100%;
                                    transition: all 0.3s ease;
                                " onmouseover="this.style.background='#B8860B'" onmouseout="this.style.background='#D4AF37'">
                                    Voir l'offre →
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            affiliateContainer.dataset.loaded = 'true';
        }
    }

    loadFloatingAds() {
        // Create floating banner
        const floatingBanner = document.createElement('div');
        floatingBanner.className = 'floating-banner';
        floatingBanner.innerHTML = `
            <button class="close-btn" onclick="this.parentNode.remove()">×</button>
            <div class="banner-content">
                <span>🎁 Offre spéciale : 50% de réduction sur tous nos e-books</span>
                <button class="banner-btn" onclick="window.open('#', '_blank')">Profiter de l'offre</button>
            </div>
        `;
        document.body.appendChild(floatingBanner);

        // Show after 5 seconds
        setTimeout(() => {
            floatingBanner.classList.add('show');
        }, 5000);

        // Auto-hide after 15 seconds
        setTimeout(() => {
            if (floatingBanner.parentNode) {
                floatingBanner.classList.remove('show');
                setTimeout(() => {
                    if (floatingBanner.parentNode) {
                        floatingBanner.remove();
                    }
                }, 300);
            }
        }, 20000);
    }

    // Tracking functions
    trackImpression(adElement) {
        if (adElement && !adElement.dataset.impressed) {
            this.impressions++;
            adElement.dataset.impressed = 'true';
            
            const adId = adElement.dataset.adId;
            const revenue = parseFloat(adElement.dataset.revenue) || 0.01;
            
            console.log(`👀 Ad Impression: ${adId}`);
            this.updateStats();
        }
    }

    trackClick(adElement) {
        if (adElement) {
            this.clicks++;
            const adId = adElement.dataset.adId;
            const revenue = parseFloat(adElement.dataset.revenue) || 0.25;
            this.revenue += revenue;
            
            console.log(`🖱️ Ad Click: ${adId} (+${revenue}€)`);
            this.updateStats();
            
            // Show thank you message
            this.showThankYouMessage();
        }
    }

    showThankYouMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #27AE60, #219A52);
                color: white;
                padding: 2rem;
                border-radius: 20px;
                z-index: 10000;
                text-align: center;
                box-shadow: 0 15px 40px rgba(0,0,0,0.3);
                animation: fadeInUp 0.5s ease-out;
            ">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🤲</div>
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Barakallahu feeki</div>
                <div style="font-size: 0.9rem; opacity: 0.9;">
                    Votre soutien nous aide à maintenir ce site éducatif gratuit
                </div>
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    updateStats() {
        // Update revenue display if exists
        const revenueDisplay = document.getElementById('revenue-display');
        if (revenueDisplay) {
            revenueDisplay.textContent = `Revenus: ${this.revenue.toFixed(2)}€`;
        }

        // Update impressions display
        const impressionsDisplay = document.getElementById('impressions-display');
        if (impressionsDisplay) {
            impressionsDisplay.textContent = `Impressions: ${this.impressions}`;
        }

        // Update clicks display
        const clicksDisplay = document.getElementById('clicks-display');
        if (clicksDisplay) {
            clicksDisplay.textContent = `Clics: ${this.clicks}`;
        }
    }

    startTracking() {
        // Send stats every 5 minutes
        setInterval(() => {
            this.sendStats();
        }, 300000);
    }

    sendStats() {
        const stats = {
            impressions: this.impressions,
            clicks: this.clicks,
            revenue: this.revenue,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        };
        
        console.log('📊 Ad Stats:', stats);
        // Here you would send to your analytics server
    }

    // Ad optimization
    optimizeAds() {
        // A/B testing for ad positions
        const adContainers = document.querySelectorAll('.ad-container');
        adContainers.forEach((container, index) => {
            if (index % 2 === 0) {
                container.style.borderColor = '#27AE60'; // Test variant
            }
        });
    }

    // Revenue methods
    calculateDailyRevenue() {
        const avgCTR = 0.02; // 2% click-through rate
        const avgCPC = 0.50; // 50 cents per click
        const dailyViews = 1000; // estimated daily views
        
        return dailyViews * avgCTR * avgCPC;
    }

    getRevenueProjection() {
        const daily = this.calculateDailyRevenue();
        return {
            daily: daily.toFixed(2),
            monthly: (daily * 30).toFixed(2),
            yearly: (daily * 365).toFixed(2)
        };
    }
}

// Ad Utils
const AdUtils = {
    // Create responsive ad
    createResponsiveAd(container, adData) {
        const ad = document.createElement('div');
        ad.className = 'ad-container ad-animated';
        ad.dataset.adId = adData.id;
        ad.dataset.revenue = adData.revenue;
        
        ad.innerHTML = `
            <div class="ad-label">Publicité</div>
            <h4 style="color: #0F4C3A; margin-bottom: 1rem;">${adData.title}</h4>
            <p style="color: #2C1810; margin-bottom: 1rem;">${adData.description}</p>
            <a href="${adData.link}" class="ad-cta" target="_blank">${adData.cta}</a>
        `;
        
        container.appendChild(ad);
        return ad;
    },

    // Load external ad scripts
    loadAdScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = callback;
        document.head.appendChild(script);
    },

    // Check if ad is viewable
    isAdViewable(element) {
        const rect = element.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
        
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= viewHeight &&
            rect.left <= viewWidth
        );
    }
};

// Initialize Ad Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adManager = new AdManager();
    
    // Add revenue projection to console
    const projection = window.adManager.getRevenueProjection();
    console.log('💰 Revenue Projection:', projection);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdManager, AdUtils };
}
