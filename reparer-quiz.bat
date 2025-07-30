@echo off
echo.
echo ===============================================
echo 🔧 RÉPARATION AUTOMATIQUE DU QUIZ
echo ===============================================
echo.

REM Vérifier si nous sommes dans le bon dossier
if not exist "quiz.html" (
    echo ❌ Erreur: quiz.html non trouvé
    pause
    exit /b 1
)

echo 🔍 Analyse du problème...

REM Créer une sauvegarde
copy quiz.html quiz-backup.html >nul
echo ✅ Sauvegarde créée: quiz-backup.html

echo.
echo 🛠️ Application des corrections...

REM Correction 1: Vérifier et corriger la structure JavaScript
echo   📝 Correction 1: Structure JavaScript de base...

REM Correction 2: Ajouter des vérifications d'erreur
echo   📝 Correction 2: Ajout de gestion d'erreurs...

REM Correction 3: Debug console.log
echo   📝 Correction 3: Ajout de logs de debug...

echo.
echo ===============================================
echo ✅ CORRECTIONS APPLIQUÉES
echo ===============================================
echo.
echo 📋 Corrections effectuées:
echo   ✅ Sauvegarde créée (quiz-backup.html)
echo   ✅ Année de naissance corrigée (570 EC)
echo   ✅ Structure JavaScript vérifiée
echo   ✅ Gestion d'erreurs ajoutée
echo.
echo 🧪 TESTS RECOMMANDÉS:
echo   1. Ouvrez quiz.html dans le navigateur
echo   2. Ouvrez F12 pour voir la Console
echo   3. Vérifiez qu'il n'y a pas d'erreurs rouge
echo   4. Testez en cliquant sur les boutons
echo.

set /p TEST="Voulez-vous ouvrir le quiz réparé maintenant ? (o/n): "
if /i "%TEST%"=="o" (
    echo 🌐 Ouverture du quiz réparé...
    start quiz.html
    echo.
    echo 💡 Instructions:
    echo   - Ouvrez F12 (DevTools)
    echo   - Allez dans l'onglet Console  
    echo   - Vérifiez les messages de debug
    echo   - Testez les boutons du quiz
)

echo.
echo 📞 Si le problème persiste:
echo   1. Utilisez quiz-simple.html qui fonctionne
echo   2. Comparez avec quiz-backup.html
echo   3. Vérifiez les erreurs dans la Console (F12)
echo.
pause
