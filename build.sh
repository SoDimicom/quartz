#!/bin/bash
set -e

echo "🔐 Cloning private content repository..."

# Supprimer le dossier content s'il existe
rm -rf content

# Cloner le dépôt complet dans un dossier temporaire
git clone "https://x-access-token:${GH_PAT}@github.com/SoDimicom/MyQuartzNotes.git" temp-repo

# Extraire uniquement le sous-dossier content/
mv temp-repo/content ./content

# Nettoyer le dossier temporaire
rm -rf temp-repo

echo "✅ Content extracted successfully"

echo "🔨 Building Quartz..."
npx quartz build

echo "✅ Build completed!"
