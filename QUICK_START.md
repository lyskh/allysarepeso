# Quick Start Guide

## Step 1: Copy Assets
Before running the app, copy all image assets to the `public` folder.

**Option A: Use PowerShell Script (Windows)**
```powershell
.\copy-assets.ps1
```

**Option B: Manual Copy**
1. Copy all `.png` and `.jpg` files from root to `public/`
2. Copy the `gallery` folder to `public/gallery/`

## Step 2: Install Dependencies
```bash
npm install
```

## Step 3: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## Step 4: Build for Production
```bash
npm run build
```

The optimized build will be in the `build/` folder.

## Troubleshooting

### Images Not Showing
- Ensure all images are in the `public/` folder
- Check that image paths in components use `/filename.png` (starting with `/`)
- Clear browser cache

### Form Not Working
- Verify Formspree endpoint in `src/components/Contact.js`
- Check browser console for errors
- Ensure network requests are not blocked

### Routing Issues
- Ensure you're using `npm start` (not opening HTML directly)
- Check that React Router is properly installed
- Verify all routes are defined in `src/App.js`

## Project Structure
```
my-portfolio/
├── public/          # Static assets (images, etc.)
├── src/
│   ├── components/  # React components
│   ├── App.js      # Main app component
│   └── index.js    # Entry point
├── package.json
└── README.md
```

## Step 5: Deploy to GitHub Pages

See `DEPLOYMENT.md` for complete instructions on deploying your portfolio to GitHub Pages.

## Need Help?
- Check `README.md` for detailed documentation
- Review `IMPROVEMENTS.md` for feature list
- See `SETUP.md` for asset setup instructions
- See `DEPLOYMENT.md` for GitHub Pages deployment guide

