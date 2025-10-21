#!/bin/bash
set -e

echo "🔐 Cloning private content repository..."

# Supprimer le dossier content s'il existe
rm -rf content

# Cloner directement avec le token dans l'URL
git clone "https://x-access-token:${GH_PAT}@github.com/SoDimicom/MyQuartzNotes.git" content

echo "✅ Content cloned successfully"

echo "🔨 Building Quartz..."
npx quartz build

echo "✅ Build completed!"