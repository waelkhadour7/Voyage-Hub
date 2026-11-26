# Script to download airline logos into public\airlines\
$targetDir = Join-Path $PSScriptRoot "public\airlines"

if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

$headers = @{
    "User-Agent" = "VoyagePlusApp/1.0 (contact@voyageplus.com)"
}

$logos = @(
    @{ name = "Air India Express"; slug = "air-india-express.svg"; url = "https://upload.wikimedia.org/wikipedia/commons/8/8d/Air_India_Express_Logo.svg" },
    @{ name = "IndiGo";            slug = "indigo.webp";            url = "https://voyageplustravel.com/static/media/voyageindigo.203a8f7be1d0076becc6.webp" },
    @{ name = "Emirates";          slug = "emirates.webp";          url = "https://voyageplustravel.com/static/media/voyageemirates.4097bc982db17c57e8c0.webp" },
    @{ name = "Etihad Airways";    slug = "etihad.svg";            url = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Etihad-airways-logo.svg" },
    @{ name = "Turkish Airlines";  slug = "turkish.webp";           url = "https://voyageplustravel.com/static/media/voyageturkish.082032b43903aa400e75.webp" },
    @{ name = "Air Arabia";        slug = "air-arabia.webp";        url = "https://voyageplustravel.com/static/media/voyageairarabia.fbbc94816848eb0e5c72.webp" },
    @{ name = "Qatar Airways";     slug = "qatar.svg";             url = "https://upload.wikimedia.org/wikipedia/commons/7/75/Qatar_Airways_logo.svg" },
    @{ name = "flydubai";          slug = "flydubai.svg";          url = "https://upload.wikimedia.org/wikipedia/commons/7/79/Fly_Dubai_logo_2010_03.svg" },
    @{ name = "Saudia";            slug = "saudia.svg";            url = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Saudia_wordmark_logo.svg" },
    @{ name = "Gulf Air";          slug = "gulf-air.svg";          url = "https://upload.wikimedia.org/wikipedia/commons/9/97/Gulf_Air_2018_wordmark.svg" }
)

foreach ($logo in $logos) {
    $outFile = Join-Path $targetDir $logo.slug
    try {
        Start-Sleep -Seconds 1
        Invoke-WebRequest -Uri $logo.url -OutFile $outFile -Headers $headers -UseBasicParsing
        Write-Host "SUCCESS: Downloaded $($logo.name) -> public\airlines\$($logo.slug)" -ForegroundColor Green
    } catch {
        Write-Host "FAILED:  Could not download $($logo.name) ($($logo.url)): $_" -ForegroundColor Red
    }
}
