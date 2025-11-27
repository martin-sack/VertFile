# Troubleshooting Guide

## Black Screen Issues

### Problem: Electron shows black screen or localhost:5173 shows black screen

**Causes:**
1. Vite dev server not running
2. Port mismatch between Vite and Electron
3. React app not building correctly
4. Missing dependencies

**Solutions:**

### Solution 1: Use the dev-start.sh script
```bash
./dev-start.sh
```

This script handles everything automatically.

### Solution 2: Manual startup (recommended for debugging)

**Step 1: Start Vite dev server**
```bash
npm run dev:renderer
```

Wait for it to show: `➜  Local:   http://localhost:5174/`

**Step 2: Test in browser**
Open http://localhost:5174/ in your browser. You should see the app UI.

**Step 3: Start Electron (in a new terminal)**
```bash
npm run dev:electron
```

### Solution 3: Clean restart
```bash
# Kill all processes
pkill -f "vite|electron" 

# Clean build
rm -rf dist node_modules
npm install
npm run build:main
npm run build:preload

# Start fresh
npm run dev:renderer
# Then in another terminal:
npm run dev:electron
```

## Common Issues

### Port 5174 already in use
```bash
# Find and kill the process
lsof -ti:5174 | xargs kill -9

# Or use a different port in vite.config.ts
server: {
  port: 5175,  // Change this
}
```

### "Cannot find module" errors
```bash
npm install
npm run build:main
npm run build:preload
```

### TypeScript errors
```bash
# Check for errors
npm run build:main
npm run build:preload

# If errors persist, check:
# - src/main/conversions/pdf-to-txt.ts has @ts-ignore comment
# - All imports are correct
```

### Vite CJS deprecation warning
This is just a warning and doesn't affect functionality. To fix:
- The postcss.config.js is already using CommonJS syntax
- You can ignore this warning

### React app not loading
1. Check browser console at http://localhost:5174/
2. Look for JavaScript errors
3. Verify all components are importing correctly
4. Check that Tailwind CSS is loading

### Electron window opens but is blank
1. Check Electron DevTools (opens automatically in dev mode)
2. Look for console errors
3. Verify the URL is correct: http://localhost:5174/
4. Check that VITE_DEV_SERVER_URL environment variable is set

## Development Tips

### Check if Vite is running
```bash
curl http://localhost:5174/
# Should return HTML
```

### Check if Electron can access Vite
```bash
# In Electron DevTools console:
window.location.href
# Should show: http://localhost:5174/
```

### View Electron logs
All console.log from main process appear in the terminal where you ran `npm run dev:electron`

### View Renderer logs
Open Electron DevTools (automatically opens in dev mode) and check the Console tab

## Still Having Issues?

1. **Check all processes are running:**
   ```bash
   ps aux | grep -E "vite|electron"
   ```

2. **Verify build output:**
   ```bash
   ls -la dist/main/
   ls -la dist/renderer/
   ```

3. **Test Vite directly:**
   Open http://localhost:5174/ in Chrome/Firefox

4. **Check for port conflicts:**
   ```bash
   lsof -i:5174
   ```

5. **Review error messages:**
   - Terminal where Vite is running
   - Terminal where Electron is running
   - Electron DevTools console
   - Browser console (if testing Vite directly)
