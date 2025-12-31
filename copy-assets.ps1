# PowerShell script to copy assets to public folder
# Run this script from the project root directory

Write-Host "Copying assets to public folder..." -ForegroundColor Green

# Create public folder if it doesn't exist
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public"
    Write-Host "Created public folder" -ForegroundColor Yellow
}

# Copy all PNG and JPG files from root to public
$imageFiles = Get-ChildItem -Path "." -Include *.png,*.jpg -File
foreach ($file in $imageFiles) {
    Copy-Item $file.FullName -Destination "public\" -Force
    Write-Host "Copied $($file.Name)" -ForegroundColor Cyan
}

# Copy gallery folder
if (Test-Path "gallery") {
    if (-not (Test-Path "public\gallery")) {
        New-Item -ItemType Directory -Path "public\gallery"
    }
    Copy-Item -Path "gallery\*" -Destination "public\gallery\" -Recurse -Force
    Write-Host "Copied gallery folder" -ForegroundColor Cyan
}

Write-Host "`nAsset copying completed!" -ForegroundColor Green
Write-Host "You can now run 'npm install' and 'npm start'" -ForegroundColor Yellow


