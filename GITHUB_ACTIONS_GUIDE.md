# 🚀 GitHub Actions Automated Builds

## Overview

Your repository is now configured with GitHub Actions to automatically build File Converter Pro for all platforms (macOS, Windows, Linux) and attach the installers to GitHub Releases.

## How It Works

### Workflow File
`.github/workflows/release.yml`

### Triggers

1. **Tag Push** (Recommended)
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   
2. **Manual Trigger**
   - Go to: https://github.com/martin-sack/VertFile/actions
   - Select "Build & Release File Converter Pro"
   - Click "Run workflow"

## Creating a Release

### Method 1: Using Git Tags (Recommended)

```bash
# 1. Make sure all changes are committed
git add .
git commit -m "Release v1.0.0"
git push

# 2. Create and push a version tag
git tag v1.0.0
git push origin v1.0.0

# 3. GitHub Actions will automatically:
#    - Build for macOS (Intel + Apple Silicon)
#    - Build for Windows (64-bit + 32-bit)
#    - Build for Linux (AppImage + deb + rpm)
#    - Create a GitHub Release
#    - Attach all installers as downloadable assets
```

### Method 2: Using GitHub UI

1. Go to: https://github.com/martin-sack/VertFile/releases
2. Click "Draft a new release"
3. Click "Choose a tag"
4. Type a new tag (e.g., `v1.0.0`) and click "Create new tag"
5. Fill in release title and description
6. Click "Publish release"
7. GitHub Actions will build and attach installers automatically

## What Gets Built

### macOS 🍎
- `File Converter Pro-1.0.0-mac-x64.dmg` (Intel)
- `File Converter Pro-1.0.0-mac-arm64.dmg` (Apple Silicon)
- `File Converter Pro-1.0.0-mac-x64.zip` (Intel)
- `File Converter Pro-1.0.0-mac-arm64.zip` (Apple Silicon)

### Windows 🪟
- `File Converter Pro-1.0.0-win-x64.exe` (64-bit installer)
- `File Converter Pro-1.0.0-win-ia32.exe` (32-bit installer)
- `File Converter Pro-1.0.0-win-x64.exe` (Portable)

### Linux 🐧
- `File Converter Pro-1.0.0-linux-x64.AppImage`
- `File Converter Pro-1.0.0-linux-arm64.AppImage`
- `File Converter Pro-1.0.0-linux-x64.deb`
- `File Converter Pro-1.0.0-linux-arm64.deb`
- `File Converter Pro-1.0.0-linux-x64.rpm`

## Monitoring Builds

### View Build Progress
1. Go to: https://github.com/martin-sack/VertFile/actions
2. Click on the latest workflow run
3. See real-time build logs for each platform

### Build Status
- ✅ Green checkmark = Build succeeded
- ❌ Red X = Build failed (click to see logs)
- 🟡 Yellow dot = Build in progress

### Typical Build Times
- macOS: 5-10 minutes
- Windows: 5-8 minutes
- Linux: 4-7 minutes
- **Total**: ~15-20 minutes for all platforms

## Troubleshooting

### Build Fails

**Check the logs:**
1. Go to Actions tab
2. Click the failed workflow
3. Click the failed job (macOS/Windows/Linux)
4. Review the error messages

**Common Issues:**

1. **Missing dependencies**
   - Solution: Make sure `package.json` is up to date
   - Run `npm install` locally to verify

2. **Build errors**
   - Solution: Test locally first with `npm run build`
   - Fix any TypeScript or build errors

3. **Icon missing**
   - Solution: Ensure icons exist in `build/` directory
   - Run `npm run icons` to regenerate

### Release Not Created

If builds succeed but no release appears:

1. Check that you pushed a **tag** (not just a commit)
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. Verify the tag format starts with `v` (e.g., `v1.0.0`, not `1.0.0`)

3. Check GitHub Actions permissions:
   - Go to: Settings → Actions → General
   - Ensure "Read and write permissions" is enabled

## Version Numbering

Follow semantic versioning:
- `v1.0.0` - Major release
- `v1.1.0` - Minor release (new features)
- `v1.0.1` - Patch release (bug fixes)

## Testing Before Release

Always test locally before creating a release:

```bash
# 1. Build locally
npm run build

# 2. Test on your platform
npm run package

# 3. Test the built app
# macOS: open release/*.dmg
# Windows: run release/*.exe
# Linux: run release/*.AppImage

# 4. If everything works, create the release
git tag v1.0.0
git push origin v1.0.0
```

## Workflow Configuration

### electron-builder.json
```json
"publish": {
  "provider": "github",
  "owner": "martin-sack",
  "repo": "VertFile"
}
```

This tells electron-builder to:
- Upload builds to GitHub Releases
- Use the repository: martin-sack/VertFile
- Authenticate with `GH_TOKEN` (provided by GitHub Actions)

### No Extra Secrets Required
The workflow uses `secrets.GITHUB_TOKEN` which is automatically provided by GitHub. No manual secret configuration needed!

## Release Workflow

```
1. Code changes
   ↓
2. Commit & push
   ↓
3. Create & push tag (v1.0.0)
   ↓
4. GitHub Actions triggers
   ↓
5. Builds run in parallel:
   - macOS (5-10 min)
   - Windows (5-8 min)
   - Linux (4-7 min)
   ↓
6. Release created automatically
   ↓
7. All installers attached as assets
   ↓
8. Users can download!
```

## Example: Creating Your First Release

```bash
# 1. Update version in package.json
# Change "version": "1.0.0" to "version": "1.0.1"

# 2. Commit the version change
git add package.json
git commit -m "Bump version to 1.0.1"
git push

# 3. Create and push the tag
git tag v1.0.1
git push origin v1.0.1

# 4. Watch the magic happen!
# Go to: https://github.com/martin-sack/VertFile/actions
# Wait 15-20 minutes
# Check: https://github.com/martin-sack/VertFile/releases
```

## Artifacts

Even if you don't create a release, build artifacts are saved for 7 days:
- Go to Actions → Select workflow run → Scroll to "Artifacts"
- Download: macos-builds, windows-builds, linux-builds

## Benefits

✅ **Automated** - No manual building required  
✅ **Consistent** - Same build environment every time  
✅ **Fast** - Parallel builds on GitHub's servers  
✅ **Professional** - Official releases with all platforms  
✅ **Free** - GitHub Actions is free for public repos  
✅ **Reliable** - Tested on clean environments  

## Next Steps

1. **Test the workflow:**
   ```bash
   git tag v0.0.1-test
   git push origin v0.0.1-test
   ```

2. **Monitor the build:**
   - Visit: https://github.com/martin-sack/VertFile/actions

3. **Check the release:**
   - Visit: https://github.com/martin-sack/VertFile/releases

4. **Delete test release if needed:**
   - Go to releases, click the test release, delete it

5. **Create your first real release:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## Support

If builds fail or you need help:
1. Check the Actions logs
2. Review this guide
3. Test locally first
4. Check electron-builder documentation

---

**You're all set!** 🚀 Just push a tag and GitHub will build for all platforms automatically!
