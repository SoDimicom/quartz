#!/bin/bash
set -e

echo "🔐 Configuring Git credentials for private submodule..."
git config --global url."https://x-access-token:${GH_PAT}@github.com/".insteadOf "https://github.com/"

echo "📦 Initializing submodules..."
git submodule sync
git submodule update --init --recursive

echo "🔨 Building Quartz..."
npx quartz build

echo "✅ Build completed!"