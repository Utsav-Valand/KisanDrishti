# Test Price Prediction API
# PowerShell script to test the prediction endpoint

Write-Host "=== KisanDrishti Price Prediction API Test ===" -ForegroundColor Green
Write-Host ""

# Check if server is running
Write-Host "Checking if dev server is running..." -ForegroundColor Yellow
try {
    $healthCheck = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✓ Server is running!" -ForegroundColor Green
} catch {
    Write-Host "✗ Server is not running. Please start it with: npm run dev" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 1: Get API Documentation
Write-Host "Test 1: Getting API Documentation..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/ai/predict-price" -Method GET
    $docs = $response.Content | ConvertFrom-Json
    Write-Host "✓ API Endpoint: $($docs.endpoint)" -ForegroundColor Green
    Write-Host "✓ Method: $($docs.method)" -ForegroundColor Green
    Write-Host "✓ Description: $($docs.description)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to get documentation: $_" -ForegroundColor Red
}

Write-Host ""

# Test 2: Make Prediction Request
Write-Host "Test 2: Making Price Prediction Request..." -ForegroundColor Cyan

# Read test data
$testDataPath = "test-data.json"
if (-not (Test-Path $testDataPath)) {
    Write-Host "✗ Test data file not found: $testDataPath" -ForegroundColor Red
    exit 1
}

$testData = Get-Content $testDataPath -Raw

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/ai/predict-price" `
        -Method POST `
        -ContentType "application/json" `
        -Body $testData

    Write-Host "✓ Prediction successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Results:" -ForegroundColor Yellow
    Write-Host "--------" -ForegroundColor Yellow
    Write-Host "Crop: $($response.crop)" -ForegroundColor White
    Write-Host "Current Price: ₹$($response.current_price)/quintal" -ForegroundColor White
    Write-Host ""
    Write-Host "Predictions:" -ForegroundColor Yellow
    Write-Host "  3 Days:  ₹$($response.predicted_3_days)/quintal (Confidence: $($response.confidence_3_days)%)" -ForegroundColor Cyan
    Write-Host "  7 Days:  ₹$($response.predicted_7_days)/quintal (Confidence: $($response.confidence_7_days)%)" -ForegroundColor Cyan
    Write-Host " 14 Days:  ₹$($response.predicted_14_days)/quintal (Confidence: $($response.confidence_14_days)%)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Trend: $($response.trend.ToUpper())" -ForegroundColor $(if ($response.trend -eq 'rising') { 'Green' } elseif ($response.trend -eq 'falling') { 'Red' } else { 'Yellow' })
    Write-Host ""
    Write-Host "Factors:" -ForegroundColor Yellow
    Write-Host "  Price Momentum:  $($response.factors.price_momentum)" -ForegroundColor White
    Write-Host "  Arrival Impact:  $($response.factors.arrival_impact)" -ForegroundColor White
    Write-Host "  Weather Impact:  $($response.factors.weather_impact)" -ForegroundColor White
    Write-Host "  Demand Impact:   $($response.factors.demand_impact)" -ForegroundColor White
    Write-Host ""
    
    # Save response to file
    $response | ConvertTo-Json -Depth 10 | Out-File "test-response.json"
    Write-Host "✓ Full response saved to: test-response.json" -ForegroundColor Green

} catch {
    Write-Host "✗ Prediction failed: $_" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Test Complete ===" -ForegroundColor Green
