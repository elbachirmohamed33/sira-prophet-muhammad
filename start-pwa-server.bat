@echo off
echo =====================================================
echo       Serveur PWA - Sira ^& Coran
echo =====================================================
echo.

cd /d "%~dp0"

echo Demarrage du serveur local pour tester la PWA...
echo Repertoire: %CD%
echo.

REM Essayer differentes options pour demarrer un serveur
echo [1/4] Tentative avec Python...
python -m http.server 8080 2>nul
if %errorlevel% equ 0 goto :success

echo [2/4] Tentative avec Python3...
python3 -m http.server 8080 2>nul
if %errorlevel% equ 0 goto :success

echo [3/4] Tentative avec Node.js...
where node >nul 2>&1
if %errorlevel% equ 0 (
    npx http-server -p 8080 -o
    if %errorlevel% equ 0 goto :success
)

echo [4/4] Tentative avec PHP...
where php >nul 2>&1
if %errorlevel% equ 0 (
    php -S localhost:8080
    if %errorlevel% equ 0 goto :success
)

echo.
echo ❌ Aucun serveur HTTP disponible trouve.
echo.
echo 💡 Solutions:
echo    1. Installer Python: https://python.org
echo    2. Installer Node.js: https://nodejs.org
echo    3. Utiliser un serveur web local comme XAMPP/WAMP
echo    4. Ouvrir directement app-sira-quran.html dans le navigateur
echo.
echo ⚠️  Note: Pour tester completement la PWA, un serveur HTTPS est recommande.
echo.
pause
goto :end

:success
echo.
echo ✅ Serveur demarre avec succes!
echo.
echo 🌐 Application disponible sur:
echo    http://localhost:8080/app-sira-quran.html
echo.
echo 📱 Pour tester la PWA:
echo    1. Ouvrez Chrome/Edge
echo    2. Allez sur http://localhost:8080/app-sira-quran.html  
echo    3. Cliquez sur l'icone d'installation dans la barre d'adresse
echo    4. Testez les fonctionnalites hors ligne
echo.
echo 🛑 Appuyez sur Ctrl+C pour arreter le serveur
echo.

:end
