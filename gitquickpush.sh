#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Usage message
if [ -z "$1" ]; then
  echo "❌ Usage: $0 <remote-repo-url>"
  exit 1
fi

REMOTE_URL="$1"

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
  echo "🌀 Initializing git repository..."
  git init
fi

# Add or set remote origin
if git remote | grep -q origin; then
  echo "🔄 Updating existing remote origin..."
  git remote set-url origin "$REMOTE_URL"
else
  echo "➕ Adding remote origin..."
  git remote add origin "$REMOTE_URL"
fi

# Set branch to main
git branch -M main

# Stage all files
git add .

# Commit changes (only if there are any changes)
if git diff --cached --quiet; then
  echo "⚠️ No changes to commit."
else
  echo "✅ Committing changes..."
  git commit -m "Initial commit"
fi

# Push to GitHub
echo "🚀 Pushing to $REMOTE_URL ..."
git push -u origin main

echo "🎉 Code pushed successfully!"
