#!/bin/bash
set -e

echo "🔐 Setting up authentication..."

# Remplacer l'URL du submodule par une version avec token
git config submodule.content.url "https://x-access-token:${GH_PAT}@github.com/SoDimicom/MyQuartzNotes.git"

echo "📦 Cloning submodule..."
git submodule sync
git submodule update --init --recursive

echo "🔨 Building Quartz..."
npx quartz build

echo "✅ Build completed!"