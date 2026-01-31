# KisanDrishti Price Prediction Engine

## Overview
AI-powered crop price prediction engine that uses **time-series analysis** and **regression** to forecast prices for 3, 7, and 14 days ahead.

## Features
- ✅ Time-series analysis (Moving Averages: MA7, MA14, MA30)
- ✅ Regression-based prediction using multiple factors
- ✅ Arrival volume impact analysis
- ✅ Weather impact calculation
- ✅ Demand index integration
- ✅ Confidence scoring (0-100%)
- ✅ Trend detection (rising/falling/stable)
- ✅ JSON-only API responses

## API Endpoint

### POST `/api/ai/predict-price`

**Request Body:**
```json
{
  "crop": "wheat",
  "location": "Ahmedabad",
  "last90DaysPrices": [
    { "date": "2026-01-31", "price": 2450, "arrivals": 150 },
    { "date": "2026-01-30", "price": 2420, "arrivals": 160 },
    ...
  ],
  "currentArrivals": 150,
  "weather": {
    "temperature": 25,
    "rainfall": 0,
    "humidity": 60
  },
  "demandIndex": 65
}
```

**Response:**
```json
{
  "crop": "wheat",
  "current_price": 2450,
  "predicted_3_days": 2468,
  "predicted_7_days": 2485,
  "predicted_14_days": 2502,
  "confidence_3_days": 85,
  "confidence_7_days": 78,
  "confidence_14_days": 68,
  "trend": "rising",
  "factors": {
    "price_momentum": 3.45,
    "arrival_impact": 0,
    "weather_impact": 1,
    "demand_impact": 3
  }
}
```

## How It Works

### 1. Time-Series Analysis
- Calculates moving averages (MA7, MA14, MA30)
- Determines price momentum (rate of change)
- Measures volatility (standard deviation)

### 2. Regression Factors

**Arrival Impact:**
- High arrivals → Price pressure (negative impact)
- Low arrivals → Price support (positive impact)
- Scale: -10 to +10

**Weather Impact:**
- Heavy rainfall → Negative (harvest/storage issues)
- High temperature → Negative (spoilage risk)
- High humidity → Negative (quality degradation)
- Scale: -10 to +10

**Demand Impact:**
- Demand index (0-100) converted to price impact
- High demand → Positive price pressure
- Low demand → Negative price pressure
- Scale: -10 to +10

### 3. Prediction Algorithm
```
prediction = current_price 
           + momentum_effect 
           + arrival_effect 
           + weather_effect 
           + demand_effect 
           + mean_reversion_effect
```

- **Time decay:** Longer predictions have reduced factor impact
- **Mean reversion:** Prices tend to revert to MA14
- **Safety bounds:** Predictions capped at ±20% of current price

### 4. Confidence Scoring
Confidence reduces based on:
- Data availability (fewer data points = lower confidence)
- Price volatility (higher volatility = lower confidence)
- Prediction horizon (longer = lower confidence)

## Usage

### In Code
```typescript
import { predictCropPrice } from '@/lib/price-predictor';

const prediction = predictCropPrice({
  crop: 'wheat',
  location: 'Ahmedabad',
  last90DaysPrices: [...],
  currentArrivals: 150,
  weather: { temperature: 25, rainfall: 0, humidity: 60 },
  demandIndex: 65
});

console.log(prediction.predicted_3_days); // ₹2468
```

### Via API
```bash
curl -X POST http://localhost:3000/api/ai/predict-price \
  -H "Content-Type: application/json" \
  -d @request.json
```

### Test Script
```bash
# Run the test script
npx ts-node lib/price-predictor.test.ts
```

## Input Requirements

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `crop` | string | Yes | Crop name (e.g., "wheat", "cotton") |
| `location` | string | Yes | District name |
| `last90DaysPrices` | array | Yes | Min 7 days of price history |
| `currentArrivals` | number | Yes | Current arrival volume (quintals) |
| `weather` | object | Yes | Temperature, rainfall, humidity |
| `demandIndex` | number | Yes | Demand score (0-100) |

## Output Fields

| Field | Type | Description |
|-------|------|-------------|
| `crop` | string | Crop name |
| `current_price` | number | Current price (₹/quintal) |
| `predicted_3_days` | number | 3-day prediction |
| `predicted_7_days` | number | 7-day prediction |
| `predicted_14_days` | number | 14-day prediction |
| `confidence_3_days` | number | Confidence % (0-100) |
| `confidence_7_days` | number | Confidence % (0-100) |
| `confidence_14_days` | number | Confidence % (0-100) |
| `trend` | string | "rising", "falling", or "stable" |
| `factors` | object | Impact scores for each factor |

## Error Handling

**Insufficient Data:**
```json
{
  "error": "Insufficient data: Need at least 7 days of price history"
}
```

**Invalid Input:**
```json
{
  "error": "Missing required field: weather"
}
```

## Integration with KisanDrishti

The prediction engine integrates with:
- **Mandi Prices:** Fetches historical data from `mandi_prices` table
- **Weather Data:** Uses real-time weather APIs
- **Demand Index:** Calculated from `demand_posts` table
- **Farmer Dashboard:** Displays predictions with charts

## Future Enhancements
- [ ] Machine learning models (LSTM, ARIMA)
- [ ] Festival/seasonality calendar
- [ ] Regional price correlation
- [ ] Prediction caching
- [ ] Real-time updates via WebSocket

## Files
- `lib/price-predictor.ts` - Core prediction engine
- `app/api/ai/predict-price/route.ts` - API endpoint
- `lib/price-predictor.test.ts` - Test script

---

**Made for Indian Farmers** 🌾
