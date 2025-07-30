// ===========================
// GOOGLE ADSENSE INTEGRATION
// Simple AdSense management
// ===========================

class AdSenseManager {
    constructor() {
        this.initializeAdSense();
    }

    initializeAdSense() {
        // Check if AdSense script is already loaded
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            this.loadAdSenseScript();
        }

        // Setup AdSense slots
        this.setupAdSlots();
        
        console.log('📢 Google AdSense Initialized');
    }

    loadAdSenseScript() {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-VOTRE-ID-ADSENSE'; // Replace with your AdSense ID
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }

    setupAdSlots() {
        // Find all AdSense placeholder slots
        const adSlots = document.querySelectorAll('.adsense-slot');
        
        adSlots.forEach((slot, index) => {
            if (!slot.dataset.initialized) {
                this.createAdUnit(slot, index);
                slot.dataset.initialized = 'true';
            }
        });
    }

    createAdUnit(container, index) {
        // Create AdSense ad unit
        const adUnit = document.createElement('ins');
        adUnit.className = 'adsbygoogle';
        adUnit.style.display = 'block';
        
        // Set ad unit attributes based on container size
        const width = container.offsetWidth || 728;
        const height = container.offsetHeight || 90;
        
        if (width >= 728 && height >= 90) {
            // Leaderboard
            adUnit.setAttribute('data-ad-slot', '1234567890'); // Replace with your ad slot ID
            adUnit.setAttribute('data-ad-format', 'auto');
        } else if (width >= 300 && height >= 250) {
            // Rectangle
            adUnit.setAttribute('data-ad-slot', '0987654321'); // Replace with your ad slot ID
            adUnit.setAttribute('data-ad-format', 'rectangle');
        } else {
            // Responsive
            adUnit.setAttribute('data-ad-slot', '1122334455'); // Replace with your ad slot ID
            adUnit.setAttribute('data-ad-format', 'auto');
            adUnit.setAttribute('data-full-width-responsive', 'true');
        }

        // Replace placeholder content with actual ad unit
        container.innerHTML = '';
        container.appendChild(adUnit);

        // Push ad for rendering (when AdSense script is loaded)
        if (window.adsbygoogle) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.warn('AdSense push failed:', e);
            }
        } else {
            // Wait for AdSense script to load
            this.waitForAdSense(() => {
                try {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    console.warn('AdSense push failed:', e);
                }
            });
        }
    }

    waitForAdSense(callback, maxAttempts = 50) {
        let attempts = 0;
        
        const checkAdSense = () => {
            attempts++;
            
            if (window.adsbygoogle) {
                callback();
            } else if (attempts < maxAttempts) {
                setTimeout(checkAdSense, 100);
            } else {
                console.warn('AdSense script not loaded after maximum attempts');
            }
        };
        
        checkAdSense();
    }

    // Method to add more ad units dynamically
    addAdUnit(container, adSlotId, format = 'auto') {
        const adUnit = document.createElement('ins');
        adUnit.className = 'adsbygoogle';
        adUnit.style.display = 'block';
        adUnit.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXX'); // Replace with your AdSense ID
        adUnit.setAttribute('data-ad-slot', adSlotId);
        adUnit.setAttribute('data-ad-format', format);
        
        if (format === 'auto') {
            adUnit.setAttribute('data-full-width-responsive', 'true');
        }

        container.appendChild(adUnit);

        // Push for rendering
        if (window.adsbygoogle) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.warn('AdSense push failed:', e);
            }
        }
    }

    // Check if ads are blocked
    detectAdBlocker() {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        testAd.style.position = 'fixed';
        testAd.style.left = '-999px';
        testAd.style.top = '-999px';
        document.body.appendChild(testAd);

        setTimeout(() => {
            if (testAd.offsetHeight === 0) {
                console.log('🚫 Ad blocker detected');
                this.showAdBlockMessage();
            }
            document.body.removeChild(testAd);
        }, 100);
    }

    showAdBlockMessage() {
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
                font-family: 'Inter', sans-serif;
            ">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">🤲 Cher Visiteur</div>
                <div style="font-size: 0.9rem; line-height: 1.4; margin-bottom: 1rem;">
                    Les revenus publicitaires nous aident à maintenir ce site éducatif gratuit. Pensez à nous ajouter à votre liste blanche.
                </div>
                <button onclick="this.parentNode.parentNode.remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 10px;
                    cursor: pointer;
                    width: 100%;
                    font-weight: 600;
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adSenseManager = new AdSenseManager();
    
    // Check for ad blocker after 2 seconds
    setTimeout(() => {
        window.adSenseManager.detectAdBlocker();
    }, 2000);
});

// Instructions for setting up Google AdSense:
console.log(`
📋 GOOGLE ADSENSE SETUP INSTRUCTIONS:

1. 🔑 Get AdSense Account:
   - Visit https://www.google.com/adsense/
   - Apply for an account with your website
   - Wait for approval (can take 1-7 days)

2. 📝 Replace Placeholder IDs:
   - Replace 'ca-pub-XXXXXXXXX' with your AdSense publisher ID
   - Replace ad slot IDs (1234567890, etc.) with your actual slot IDs

3. 💰 Revenue Potential:
   - Educational sites: $0.20 - $2.00 per 1000 views
   - Religious content: $0.10 - $0.80 per 1000 views
   - French/Arabic traffic: $0.15 - $1.20 per 1000 views

4. 📊 Expected Monthly Revenue (1000+ daily visitors):
   - Conservative: €50-150/month
   - Average: €100-300/month
   - Good performance: €200-500/month

5. ⚡ Optimization Tips:
   - Place ads above the fold
   - Use responsive ad units
   - Test different ad positions
   - Monitor performance in AdSense dashboard
`);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdSenseManager;
}
