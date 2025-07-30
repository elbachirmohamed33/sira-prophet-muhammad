@echo off
echo ========================================
echo    DEPLOIEMENT GITHUB - SIRA OPTIMIZED
echo         Application PWA Complete
echo ========================================
echo.

cd /d "%~dp0"

echo 📁 Repertoire: %CD%
echo 🕌 Application: Sira du Prophete Muhammad ﷺ
echo.

echo [1/6] Verification de Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git n'est pas installe.
    echo 💡 Telechargez Git: https://git-scm.com/download/windows
    pause
    exit /b 1
)
echo ✅ Git detecte

echo.
echo [2/6] Verification des fichiers...
if not exist "index.html" (
    echo ❌ Fichier index.html manquant
    echo 💡 Assurez-vous d'etre dans le dossier sira-optimized
    pause
    exit /b 1
)

if not exist "app-sira-quran.html" (
    echo ❌ Fichier app-sira-quran.html manquant
    pause
    exit /b 1
)

if not exist "manifest.json" (
    echo ❌ Fichier manifest.json manquant
    pause
    exit /b 1
)

echo ✅ Fichiers principaux detectes

echo.
echo [3/6] Initialisation Git...
if not exist ".git" (
    git init
    echo ✅ Repository Git initialise
) else (
    echo ✅ Repository Git deja initialise
)

REM Creer .gitignore si inexistant
if not exist ".gitignore" (
    echo node_modules/ > .gitignore
    echo .DS_Store >> .gitignore
    echo *.log >> .gitignore
    echo .env >> .gitignore
    echo Thumbs.db >> .gitignore
    echo ✅ Fichier .gitignore cree
)

echo.
echo [4/6] Ajout des fichiers...
git add .
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'ajout des fichiers
    pause
    exit /b 1
)
echo ✅ Fichiers ajoutes au staging

echo.
echo [5/6] Commit des modifications...
git commit -m "🕌 Application Sira & Coran PWA - Version complete pour production

✨ Application educative complete:
- PWA Sira du Prophete Muhammad ﷺ + Saint Coran
- 15 periodes historiques detaillees avec sources authentiques  
- Quiz interactifs (25 questions) et cartes historiques
- Galerie educative et lecteur audio integre
- Support multilingue: Francais, Anglais, Arabe (RTL)
- Mode hors ligne complet avec Service Worker
- Google AdSense integre respectueusement
- Design islamique moderne et responsive
- Fonctionnalites PWA: installation, notifications

📱 Technologies modernes:
- HTML5 semantique et CSS3 Grid/Flexbox
- JavaScript ES6+ avec PWA APIs
- Service Workers pour cache intelligent
- Web App Manifest pour installation native
- LocalStorage pour preferences utilisateur

🎯 Mission educative:
- Sources authentiques: Bukhari, Muslim, Ibn Hisham, At-Tabari
- Approche respectueuse de l'Islam
- Gratuit pour tous avec monetisation ethique
- Developpe avec devotion pour la Oumma

Qu'Allah bénisse ce travail educatif. Ameen."

if %errorlevel% neq 0 (
    echo ❌ Erreur lors du commit
    pause
    exit /b 1
)
echo ✅ Commit cree avec succes

echo.
echo [6/6] Configuration GitHub...
set /p GITHUB_USERNAME="🔗 Entrez votre nom d'utilisateur GitHub: "

if "%GITHUB_USERNAME%"=="" (
    echo ❌ Nom d'utilisateur requis
    pause
    exit /b 1
)

set /p REPO_NAME="📁 Nom du repository (appuyez sur Entree pour 'sira-prophete-muhammad'): "
if "%REPO_NAME%"=="" set REPO_NAME=sira-prophete-muhammad

echo.
echo 🔗 Configuration: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

REM Supprimer l'ancienne origine s'il y en a une
git remote remove origin >nul 2>&1

git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
if %errorlevel% neq 0 (
    echo ❌ Erreur configuration origine
    pause
    exit /b 1
)

git branch -M main
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ❌ Erreur lors du push vers GitHub
    echo.
    echo 🔍 Verifications necessaires:
    echo   1. Le repository existe-t-il sur GitHub?
    echo      👉 Allez sur https://github.com/new
    echo      👉 Nom: %REPO_NAME%
    echo      👉 Public ✅ (pour GitHub Pages gratuit)
    echo      👉 Ne pas cocher "Add README" (vous en avez deja un)
    echo      👉 Cliquez "Create repository"
    echo.
    echo   2. Vos identifiants GitHub sont-ils corrects?
    echo   3. Avez-vous une connexion internet?
    echo.
    echo 💡 Une fois le repository cree sur GitHub, relancez ce script.
    pause
    exit /b 1
)

echo.
echo ========================================
echo        ✅ DEPLOIEMENT REUSSI ! 🎉
echo ========================================
echo.
echo 🌐 Votre application sera bientot disponible sur:
echo    👉 https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/
echo.
echo 📱 Pages principales de l'application:
echo    🏠 Accueil: /index.html
echo    📱 App PWA: /app-sira-quran.html
echo    📖 Sira FR: /fr/index_v2.html
echo    🧠 Quiz: /quiz.html
echo    🗺️ Cartes: /carte_interactive.html
echo    🎵 Audio: /audio.html
echo    🖼️ Galerie: /galerie.html
echo    🌍 Anglais: /en/index_v2.html
echo    🌍 Arabe: /ar/index_v2.html
echo.
echo 🔧 PROCHAINES ETAPES IMPORTANTES:
echo    1. 👉 Allez sur: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo    2. 👉 Cliquez sur "Settings" (en haut)
echo    3. 👉 Scrollez jusqu'a la section "Pages" (menu gauche)
echo    4. 👉 Dans "Source", selectionnez "Deploy from a branch"
echo    5. 👉 Dans "Branch", selectionnez "main"
echo    6. 👉 Dans "Folder", laissez "/ (root)"
echo    7. 👉 Cliquez "Save"
echo    8. ⏰ Attendez 5-10 minutes pour le deploiement
echo    9. 🎉 Visitez votre site!
echo.
echo 📊 Statistiques de l'application:
echo    📚 15 periodes de la Sira
echo    📖 114 sourates du Coran (structure)
echo    🧠 25 questions de quiz
echo    🌍 3 langues supportees
echo    📱 PWA complete avec mode hors ligne
echo    🎨 Design islamique authentique
echo.
echo 💰 Monetisation:
echo    💡 N'oubliez pas de configurer votre Google AdSense
echo    👉 Remplacez "VOTRE-ID" dans les fichiers par votre vraie ID
echo    👉 Publicites respectueuses du contenu religieux
echo.
echo 🔄 Pour les futures mises a jour:
echo    1. Modifiez vos fichiers dans VS Code
echo    2. Relancez ce script deploy-github.bat
echo    3. Votre site se met a jour automatiquement!
echo.
echo 🤲 MISSION ACCOMPLIE!
echo.
echo 🕌 Votre application educative Sira du Prophete Muhammad ﷺ
echo    est maintenant prete a servir la Oumma musulmane mondiale
echo    et tous ceux qui souhaitent decouvrir l'Islam authentique.
echo.
echo    Qu'Allah ﷻ benisse ce travail et en fasse un moyen 
echo    de guidance pour tous. Ameen.
echo.
echo 📧 En cas de probleme:
echo    👉 GitHub Issues: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%/issues
echo    👉 Documentation: README.md dans votre repository
echo.
pause
