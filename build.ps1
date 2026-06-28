# Local build script for AstroScan static site.
# Mirrors .github/workflows/build.yml: regenerate all pages from the templates,
# regenerate the sitemap, then validate everything before you commit.
#
# Usage: .\build.ps1

$ErrorActionPreference = "Stop"

function Run-Step($Name, $Command) {
    Write-Host "==> $Name" -ForegroundColor Cyan
    & python @Command
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FAILED: $Name (exit code $LASTEXITCODE)" -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

Run-Step "Generate index.html / ru / es / hi / privacy / terms from templates" @("build.py")
Run-Step "Generate zodiac sign pages (12 signs x 4 languages)" @("build_zodiac.py")
Run-Step "Regenerate sitemap.xml" @("scripts/gen_sitemap.py")
Run-Step "Validate build output" @("validate.py")

Write-Host "Build OK." -ForegroundColor Green
