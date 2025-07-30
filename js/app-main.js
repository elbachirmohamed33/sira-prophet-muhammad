// Script principal pour l'application Sira & Coran
class SiraQuranApp {
  constructor() {
    this.currentSurah = 1;
    this.currentVerse = 1;
    this.isPlaying = false;
    this.bookmarks = this.loadBookmarks();
    this.searchHistory = this.loadSearchHistory();
    this.readingPreferences = this.loadReadingPreferences();
    this.audioContext = null;
    this.currentAudio = null;
    
    this.init();
  }

  // Initialisation de l'application
  init() {
    this.setupEventListeners();
    this.loadSurah(this.currentSurah);
    this.setupServiceWorker();
    this.setupPWAInstallPrompt();
    this.loadUserPreferences();
    this.initializeSearch();
  }

  // Configuration des écouteurs d'événements
  setupEventListeners() {
    // Navigation des sourates
    document.getElementById('prevSurah')?.addEventListener('click', () => this.previousSurah());
    document.getElementById('nextSurah')?.addEventListener('click', () => this.nextSurah());
    
    // Contrôles audio
    document.getElementById('playBtn')?.addEventListener('click', () => this.toggleAudio());
    document.getElementById('pauseBtn')?.addEventListener('click', () => this.pauseAudio());
    document.getElementById('stopBtn')?.addEventListener('click', () => this.stopAudio());
    
    // Recherche
    document.getElementById('searchInput')?.addEventListener('input', (e) => this.performSearch(e.target.value));
    document.getElementById('searchBtn')?.addEventListener('click', () => this.showSearchModal());
    
    // Favoris et marque-pages
    document.getElementById('bookmarkBtn')?.addEventListener('click', () => this.toggleBookmark());
    document.getElementById('favoritesBtn')?.addEventListener('click', () => this.showFavorites());
    
    // Paramètres
    document.getElementById('settingsBtn')?.addEventListener('click', () => this.showSettings());
    
    // Sélecteur de sourate
    document.getElementById('surahSelect')?.addEventListener('change', (e) => {
      this.loadSurah(parseInt(e.target.value));
    });

    // Gestion du clavier
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Gestion du mode hors ligne
    window.addEventListener('online', () => this.updateOnlineStatus(true));
    window.addEventListener('offline', () => this.updateOnlineStatus(false));
  }

  // Chargement d'une sourate
  loadSurah(surahNumber) {
    if (surahNumber < 1 || surahNumber > 114) return;
    
    this.currentSurah = surahNumber;
    this.currentVerse = 1;
    
    const surah = QURAN_DATA.getSurah(surahNumber);
    if (!surah) {
      this.showError('Sourate non trouvée');
      return;
    }

    this.displaySurah(surah);
    this.updateNavigation();
    this.updateURL();
    this.saveReadingPosition();
  }

  // Affichage d'une sourate
  displaySurah(surah) {
    const container = document.getElementById('surahContent');
    if (!container) return;

    // Mise à jour du titre
    document.getElementById('surahTitle').textContent = `${surah.number}. ${surah.name} - ${surah.translation}`;
    document.getElementById('surahInfo').textContent = `${surah.transliteration} • ${surah.revelation} • ${surah.verses} versets`;

    // Affichage des versets
    let versesHTML = '';
    surah.arabic.forEach((arabicVerse, index) => {
      const verseNumber = index + 1;
      const phoneticVerse = surah.phonetic[index] || '';
      const frenchVerse = surah.french[index] || '';
      
      versesHTML += `
        <div class="verse-container" data-verse="${verseNumber}">
          <div class="verse-number">${verseNumber}</div>
          
          <div class="verse-arabic" dir="rtl" lang="ar">
            ${arabicVerse}
          </div>
          
          <div class="verse-phonetic">
            <em>${phoneticVerse}</em>
          </div>
          
          <div class="verse-french">
            ${frenchVerse}
          </div>
          
          <div class="verse-controls">
            <button class="btn-verse-audio" data-verse="${verseNumber}" title="Écouter ce verset">
              🔊
            </button>
            <button class="btn-verse-bookmark" data-verse="${verseNumber}" title="Marquer ce verset">
              🔖
            </button>
            <button class="btn-verse-share" data-verse="${verseNumber}" title="Partager ce verset">
              📤
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = versesHTML;

    // Ajouter les écouteurs pour les contrôles de versets
    this.setupVerseControls();
  }

  // Configuration des contrôles de versets
  setupVerseControls() {
    // Boutons audio des versets
    document.querySelectorAll('.btn-verse-audio').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const verseNumber = parseInt(e.target.dataset.verse);
        this.playVerse(this.currentSurah, verseNumber);
      });
    });

    // Boutons marque-pages des versets
    document.querySelectorAll('.btn-verse-bookmark').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const verseNumber = parseInt(e.target.dataset.verse);
        this.toggleVerseBookmark(this.currentSurah, verseNumber);
      });
    });

    // Boutons partage des versets
    document.querySelectorAll('.btn-verse-share').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const verseNumber = parseInt(e.target.dataset.verse);
        this.shareVerse(this.currentSurah, verseNumber);
      });
    });

    // Mise à jour de l'état des favoris
    this.updateBookmarkButtons();
  }

  // Navigation précédente
  previousSurah() {
    if (this.currentSurah > 1) {
      this.loadSurah(this.currentSurah - 1);
    }
  }

  // Navigation suivante
  nextSurah() {
    if (this.currentSurah < 114) {
      this.loadSurah(this.currentSurah + 1);
    }
  }

  // Lecture audio d'un verset
  playVerse(surahNumber, verseNumber) {
    // Simuler la lecture audio (à remplacer par une vraie implémentation)
    console.log(`Lecture du verset ${verseNumber} de la sourate ${surahNumber}`);
    
    // Ici, vous pourriez utiliser Web Audio API ou des fichiers audio
    this.showNotification(`Lecture: Sourate ${surahNumber}, Verset ${verseNumber}`);
  }

  // Gestion des favoris/marque-pages
  toggleVerseBookmark(surahNumber, verseNumber) {
    const bookmarkKey = `${surahNumber}:${verseNumber}`;
    
    if (this.bookmarks.includes(bookmarkKey)) {
      this.bookmarks = this.bookmarks.filter(b => b !== bookmarkKey);
      this.showNotification('Marque-page supprimé');
    } else {
      this.bookmarks.push(bookmarkKey);
      this.showNotification('Marque-page ajouté');
    }
    
    this.saveBookmarks();
    this.updateBookmarkButtons();
  }

  // Partage d'un verset
  async shareVerse(surahNumber, verseNumber) {
    const verse = QURAN_DATA.getVerse(surahNumber, verseNumber);
    if (!verse) return;

    const shareText = `${verse.arabic}\n\n"${verse.french}"\n\nSourate ${verse.surahName} (${surahNumber}:${verseNumber})`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Verset du Coran - ${verse.surahName}`,
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Partage annulé ou erreur:', error);
      }
    } else {
      // Fallback: copier dans le presse-papiers
      navigator.clipboard.writeText(shareText).then(() => {
        this.showNotification('Verset copié dans le presse-papiers');
      });
    }
  }

  // Recherche
  performSearch(query) {
    if (query.length < 2) return;

    const results = QURAN_DATA.search(query);
    this.displaySearchResults(results);
    
    // Sauvegarder dans l'historique
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      this.searchHistory = this.searchHistory.slice(0, 10); // Garder seulement 10 recherches
      this.saveSearchHistory();
    }
  }

  // Affichage des résultats de recherche
  displaySearchResults(results) {
    const container = document.getElementById('searchResults');
    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = '<p class="no-results">Aucun résultat trouvé</p>';
      return;
    }

    let resultsHTML = '<div class="search-results-list">';
    
    results.forEach(result => {
      if (result.type === 'verse_content') {
        resultsHTML += `
          <div class="search-result-item" data-surah="${result.surah}" data-verse="${result.verse}">
            <div class="result-reference">Sourate ${result.surah}, Verset ${result.verse}</div>
            <div class="result-text">${result.text}</div>
          </div>
        `;
      } else if (result.type === 'surah_name' || result.type === 'surah_translation') {
        const surah = QURAN_DATA.getSurah(result.surah);
        resultsHTML += `
          <div class="search-result-item" data-surah="${result.surah}">
            <div class="result-reference">Sourate ${result.surah}</div>
            <div class="result-text">${surah.name} - ${surah.translation}</div>
          </div>
        `;
      }
    });
    
    resultsHTML += '</div>';
    container.innerHTML = resultsHTML;

    // Ajouter les écouteurs de clic
    container.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const surahNumber = parseInt(item.dataset.surah);
        const verseNumber = item.dataset.verse ? parseInt(item.dataset.verse) : 1;
        
        this.loadSurah(surahNumber);
        if (verseNumber > 1) {
          this.scrollToVerse(verseNumber);
        }
        this.closeSearchModal();
      });
    });
  }

  // Défilement vers un verset
  scrollToVerse(verseNumber) {
    setTimeout(() => {
      const verseElement = document.querySelector(`[data-verse="${verseNumber}"]`);
      if (verseElement) {
        verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        verseElement.classList.add('highlighted');
        setTimeout(() => verseElement.classList.remove('highlighted'), 3000);
      }
    }, 500);
  }

  // Gestion du Service Worker
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker enregistré:', registration);
        })
        .catch(error => {
          console.log('Erreur Service Worker:', error);
        });
    }
  }

  // Configuration de l'invite d'installation PWA
  setupPWAInstallPrompt() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Afficher le bouton d'installation
      const installBtn = document.getElementById('installBtn');
      if (installBtn) {
        installBtn.style.display = 'block';
        installBtn.addEventListener('click', () => {
          installBtn.style.display = 'none';
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('Installation PWA acceptée');
            }
            deferredPrompt = null;
          });
        });
      }
    });
  }

  // Gestion du statut en ligne/hors ligne
  updateOnlineStatus(isOnline) {
    const statusIndicator = document.getElementById('onlineStatus');
    if (statusIndicator) {
      statusIndicator.textContent = isOnline ? '🟢 En ligne' : '🔴 Hors ligne';
      statusIndicator.className = isOnline ? 'online' : 'offline';
    }
    
    if (!isOnline) {
      this.showNotification('Mode hors ligne activé');
    }
  }

  // Gestion du clavier
  handleKeyboard(e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'f':
          e.preventDefault();
          this.showSearchModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.previousSurah();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextSurah();
          break;
      }
    }
    
    if (e.key === 'Escape') {
      this.closeAllModals();
    }
  }

  // Sauvegarde et chargement des données locales
  saveBookmarks() {
    localStorage.setItem('sira-quran-bookmarks', JSON.stringify(this.bookmarks));
  }

  loadBookmarks() {
    const saved = localStorage.getItem('sira-quran-bookmarks');
    return saved ? JSON.parse(saved) : [];
  }

  saveSearchHistory() {
    localStorage.setItem('sira-quran-search-history', JSON.stringify(this.searchHistory));
  }

  loadSearchHistory() {
    const saved = localStorage.getItem('sira-quran-search-history');
    return saved ? JSON.parse(saved) : [];
  }

  saveReadingPosition() {
    localStorage.setItem('sira-quran-position', JSON.stringify({
      surah: this.currentSurah,
      verse: this.currentVerse,
      timestamp: Date.now()
    }));
  }

  loadReadingPreferences() {
    const saved = localStorage.getItem('sira-quran-preferences');
    return saved ? JSON.parse(saved) : {
      arabicSize: 'medium',
      frenchSize: 'medium',
      phoneticVisible: true,
      darkMode: false,
      autoScroll: true
    };
  }

  // Utilitaires d'interface
  showNotification(message, type = 'info') {
    // Créer et afficher une notification toast
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
      modal.style.display = 'block';
      document.getElementById('searchInput')?.focus();
    }
  }

  closeSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
    });
  }

  updateNavigation() {
    const prevBtn = document.getElementById('prevSurah');
    const nextBtn = document.getElementById('nextSurah');
    
    if (prevBtn) prevBtn.disabled = this.currentSurah <= 1;
    if (nextBtn) nextBtn.disabled = this.currentSurah >= 114;
  }

  updateURL() {
    const url = new URL(window.location);
    url.searchParams.set('surah', this.currentSurah);
    window.history.replaceState({}, '', url);
  }

  updateBookmarkButtons() {
    document.querySelectorAll('.btn-verse-bookmark').forEach(btn => {
      const verseNumber = parseInt(btn.dataset.verse);
      const bookmarkKey = `${this.currentSurah}:${verseNumber}`;
      btn.classList.toggle('bookmarked', this.bookmarks.includes(bookmarkKey));
    });
  }
}

// Initialiser l'application quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  window.siraQuranApp = new SiraQuranApp();
});

// Fonction globale pour charger une sourate (utilisable depuis les liens externes)
function loadSurah(number) {
  if (window.siraQuranApp) {
    window.siraQuranApp.loadSurah(number);
  }
}
