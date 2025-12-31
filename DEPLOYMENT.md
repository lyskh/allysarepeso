# GitHub Pages Deployment Guide

This guide will walk you through deploying your React portfolio to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Your project pushed to a GitHub repository

## Step 1: Install gh-pages Package

The `gh-pages` package is already added to your `package.json` as a dev dependency. Install it by running:

```bash
npm install
```

## Step 2: Update package.json Homepage

You need to add a `homepage` field to your `package.json`. The format depends on your GitHub username and repository name:

**Option A: If your repository is named `my-portfolio` (or any other name):**
```json
"homepage": "https://YOUR_USERNAME.github.io/my-portfolio"
```

**Option B: If you want to use a custom domain:**
```json
"homepage": "https://yourdomain.com"
```

**Option C: If your repository is named `YOUR_USERNAME.github.io` (special GitHub Pages repo):**
```json
"homepage": "https://YOUR_USERNAME.github.io"
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Update Router Basename (Already Done)

The router has been configured to automatically use the basename from `process.env.PUBLIC_URL`, which is set based on the `homepage` field in `package.json`. This ensures your routes work correctly on GitHub Pages.

## Step 4: Deploy to GitHub Pages

Once you've updated the `homepage` field, deploy your site:

```bash
npm run deploy
```

This command will:
1. Build your React app for production
2. Deploy the `build` folder to the `gh-pages` branch of your repository

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**, select the `gh-pages` branch
5. Click **Save**

Your site will be available at the URL specified in your `homepage` field (usually within a few minutes).

## Step 6: Verify Deployment

1. Visit your GitHub Pages URL
2. Test all routes (especially `/thank-you`)
3. Check that all images load correctly
4. Test the contact form

## Updating Your Site

Whenever you make changes to your portfolio:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push
   ```

2. Deploy the updated version:
   ```bash
   npm run deploy
   ```

## Troubleshooting

### 404 Errors on Routes

If you get 404 errors when navigating to routes like `/thank-you`:

1. Make sure the `homepage` field in `package.json` matches your GitHub Pages URL
2. Verify that `BrowserRouter` has the correct `basename` (already configured)
3. GitHub Pages may need a `404.html` file - the build process should handle this, but if issues persist, you may need to add a custom `404.html` in the `public` folder

### Images Not Loading

- Ensure all images are in the `public/` folder
- Check that image paths in components use `/filename.png` (starting with `/`)
- Clear browser cache after deployment

### Build Fails

- Make sure all dependencies are installed: `npm install`
- Check for any linting errors: `npm run build` (without deploy)
- Ensure the `homepage` field in `package.json` is valid

### Site Not Updating

- Wait a few minutes for GitHub Pages to rebuild
- Clear your browser cache
- Check the GitHub Actions tab in your repository for any deployment errors

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the `public/` folder with your domain name:
   ```
   yourdomain.com
   ```

2. Update the `homepage` field in `package.json` to match your domain

3. Configure DNS settings with your domain provider to point to GitHub Pages

4. Deploy again: `npm run deploy`

## Notes

- The `gh-pages` branch is automatically created and managed by the `gh-pages` package
- Don't manually edit the `gh-pages` branch - always use `npm run deploy`
- Your main source code stays on `main` (or `master`) branch
- The `build/` folder is gitignored and only deployed to `gh-pages`


