#!/bin/bash

echo "🚀 Starting File Converter Pro Development Environment"
echo ""

# Kill any existing processes on port 5174
echo "Cleaning up existing processes..."
lsof -ti:5174 | xargs kill -9 2>/dev/null || true
sleep 1

# Build main and preload
echo "Building main process..."
npm run build:main
npm run build:preload

# Start Vite in background
echo "Starting Vite dev server..."
npm run dev:renderer &
VITE_PID=$!

# Wait for Vite to be ready
echo "Waiting for Vite to start..."
sleep 3

# Start Electron
echo "Starting Electron..."
cross-env NODE_ENV=development VITE_DEV_SERVER_URL=http://localhost:5174 electron .

# Cleanup on exit
kill $VITE_PID 2>/dev/null
