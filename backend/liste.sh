#!/bin/bash

# Définir le fichier de sortie
OUTPUT_FILE="structureProjet.txt"

# Définir les exclusions pour les fichiers
EXCLUDE_FILES="*package* liste.bat pnpm-lock.yaml *structureProjet* yarn-lock* git.md"

# Définir les dossiers à ajouter (mais sans leurs sous-dossiers)
ADD_DIRS="node_modules .nuxt .output .bolt host .nhost"

# Générer un nom unique si le fichier existe déjà
COUNT=1
CHECK_FILE() {
    if [ -f "$OUTPUT_FILE" ]; then
        COUNT=$((COUNT + 1))
        OUTPUT_FILE="structureProjet_$COUNT.txt"
        CHECK_FILE
    fi
}
CHECK_FILE

# Afficher le fichier de sortie
echo -e "\n=== Démarrage du listing depuis le répertoire : $(pwd) ==="
echo "Fichier de sortie : $OUTPUT_FILE"
echo

# Test d'accès au fichier de sortie
echo "Test d'accès" > "$OUTPUT_FILE" || {
    echo "ERREUR : Impossible d'écrire dans $OUTPUT_FILE"
    exit 1
}

# Lister les dossiers et fichiers
echo "Structure du dossier en cours... Patientez..."

# Fonction pour lister un dossier et ses sous-dossiers
ListFolder() {
    FOLDER=$1
    PARENTPATH=$2

    # Ajouter les dossiers spécifiés sans explorer leur contenu
    for DIR in $ADD_DIRS; do
        if [ "$(basename "$FOLDER")" == "$DIR" ]; then
            echo "$PARENTPATH├── [$(basename "$FOLDER")]" >> "$OUTPUT_FILE"
        fi
    done

    # Lister les fichiers dans le dossier
    for FILE in "$FOLDER"/*; do
        EXCLUDE=0
        for EXCLUDE_FILE in $EXCLUDE_FILES; do
            if [[ "$(basename "$FILE")" == $EXCLUDE_FILE ]]; then
                EXCLUDE=1
            fi
        done
        if [ $EXCLUDE -eq 0 ]; then
            echo "$PARENTPATH└── $(basename "$FILE")" >> "$OUTPUT_FILE"
        fi
    done

    # Lister les sous-dossiers et les fichiers à l'intérieur de chaque sous-dossier
    for DIR in "$FOLDER"/*/; do
        EXCLUDE=0
        for ADD_DIR in $ADD_DIRS; do
            if [ "$(basename "$DIR")" == "$ADD_DIR" ]; then
                EXCLUDE=1
            fi
        done
        for EXCLUDE_FILE in $EXCLUDE_FILES; do
            if [ "$(basename "$DIR")" == "$EXCLUDE_FILE" ]; then
                EXCLUDE=1
            fi
        done
        if [ $EXCLUDE -eq 0 ]; then
            echo "$PARENTPATH├── [$(basename "$DIR")]" >> "$OUTPUT_FILE"
            ListFolder "$DIR" "$PARENTPATH│   "
        fi
    done
}

# Démarrer la récursion
ListFolder "$(pwd)" ""

# Fin du traitement
echo -e "\n=== Fin du traitement ==="
echo "Structure enregistrée dans $OUTPUT_FILE"
