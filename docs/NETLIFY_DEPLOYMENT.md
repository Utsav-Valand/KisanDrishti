# Deploying KisanDrishti to Netlify

## 🚀 Quick Update Guide

If you already have KisanDrishti deployed on Netlify, follow these steps to update it with the new AI Price Prediction Engine.

---

## Prerequisites

- ✅ Git repository pushed to GitHub
- ✅ Existing Netlify site
- ✅ Supabase account with credentials
- ✅ Node.js 18+ installed

---

## Step 1: Install Netlify CLI

```powershell
# Check if already installed
netlify --version

# If not installed, install globally
npm install -g netlify-cli
```

---

## Step 2: Login to Netlify

```powershell
netlify login
```

This will open your browser for authentication.

---

## Step 3: Link to Your Existing Site

```powershell
cd c:\KisanDrishti
netlify link
```

**Options:**
1. Choose "Use existing site"
2. Select your KisanDrishti site from the list

This creates a `.netlify` folder with site configuration.

---

## Step 4: Set Environment Variables

### Option A: Via Netlify CLI (Recommended)

```powershell
# Get your Supabase credentials from .env file
Get-Content .env

# Set environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://your-project.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-anon-key-here"
netlify env:set NEXT_PUBLIC_APP_URL "https://your-site.netlify.app"
```

### Option B: Via Netlify Dashboard

1. Go to https://app.netlify.com
2. Select your KisanDrishti site
3. Go to **Site settings** → **Environment variables**
4. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`

---

## Step 5: Test Build Locally

```powershell
# Clean previous builds
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Build the project
npm run build
```

**Expected Output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

---

## Step 6: Deploy to Netlify

### Option A: Deploy via CLI (Recommended)

```powershell
# Deploy to production
netlify deploy --prod
```

**What happens:**
1. Builds your Next.js app
2. Uploads to Netlify
3. Deploys to your live site
4. Shows deployment URL

### Option B: Deploy via Git Push (Auto-deploy)

```powershell
# Push to GitHub (already done)
git push origin main
```

Netlify will automatically detect the push and deploy.

---

## Step 7: Verify Deployment

### Check Build Status

```powershell
# View recent deployments
netlify status

# View build logs
netlify logs
```

### Test API Endpoint

```powershell
# Replace with your actual Netlify URL
$siteUrl = "https://your-site.netlify.app"

# Test API documentation
Invoke-RestMethod -Uri "$siteUrl/api/ai/predict-price" -Method GET

# Test price prediction
Invoke-RestMethod -Uri "$siteUrl/api/ai/predict-price" `
  -Method POST `
  -ContentType "application/json" `
  -Body (Get-Content test-data.json -Raw)
```

### Manual Browser Test

1. Open your Netlify site URL
2. Navigate to farmer dashboard
3. Check if new features are visible
4. Test login with Supabase
5. Verify price predictions work

---

## 🔧 Troubleshooting

### Build Fails

**Error**: `Module not found` or dependency issues

**Solution**:
```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
npm run build
```

### API Routes Not Working

**Error**: 404 on `/api/ai/predict-price`

**Solution**:
1. Ensure `@netlify/plugin-nextjs` is in `netlify.toml`
2. Redeploy: `netlify deploy --prod`
3. Check Netlify Functions logs in dashboard

### Environment Variables Missing

**Error**: Supabase connection fails

**Solution**:
```powershell
# Verify env vars are set
netlify env:list

# If missing, set them
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your-url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-key"

# Trigger new deployment
netlify deploy --prod
```

### Build Takes Too Long

**Solution**:
- First build: 3-5 minutes (normal)
- Subsequent builds: 1-2 minutes (cached)
- Check build logs: `netlify logs`

---

## 📊 Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Login/signup works (Supabase connection)
- [ ] Mandi prices display correctly
- [ ] New AI prediction API responds
- [ ] Test prediction with sample data
- [ ] Check browser console for errors
- [ ] Verify mobile responsiveness
- [ ] Test offline PWA features

---

## 🔄 Future Updates

When you make changes to the code:

```powershell
# 1. Make your changes
# 2. Commit to Git
git add .
git commit -m "Your update message"
git push origin main

# 3. Netlify auto-deploys (if enabled)
# OR manually deploy:
netlify deploy --prod
```

---

## 📱 Netlify CLI Commands Reference

```powershell
# Check status
netlify status

# View site info
netlify sites:list

# Open site in browser
netlify open:site

# Open admin dashboard
netlify open:admin

# View deployment logs
netlify logs

# List environment variables
netlify env:list

# Unlink site (if needed)
netlify unlink
```

---

## 🆘 Getting Help

**Netlify Support:**
- Documentation: https://docs.netlify.com
- Community: https://answers.netlify.com
- Status: https://www.netlifystatus.com

**Build Logs Location:**
- Netlify Dashboard → Deploys → Click deployment → View logs

**Common Issues:**
1. **Build fails**: Check `package.json` scripts
2. **API 404**: Verify `netlify.toml` configuration
3. **Env vars**: Use Netlify dashboard to verify
4. **Slow builds**: Check for large dependencies

---

## ✅ Success Indicators

Your deployment is successful when:

1. ✅ Build completes without errors
2. ✅ Site URL loads the homepage
3. ✅ API endpoint returns JSON: `https://your-site.netlify.app/api/ai/predict-price`
4. ✅ Supabase authentication works
5. ✅ Price prediction returns valid data
6. ✅ No console errors in browser

---

## 🎯 Next Steps After Deployment

1. **Update README** with live demo URL
2. **Test thoroughly** on mobile devices
3. **Monitor** Netlify analytics
4. **Share** the live link!
5. **Set up** custom domain (optional)

---

**Your Netlify Site**: https://[your-site-name].netlify.app

**Made with ❤️ for Indian Farmers** 🌾
