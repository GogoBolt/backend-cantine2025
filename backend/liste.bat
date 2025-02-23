@echo off
setlocal enabledelayedexpansion

:: Définir le fichier de sortie
set OUTPUT_FILE=structureProjet.txt

:: Définir les exclusions pour les fichiers
set EXCLUDE_FILES=*package* liste.bat pnpm-lock.yaml *structureProjet* yarn-lock* git.md 

:: Définir les dossiers à ajouter (mais sans leurs sous-dossiers)
set ADD_DIRS=node_modules .nuxt .output .bolt host .nhost

:: Générer un nom unique si le fichier existe déjà
set COUNT=1
:CHECK_FILE
if exist "%OUTPUT_FILE%" (
    set /a COUNT+=1
    set OUTPUT_FILE=structureProjet_!COUNT!.txt
    goto CHECK_FILE
)

:: Afficher le fichier de sortie
echo.
echo === Démarrage du listing depuis le répertoire : %cd% ===
echo Fichier de sortie : %OUTPUT_FILE%
echo.

:: Test d'accès au fichier de sortie
echo Test d'accès > "%OUTPUT_FILE%" || (
    echo ERREUR : Impossible d'écrire dans %OUTPUT_FILE%
    pause
    exit /b
)

:: Lister les dossiers et fichiers
echo Structure du dossier en cours... Patientez...

:: Fonction récursive pour lister les fichiers et sous-dossiers
call :ListFolder "%cd%" ""

echo.
echo === Fin du traitement ===
echo Structure enregistrée dans %OUTPUT_FILE%
pause
goto :eof

:: Fonction pour lister un dossier et ses sous-dossiers
:ListFolder
set "FOLDER=%~1"
set "PARENTPATH=%~2"

:: Ajouter les dossiers spécifiés sans explorer leur contenu
for %%A in (%ADD_DIRS%) do (
    if /i "%FOLDER%"=="%%A" (
        echo %PARENTPATH%├── [%%~nxA] >> "%OUTPUT_FILE%"
    )
)

:: Lister les fichiers dans le dossier
for %%F in ("%FOLDER%\*") do (
    set EXCLUDE=0
    for %%E in (%EXCLUDE_FILES%) do (
        if /i "%%~nxF"=="%%E" set EXCLUDE=1
    )
    if !EXCLUDE! equ 0 (
        echo %PARENTPATH%└── %%~nxF >> "%OUTPUT_FILE%"
    )
)

:: Lister les sous-dossiers et les fichiers à l'intérieur de chaque sous-dossier
for /d %%D in ("%FOLDER%\*") do (
    set EXCLUDE=0
    for %%E in (%ADD_DIRS%) do (
        if /i "%%~nxD"=="%%E" set EXCLUDE=1
    )
    for %%E in (%EXCLUDE_FILES%) do (
        if /i "%%~nxD"=="%%E" set EXCLUDE=1
    )
    if !EXCLUDE! equ 0 (
        echo %PARENTPATH%├── [%%~nxD] >> "%OUTPUT_FILE%"
        call :ListFolder "%%D" "%PARENTPATH%│   "
    )
)
goto :eof
