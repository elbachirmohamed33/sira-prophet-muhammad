@echo off
echo.
echo ===============================================
echo 💰 CONFIGURATION MONETISATION
echo ===============================================
echo.

REM Vérifier si nous sommes dans le bon dossier
if not exist "soutenir.html" (
    echo ❌ Erreur: Vous devez executer ce script depuis le dossier sira-optimized
    echo    Naviguez vers: cd "sira-optimized"
    pause
    exit /b 1
)

echo 📧 CONFIGURATION PAYPAL
echo.
set /p EMAIL_PAYPAL="Entrez votre adresse email PayPal: "

if "%EMAIL_PAYPAL%"=="" (
    echo ❌ Email PayPal requis!
    pause
    exit /b 1
)

echo.
echo 🌐 CONFIGURATION GOOGLE ADSENSE
echo    Format: ca-pub-1234567890123456
echo.
set /p ID_ADSENSE="Entrez votre ID Google AdSense (ou laissez vide pour plus tard): "

echo.
echo ===============================================
echo 🔧 APPLICATION DES CONFIGURATIONS...
echo ===============================================

REM Configuration PayPal
echo 📧 Configuration PayPal...
powershell -Command "(Get-Content 'soutenir.html') -replace 'VOTRE-VRAI-EMAIL@example.com', '%EMAIL_PAYPAL%' | Set-Content 'soutenir.html'"
powershell -Command "(Get-Content 'donations.html') -replace 'VOTRE-EMAIL-PAYPAL@example.com', '%EMAIL_PAYPAL%' | Set-Content 'donations.html'"

if errorlevel 1 (
    echo ❌ Erreur lors de la configuration PayPal
) else (
    echo ✅ PayPal configuré avec: %EMAIL_PAYPAL%
)

REM Configuration AdSense (si fournie)
if not "%ID_ADSENSE%"=="" (
    echo 🌐 Configuration Google AdSense...
    powershell -Command "(Get-Content 'js/adsense.js') -replace 'ca-pub-VOTRE-ID-ADSENSE', '%ID_ADSENSE%' | Set-Content 'js/adsense.js'"
    
    if errorlevel 1 (
        echo ❌ Erreur lors de la configuration AdSense
    ) else (
        echo ✅ AdSense configuré avec: %ID_ADSENSE%
    )
) else (
    echo ⚠️  AdSense non configuré - vous pourrez le faire plus tard
)

echo.
echo ===============================================
echo ✅ CONFIGURATION TERMINÉE!
echo ===============================================
echo.
echo 📋 PROCHAINES ÉTAPES:
echo.
echo 1. 🏦 PayPal configuré avec: %EMAIL_PAYPAL%
if not "%ID_ADSENSE%"=="" (
    echo 2. 🌐 AdSense configuré avec: %ID_ADSENSE%
) else (
    echo 2. 🌐 AdSense: Obtenez votre ID et relancez ce script
)
echo 3. 🚀 Déployez sur GitHub avec: deploy-github.bat
echo 4. 📊 Testez les donations sur votre site en ligne
echo.
echo 📚 Guide complet: GUIDE_MONETISATION.md
echo.
pause
