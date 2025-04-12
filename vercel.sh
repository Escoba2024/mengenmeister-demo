#!/bin/bash

echo "🚀 Starte benutzerdefinierten Vercel-Build mit Umgebungslogik"

if [ "$VERCEL_ENV" == "production" ]; then
  echo "🌐 Umgebung: PRODUCTION"
  npm run build
else
  echo "🔧 Umgebung: DEVELOPMENT / PREVIEW"
  npm run build
fi
