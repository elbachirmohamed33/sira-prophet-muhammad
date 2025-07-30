@echo off
echo.
echo ===============================================
echo ✅ VERIFICATION CONFIGURATION PAYPAL
echo ===============================================
echo.

REM Vérifier si nous sommes dans le bon dossier
if not exist "donations.html" (
    echo ❌ Erreur: Vous devez executer ce script depuis le dossier sira-optimized
    echo    Naviguez vers: cd "sira-optimized"
    pause
    exit /b 1
)

echo 🔍 Vérification de la configuration PayPal...
echo.

REM Vérifier donations.html
echo 📄 Vérification de donations.html:
findstr /C:"elbachirmohamedba@gmail.com" donations.html >nul
if %errorlevel%==0 (
    echo ✅ donations.html - Email PayPal configuré correctement
) else (
    echo ❌ donations.html - Email PayPal NON configuré
)

REM Vérifier soutenir.html
echo 📄 Vérification de soutenir.html:
findstr /C:"elbachirmohamedba@gmail.com" soutenir.html >nul
if %errorlevel%==0 (
    echo ✅ soutenir.html - Email PayPal configuré correctement
) else (
    echo ❌ soutenir.html - Email PayPal NON configuré
)

echo.
echo ===============================================
echo 🧪 TESTS DISPONIBLES
echo ===============================================
echo.
echo 1. Ouvrir donations.html dans le navigateur
echo 2. Ouvrir soutenir.html dans le navigateur
echo 3. Tester une donation (1€ recommandé)
echo.

set /p CHOICE="Voulez-vous ouvrir donations.html ? (o/n): "
if /i "%CHOICE%"=="o" (
    echo 🌐 Ouverture de donations.html...
    start donations.html
)

set /p CHOICE2="Voulez-vous ouvrir soutenir.html ? (o/n): "
if /i "%CHOICE2%"=="o" (
    echo 🌐 Ouverture de soutenir.html...
    start soutenir.html
)

echo.
echo ===============================================
echo 📋 PROCHAINES ÉTAPES
echo ===============================================
echo.
echo ✅ 1. Configuration PayPal terminée
echo ⏳ 2. Tester les donations localement
echo ⏳ 3. Déployer sur GitHub avec: deploy-github.bat
echo ⏳ 4. Tester les donations en ligne
echo ⏳ 5. Configurer Google AdSense (optionnel)
echo.
echo 💡 Conseil: Testez avec 1€ pour vérifier que tout fonctionne
echo.
pause
