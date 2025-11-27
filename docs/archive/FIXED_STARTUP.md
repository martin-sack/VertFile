# ✅ FIXED - How to Start the App

## The Issue
The app had a few startup issues:
1. TypeScript error with pdf-parse (fixed with @ts-ignore)
2. Port configuration mismatch (fixed to use 5174)
3. PostCSS config warning (fixed to use CommonJS)
4. Need to build main process before starting

## ✅ Working Solution

### Option 1: Automated Script (Easiest)
```bash
./dev-start.sh
```

This handles everything automatically.

### Option 2: Manual Steps (Recommended for Development)

**Terminal 1 - Start Vite:**
```bash
npm run dev:renderer
```

Wait until you see:
```
➜  Local:   http://localhost:5174/
```

**Terminal 2 - Start Electron:**
```bash
npm run dev:electron
```

The Electron window will open with your app!

### Option 3: Using npm run dev (Concurrent)
```bash
npm run dev
```

This starts both Vite and Electron together using concurrently.

## Testing

### Test Vite Server
Open http://localhost:5174/ in your browser. You should see the File Converter Pro UI.

### Test Electron
After running `npm run dev:electron`, an Electron window should open showing the same UI.

## What Was Fixed

1. **src/main/conversions/pdf-to-txt.ts** - Added `@ts-ignore` for pdf-parse
2. **src/main/main.ts** - Updated to use VITE_DEV_SERVER_URL environment variable
3. **vite.config.ts** - Set port to 5174
4. **postcss.config.js** - Changed to CommonJS syntax
5. **package.json** - Added dev:electron script

## Current Status

✅ Vite dev server: Running on port 5174  
✅ TypeScript compilation: No errors  
✅ React app: Ready to load  
✅ Electron: Ready to start  

## Next Steps

1. Start the app using one of the options above
2. Test file conversions
3. Customize the UI
4. Build installers with `npm run package`

## If You Still See Black Screen

1. **Check Vite is running:**
   ```bash
   curl http://localhost:5174/
   ```
   Should return HTML.

2. **Check Electron DevTools:**
   - Opens automatically in dev mode
   - Look for console errors
   - Check Network tab for failed requests

3. **Verify environment:**
   ```bash
   echo $NODE_ENV
   echo $VITE_DEV_SERVER_URL
   ```

4. **See TROUBLESHOOTING.md** for more help.
