#!/bin/bash
# deploy.sh

echo "🚀 Iniciando deployment de Mueblería Landing..."

# Verificar que estemos en la rama main
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
  echo "❌ Debes estar en la rama main para hacer deploy"
  exit 1
fi

# Verificar que no hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Hay cambios sin commitear. Commit primero."
  exit 1
fi

# Ejecutar tests (si los tienes)
echo "🧪 Ejecutando tests..."
npm run test

# Build local para verificar
echo "🔨 Building proyecto..."
npm run build

# Deploy a Vercel
echo "📤 Deploying a Vercel..."
vercel --prod

echo "✅ Deploy completado!"
echo "🌐 Tu sitio estará disponible en unos minutos"