# Setup Instructions

## Moving Assets to Public Folder

Before running the React app, you need to move all image assets to the `public` folder:

### Required Steps:

1. **Copy all image files from root to `public/`:**
   - `hero-intro.png`
   - `line.png`
   - `footer.png`
   - `work-1.png`
   - `work-2.png`
   - `work-3.png`
   - `1.png`
   - `2.png`
   - `3.png`
   - `4.png`

2. **Copy the entire `gallery` folder to `public/gallery/`:**
   - All `.jpg` files (1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg)
   - All `.png` sample files (sample-1.png through sample-11.png)

### Quick PowerShell Command (Windows):

```powershell
# Navigate to project directory
cd c:\Users\Admin\Projects\my-portfolio

# Copy images to public folder
Copy-Item *.png public\ -ErrorAction SilentlyContinue
Copy-Item *.jpg public\ -ErrorAction SilentlyContinue

# Copy gallery folder
Copy-Item -Recurse gallery public\gallery -ErrorAction SilentlyContinue
```

### Manual Method:

1. Create a `public` folder in the project root if it doesn't exist
2. Copy all `.png` and `.jpg` files from the root to `public/`
3. Copy the entire `gallery` folder to `public/gallery/`

After moving the assets, you can run `npm install` and `npm start` to launch the development server.


