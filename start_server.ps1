#!/usr/bin/env powershell

# Script de serveur local pour sira-optimized
Write-Host "🚀 Démarrage du serveur local pour sira-optimized..." -ForegroundColor Green

# Changer vers le répertoire sira-optimized
Set-Location "c:\Users\user\Documents\mon site\sira-optimized"

# Afficher l'URL du serveur
Write-Host "📱 Serveur disponible sur:" -ForegroundColor Cyan
Write-Host "   http://localhost:8080" -ForegroundColor Yellow
Write-Host "   http://127.0.0.1:8080" -ForegroundColor Yellow

Write-Host ""
Write-Host "🌟 Pages disponibles:" -ForegroundColor Magenta
Write-Host "   📍 Carte Interactive: http://localhost:8080/carte_interactive.html" -ForegroundColor White
Write-Host "   🧠 Quiz Complet: http://localhost:8080/quiz.html" -ForegroundColor White
Write-Host "   🎵 Audio Library: http://localhost:8080/audio.html" -ForegroundColor White
Write-Host "   🖼️ Galerie: http://localhost:8080/galerie.html" -ForegroundColor White
Write-Host "   🏠 Page d'accueil: http://localhost:8080/en/index_v2.html" -ForegroundColor White

Write-Host ""
Write-Host "⏹️ Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Red
Write-Host ""

# Démarrer le serveur Python
python -m http.server 8080
