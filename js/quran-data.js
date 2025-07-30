// Données du Coran avec sourates complètes
const QURAN_DATA = {
  surahs: [
    {
      number: 1,
      name: 'الفاتحة',
      transliteration: 'Al-Fatiha',
      translation: 'L\'Ouverture',
      revelation: 'Mecque',
      verses: 7,
      arabic: [
        'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        'الرَّحْمَٰنِ الرَّحِيمِ',
        'مَالِكِ يَوْمِ الدِّينِ',
        'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
      ],
      phonetic: [
        'Bismi Allahi ar-rahmani ar-rahimi',
        'Al-hamdu lillahi rabbi al-alamina',
        'Ar-rahmani ar-rahimi',
        'Maliki yawmi ad-dini',
        'Iyyaka na\'budu wa iyyaka nasta\'inu',
        'Ihdina as-sirata al-mustaqima',
        'Sirata alladhina an\'amta \'alayhim ghayri al-maghdubi \'alayhim wa la ad-dallina'
      ],
      french: [
        'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux.',
        'Louange à Allah, Seigneur de l\'univers.',
        'Le Tout Miséricordieux, le Très Miséricordieux,',
        'Maître du Jour de la rétribution.',
        'C\'est Toi [Seul] que nous adorons, et c\'est Toi [Seul] dont nous implorons secours.',
        'Guide-nous dans le droit chemin,',
        'le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.'
      ]
    },
    {
      number: 2,
      name: 'البقرة',
      transliteration: 'Al-Baqarah',
      translation: 'La Vache',
      revelation: 'Médine',
      verses: 286,
      arabic: [
        'الم',
        'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
        'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
        'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
        'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ'
        // Note: Sourate 2 a 286 versets - ici on montre les 5 premiers pour l'exemple
      ],
      phonetic: [
        'Alif-lam-mim',
        'Dhalika al-kitabu la rayba fihi hudan lil-muttaqina',
        'Alladhina yu\'minuna bil-ghaybi wa yuqimuna as-salata wa mimma razaqnahum yunfiquna',
        'Wa alladhina yu\'minuna bima unzila ilayka wa ma unzila min qablika wa bil-akhirati hum yuqinuna',
        'Ula\'ika \'ala hudan min rabbihim wa ula\'ika humu al-muflihuna'
      ],
      french: [
        'Alif, Lam, Mim.',
        'C\'est le Livre au sujet duquel il n\'y a aucun doute, c\'est un guide pour les pieux,',
        'qui croient à l\'invisible et accomplissent la Salat et dépensent [dans l\'obéissance à Allah], de ce que Nous leur avons attribué,',
        'Ceux qui croient à ce qui t\'a été descendu (le Coran) et à ce qui a été descendu avant toi et qui croient fermement à la vie future.',
        'Ceux-là sont sur le bon chemin de leur Seigneur, et ce sont eux qui réussissent (dans cette vie et dans la vie future).'
      ]
    },
    {
      number: 3,
      name: 'آل عمران',
      transliteration: 'Ali \'Imran',
      translation: 'La Famille d\'Imran',
      revelation: 'Médine',
      verses: 200,
      arabic: [
        'الم',
        'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
        'نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَأَنزَلَ التَّوْرَاةَ وَالْإِنجِيلَ',
        'مِن قَبْلُ هُدًى لِّلنَّاسِ وَأَنزَلَ الْفُرْقَانَ ۗ إِنَّ الَّذِينَ كَفَرُوا بِآيَاتِ اللَّهِ لَهُمْ عَذَابٌ شَدِيدٌ ۗ وَاللَّهُ عَزِيزٌ ذُو انتِقَامٍ'
      ],
      phonetic: [
        'Alif-lam-mim',
        'Allahu la ilaha illa huwa al-hayyu al-qayyumu',
        'Nazzala \'alayka al-kitaba bil-haqqi musaddiqan lima bayna yadayhi wa anzala at-tawrata wa al-injila',
        'Min qablu hudan lin-nasi wa anzala al-furqana inna alladhina kafaru bi-ayati Allahi lahum \'adhabun shadidun wa Allahu \'azizun dhu intiqamin'
      ],
      french: [
        'Alif, Lam, Mim.',
        'Allah! Pas de divinité à part Lui, le Vivant, Celui qui subsiste par lui-même \'al-Qayyum\'.',
        'Il a fait descendre sur toi le Livre avec la vérité, confirmant les Livres descendus avant lui. Et Il fit descendre la Thora et l\'Évangile',
        'auparavant, en tant que guide pour les gens. Et Il a fait descendre le Discernement. Ceux qui ne croient pas aux Révélations d\'Allah auront, certes, un dur châtiment! Et Allah est Puissant, Détenteur du pouvoir de punir.'
      ]
    },
    {
      number: 4,
      name: 'النساء',
      transliteration: 'An-Nisa\'',
      translation: 'Les Femmes',
      revelation: 'Médine',
      verses: 176,
      arabic: [
        'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً ۚ وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا'
      ],
      phonetic: [
        'Ya ayyuha an-nasu attaqu rabbakumu alladhi khalaqakum min nafsin wahidatin wa khalaqa minha zawjaha wa baththa minhuma rijalan kathiran wa nisa\'an wa attaqu Allaha alladhi tasa\'aluna bihi wa al-arhama inna Allaha kana \'alaykum raqiban'
      ],
      french: [
        'Ô hommes! Craignez votre Seigneur qui vous a créés d\'un seul être, et a créé de celui-ci son épouse, et qui de ces deux là a fait répandre (sur la terre) beaucoup d\'hommes et de femmes. Craignez Allah au nom duquel vous vous implorez les uns les autres, et craignez de rompre les liens du sang. Certes Allah vous observe parfaitement.'
      ]
    },
    {
      number: 5,
      name: 'المائدة',
      transliteration: 'Al-Ma\'idah',
      translation: 'La Table',
      revelation: 'Médine',
      verses: 120,
      arabic: [
        'يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ ۚ أُحِلَّتْ لَكُم بَهِيمَةُ الْأَنْعَامِ إِلَّا مَا يُتْلَىٰ عَلَيْكُمْ غَيْرَ مُحِلِّي الصَّيْدِ وَأَنتُمْ حُرُمٌ ۗ إِنَّ اللَّهَ يَحْكُمُ مَا يُرِيدُ'
      ],
      phonetic: [
        'Ya ayyuha alladhina amanu awfu bil-\'uqudi uhillat lakum bahimatu al-an\'ami illa ma yutla \'alaykum ghayra muhilli as-saydi wa antum hurumun inna Allaha yahkumu ma yuridu'
      ],
      french: [
        'Ô les croyants! Remplissez fidèlement vos engagements. Vous sont permises les bêtes du cheptel, sauf celles qui vous sont énumérées, non pas en état de sacralisation. Allah ordonne ce qu\'Il veut.'
      ]
    }
    // Note: Pour une application complète, il faudrait ajouter les 109 autres sourates
    // avec tous leurs versets. Ici on montre un échantillon pour la structure.
  ],

  // Index pour la recherche rapide
  searchIndex: {
    byName: {},
    byTransliteration: {},
    byTranslation: {},
    byContent: {}
  },

  // Métadonnées additionnelles
  metadata: {
    totalSurahs: 114,
    totalVerses: 6236,
    totalWords: 77449,
    totalLetters: 323015,
    compilationDate: '2024-01-01',
    version: '1.0.0'
  },

  // Fonction pour initialiser l'index de recherche
  initializeSearchIndex: function() {
    this.surahs.forEach((surah) => {
      // Index par nom arabe
      this.searchIndex.byName[surah.name] = surah.number;
      
      // Index par translittération
      this.searchIndex.byTransliteration[surah.transliteration.toLowerCase()] = surah.number;
      
      // Index par traduction française
      this.searchIndex.byTranslation[surah.translation.toLowerCase()] = surah.number;
      
      // Index par contenu (mots-clés des versets français)
      surah.french.forEach((verse, index) => {
        const words = verse.toLowerCase().split(/\s+/);
        words.forEach((word) => {
          if (word.length > 3) { // Ignorer les mots trop courts
            if (!this.searchIndex.byContent[word]) {
              this.searchIndex.byContent[word] = [];
            }
            this.searchIndex.byContent[word].push({
              surah: surah.number,
              verse: index + 1,
              text: verse
            });
          }
        });
      });
    });
  },

  // Fonction de recherche
  search: function(query) {
    const results = [];
    const queryLower = query.toLowerCase();

    // Recherche par nom de sourate
    Object.keys(this.searchIndex.byTransliteration).forEach((name) => {
      if (name.includes(queryLower)) {
        const surahNumber = this.searchIndex.byTransliteration[name];
        results.push({
          type: 'surah_name',
          surah: surahNumber,
          relevance: name === queryLower ? 100 : 80
        });
      }
    });

    // Recherche par traduction française
    Object.keys(this.searchIndex.byTranslation).forEach((translation) => {
      if (translation.includes(queryLower)) {
        const surahNumber = this.searchIndex.byTranslation[translation];
        results.push({
          type: 'surah_translation',
          surah: surahNumber,
          relevance: translation === queryLower ? 100 : 80
        });
      }
    });

    // Recherche dans le contenu
    Object.keys(this.searchIndex.byContent).forEach((word) => {
      if (word.includes(queryLower)) {
        this.searchIndex.byContent[word].forEach((occurrence) => {
          results.push({
            type: 'verse_content',
            surah: occurrence.surah,
            verse: occurrence.verse,
            text: occurrence.text,
            relevance: word === queryLower ? 100 : 60
          });
        });
      }
    });

    // Trier par pertinence
    return results.sort((a, b) => b.relevance - a.relevance);
  },

  // Fonction pour obtenir une sourate par numéro
  getSurah: function(number) {
    return this.surahs.find(surah => surah.number === number);
  },

  // Fonction pour obtenir un verset spécifique
  getVerse: function(surahNumber, verseNumber) {
    const surah = this.getSurah(surahNumber);
    if (!surah || verseNumber < 1 || verseNumber > surah.verses) {
      return null;
    }

    return {
      surah: surah.number,
      surahName: surah.name,
      verse: verseNumber,
      arabic: surah.arabic[verseNumber - 1],
      phonetic: surah.phonetic[verseNumber - 1],
      french: surah.french[verseNumber - 1]
    };
  },

  // Fonction pour obtenir les statistiques
  getStats: function() {
    return {
      loadedSurahs: this.surahs.length,
      totalSurahs: this.metadata.totalSurahs,
      loadedVerses: this.surahs.reduce((total, surah) => total + surah.arabic.length, 0),
      totalVerses: this.metadata.totalVerses,
      completionPercentage: Math.round((this.surahs.length / this.metadata.totalSurahs) * 100)
    };
  }
};

// Initialiser l'index de recherche au chargement
QURAN_DATA.initializeSearchIndex();

// Exporter pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QURAN_DATA;
}
