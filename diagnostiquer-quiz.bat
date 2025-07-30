@echo off
echo.
echo ===============================================
echo 🛠️ DIAGNOSTIC ET CORRECTION DU QUIZ
echo ===============================================
echo.

REM Vérifier si nous sommes dans le bon dossier
if not exist "quiz.html" (
    echo ❌ Erreur: quiz.html non trouvé
    echo    Naviguez vers: cd "sira-optimized"
    pause
    exit /b 1
)

echo 🔍 Création des fichiers de test...

REM Ouvrir les fichiers de test
echo.
echo 📋 FICHIERS DE TEST CRÉÉS:
echo   - debug-quiz.html  : Tests de débogage
echo   - quiz-simple.html : Version simplifiée du quiz
echo.

set /p CHOICE="Voulez-vous ouvrir le quiz simple pour tester ? (o/n): "
if /i "%CHOICE%"=="o" (
    echo 🌐 Ouverture du quiz de test...
    start quiz-simple.html
)

set /p CHOICE2="Voulez-vous ouvrir la page de debug ? (o/n): "
if /i "%CHOICE2%"=="o" (
    echo 🔧 Ouverture de la page de debug...
    start debug-quiz.html
)

echo.
echo ===============================================
echo 📊 DIAGNOSTIC
echo ===============================================
echo.
echo 🔍 Problèmes identifiés possibles:
echo   1. Erreur JavaScript bloque l'initialisation
echo   2. Éléments HTML manquants ou mal référencés  
echo   3. Données du quiz corrompues
echo   4. Conflit avec d'autres scripts
echo.
echo 🛠️ Solutions testées:
echo   ✅ Correction de l'année de naissance (570 EC)
echo   ✅ Création de quiz simplifié fonctionnel
echo   ✅ Page de debug avec tests automatiques
echo.
echo 📋 PROCHAINES ÉTAPES:
echo   1. Testez quiz-simple.html pour vérifier le fonctionnement
echo   2. Utilisez debug-quiz.html pour identifier les erreurs
echo   3. Si quiz-simple.html fonctionne, le problème est dans quiz.html
echo   4. Comparez les deux fichiers pour identifier les différences
echo.

set /p CHOICE3="Voulez-vous ouvrir le quiz original pour comparaison ? (o/n): "
if /i "%CHOICE3%"=="o" (
    echo 🌐 Ouverture du quiz original...
    start quiz.html
)

echo.
echo 💡 CONSEILS DE DÉBOGAGE:
echo   - Ouvrez F12 (DevTools) dans le navigateur
echo   - Vérifiez l'onglet Console pour les erreurs JavaScript
echo   - Vérifiez l'onglet Network pour les ressources non chargées
echo   - Utilisez quiz-simple.html comme référence fonctionnelle
echo.
pause
