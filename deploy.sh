#!/bin/bash

# Build the app
echo "Building the app..."
npm run build

# Create and switch to gh-pages branch
echo "Creating gh-pages branch..."
git checkout -b gh-pages

# Remove everything except dist folder
echo "Cleaning up gh-pages branch..."
git rm -rf .
git checkout main -- dist
git mv dist/* .
rmdir dist

# Commit and push
echo "Committing and pushing to gh-pages..."
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
echo "Pushing to gh-pages branch..."
git push origin gh-pages --force

# Switch back to main branch
echo "Switching back to main branch..."
git checkout main

echo "Deployment complete! Please configure GitHub Pages to deploy from gh-pages branch." 