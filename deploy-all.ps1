# Install Vercel CLI if not installed
npm install -g vercel

# Login to Vercel (only needed once)
vercel login

# Get the current directory
$currentDir = Get-Location

# Deploy each project
for ($i = 1; $i -le 25; $i++) {
    $projectDir = Join-Path $currentDir "project-$i"
    
    if (Test-Path $projectDir) {
        Write-Host "=========================================="
        Write-Host "Deploying project-$i"
        Write-Host "=========================================="
        
        # Change to project directory
        Set-Location $projectDir
        
        # Install dependencies
        Write-Host "Installing dependencies..."
        npm install
        
        # Create vercel.json if it doesn't exist
        if (-not (Test-Path "vercel.json")) {
            Write-Host "Creating vercel.json..."
            @'
{
    "version": 2,
    "builds": [
        {
            "src": "package.json",
            "use": "@vercel/static-build",
            "config": {
                "distDir": "build"
            }
        }
    ],
    "routes": [
        {
            "src": "/static/(.*)",
            "dest": "/static/$1"
        },
        {
            "src": "/favicon.ico",
            "dest": "/favicon.ico"
        },
        {
            "src": "/manifest.json",
            "dest": "/manifest.json"
        },
        {
            "src": "/(.*)",
            "dest": "/index.html"
        }
    ]
}
'@ | Out-File -FilePath "vercel.json" -Encoding UTF8
        }
        
        # Build the project
        Write-Host "Building project..."
        npm run build
        
        # Deploy to Vercel
        Write-Host "Deploying to Vercel..."
        vercel --prod
        
        # Go back to root directory
        Set-Location $currentDir
        
        Write-Host "=========================================="
        Write-Host "Completed deployment of project-$i"
        Write-Host "=========================================="
        Write-Host ""
    } else {
        Write-Host "Project-$i directory not found, skipping..."
    }
}

Write-Host "All projects have been deployed!" 