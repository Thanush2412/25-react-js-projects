#!/bin/bash

# Install Vercel CLI if not installed
npm install -g vercel

# Login to Vercel (only needed once)
vercel login

# Deploy each project
for i in {1..25}
do
  echo "=========================================="
  echo "Deploying project-$i"
  echo "=========================================="
  
  cd "project-$i"
  
  # Install dependencies
  echo "Installing dependencies..."
  npm install
  
  # Create vercel.json if it doesn't exist
  if [ ! -f vercel.json ]; then
    echo "Creating vercel.json..."
    echo '{
      "version": 2,
      "builds": [
        {
          "src": "package.json",
          "use": "@vercel/static-build",
          "config": {
            "distDir": "build"
          }
        }
      ],
      "routes": [
        {
          "src": "/static/(.*)",
          "dest": "/static/$1"
        },
        {
          "src": "/favicon.ico",
          "dest": "/favicon.ico"
        },
        {
          "src": "/manifest.json",
          "dest": "/manifest.json"
        },
        {
          "src": "/(.*)",
          "dest": "/index.html"
        }
      ]
    }' > vercel.json
  fi
  
  # Build the project
  echo "Building project..."
  npm run build
  
  # Deploy to Vercel
  echo "Deploying to Vercel..."
  vercel --prod
  
  # Go back to root directory
  cd ..
  
  echo "=========================================="
  echo "Completed deployment of project-$i"
  echo "=========================================="
  echo ""
done

echo "All projects have been deployed!" 