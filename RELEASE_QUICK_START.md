# 🚀 Quick Start: Creating a Release

## One-Command Release

```bash
# Update version, create tag, and push
git tag v1.0.0 && git push origin v1.0.0
```

That's it! GitHub Actions will:
1. Build for macOS (Intel + Apple Silicon)
2. Build for Windows (64-bit + 32-bit)
3. Build for Linux (AppImage + deb + rpm)
4. Create a GitHub Release
5. Attach all installers (~12 files)

## Step-by-Step

### 1. Update Version (Optional)
```bash
# Edit package.json
"version": "1.0.0"  →  "version": "1.0.1"

git add package.json
git commit -m "Bump version to 1.0.1"
git push
```

### 2. Create & Push Tag
```bash
git tag v1.0.1
git push origin v1.0.1
```

### 3. Monitor Build
Visit: https://github.com/martin-sack/VertFile/actions

Wait ~15-20 minutes for all platforms to build.

### 4. Check Release
Visit: https://github.com/martin-sack/VertFile/releases

Download and test the installers!

## What You Get

**12 downloadable files:**
- 4 macOS files (DMG + ZIP for Intel & Apple Silicon)
- 3 Windows files (NSIS installers + Portable)
- 5 Linux files (AppImage + deb + rpm)

## Test First

Before creating a real release:

```bash
# Test locally
npm run build
npm run package

# Create test release
git tag v0.0.1-test
git push origin v0.0.1-test

# Check if it works
# Then delete test release from GitHub
```

## Version Format

✅ `v1.0.0` - Correct  
✅ `v1.1.0` - Correct  
✅ `v2.0.0-beta` - Correct  
❌ `1.0.0` - Wrong (missing 'v')  
❌ `version-1.0.0` - Wrong (must start with 'v')  

## Troubleshooting

**Build failed?**
1. Check Actions logs
2. Test locally: `npm run build`
3. Fix errors and try again

**No release created?**
1. Make sure tag starts with `v`
2. Check GitHub Actions permissions
3. Verify `electron-builder.json` has publish config

## Full Guide

See **GITHUB_ACTIONS_GUIDE.md** for complete documentation.

---

**Ready to ship?** Just push a tag! 🎉
