/**
 * KisanDrishti - Crop Price Prediction Engine
 * 
 * Uses time-series analysis + regression to predict crop prices
 * for 3, 7, and 14 days ahead with confidence scores.
 */

export interface PriceDataPoint {
    date: string; // ISO format
    price: number; // ₹/Quintal
    arrivals: number; // Quintals
}

export interface WeatherData {
    temperature: number; // °C
    rainfall: number; // mm
    humidity: number; // %
}

export interface PredictionInput {
    crop: string;
    location: string; // district
    last90DaysPrices: PriceDataPoint[];
    currentArrivals: number;
    weather: WeatherData;
    demandIndex: number; // 0-100 scale
}

export interface PredictionOutput {
    crop: string;
    current_price: number;
    predicted_3_days: number;
    predicted_7_days: number;
    predicted_14_days: number;
    confidence_3_days: number;
    confidence_7_days: number;
    confidence_14_days: number;
    trend: 'rising' | 'falling' | 'stable';
    factors: {
        price_momentum: number;
        arrival_impact: number;
        weather_impact: number;
        demand_impact: number;
    };
}

/**
 * Main prediction function
 */
export function predictCropPrice(input: PredictionInput): PredictionOutput {
    // Validate input
    if (!input.last90DaysPrices || input.last90DaysPrices.length < 7) {
        throw new Error('Insufficient data: Need at least 7 days of price history');
    }

    // Sort prices by date (most recent first)
    const sortedPrices = [...input.last90DaysPrices].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const currentPrice = sortedPrices[0].price;

    // Calculate trend components
    const trendAnalysis = analyzePriceTrend(sortedPrices);
    const arrivalImpact = calculateArrivalImpact(sortedPrices, input.currentArrivals);
    const weatherImpact = calculateWeatherImpact(input.weather, input.crop);
    const demandImpact = calculateDemandImpact(input.demandIndex);

    // Generate predictions
    const prediction3Days = generatePrediction(
        currentPrice,
        trendAnalysis,
        arrivalImpact,
        weatherImpact,
        demandImpact,
        3
    );

    const prediction7Days = generatePrediction(
        currentPrice,
        trendAnalysis,
        arrivalImpact,
        weatherImpact,
        demandImpact,
        7
    );

    const prediction14Days = generatePrediction(
        currentPrice,
        trendAnalysis,
        arrivalImpact,
        weatherImpact,
        demandImpact,
        14
    );

    // Calculate confidence scores
    const confidence3 = calculateConfidence(sortedPrices, 3);
    const confidence7 = calculateConfidence(sortedPrices, 7);
    const confidence14 = calculateConfidence(sortedPrices, 14);

    // Determine overall trend
    const trend = determineTrend(trendAnalysis.momentum);

    return {
        crop: input.crop,
        current_price: Math.round(currentPrice),
        predicted_3_days: Math.round(prediction3Days),
        predicted_7_days: Math.round(prediction7Days),
        predicted_14_days: Math.round(prediction14Days),
        confidence_3_days: Math.round(confidence3),
        confidence_7_days: Math.round(confidence7),
        confidence_14_days: Math.round(confidence14),
        trend,
        factors: {
            price_momentum: Math.round(trendAnalysis.momentum * 100) / 100,
            arrival_impact: Math.round(arrivalImpact * 100) / 100,
            weather_impact: Math.round(weatherImpact * 100) / 100,
            demand_impact: Math.round(demandImpact * 100) / 100,
        },
    };
}

/**
 * Time-series analysis: Calculate price trend and momentum
 */
function analyzePriceTrend(prices: PriceDataPoint[]): {
    momentum: number;
    volatility: number;
    ma7: number;
    ma14: number;
    ma30: number;
} {
    const priceValues = prices.map(p => p.price);

    // Calculate moving averages
    const ma7 = calculateMovingAverage(priceValues, 7);
    const ma14 = calculateMovingAverage(priceValues, 14);
    const ma30 = calculateMovingAverage(priceValues, 30);

    // Calculate momentum (rate of change)
    const currentPrice = priceValues[0];
    const momentum = ((currentPrice - ma7) / ma7) * 100;

    // Calculate volatility (standard deviation)
    const volatility = calculateStandardDeviation(priceValues.slice(0, 14));

    return { momentum, volatility, ma7, ma14, ma30 };
}

/**
 * Regression-based arrival impact calculation
 */
function calculateArrivalImpact(prices: PriceDataPoint[], currentArrivals: number): number {
    // Calculate average arrivals
    const avgArrivals = prices.reduce((sum, p) => sum + p.arrivals, 0) / prices.length;

    // High arrivals = price pressure (negative impact)
    // Low arrivals = price support (positive impact)
    const arrivalRatio = currentArrivals / avgArrivals;

    // Impact scale: -10 to +10
    if (arrivalRatio > 1.5) return -8; // Very high arrivals
    if (arrivalRatio > 1.2) return -5; // High arrivals
    if (arrivalRatio > 0.8) return 0;  // Normal arrivals
    if (arrivalRatio > 0.5) return 5;  // Low arrivals
    return 8; // Very low arrivals
}

/**
 * Weather impact on crop prices
 */
function calculateWeatherImpact(weather: WeatherData, crop: string): number {
    let impact = 0;

    // Rainfall impact (varies by crop)
    if (weather.rainfall > 100) {
        // Heavy rain = negative for harvested crops
        impact -= 5;
    } else if (weather.rainfall > 50) {
        // Moderate rain = slight negative
        impact -= 2;
    } else if (weather.rainfall < 5) {
        // No rain = neutral to positive (good for storage)
        impact += 1;
    }

    // Temperature impact
    if (weather.temperature > 35) {
        // High temp = storage issues, price pressure
        impact -= 3;
    } else if (weather.temperature < 15) {
        // Cool weather = good for storage
        impact += 2;
    }

    // Humidity impact
    if (weather.humidity > 80) {
        // High humidity = spoilage risk
        impact -= 2;
    }

    return impact;
}

/**
 * Demand index impact
 */
function calculateDemandImpact(demandIndex: number): number {
    // Demand index: 0-100
    // Convert to price impact: -10 to +10
    return ((demandIndex - 50) / 5);
}

/**
 * Generate price prediction for N days ahead
 */
function generatePrediction(
    currentPrice: number,
    trendAnalysis: { momentum: number; ma7: number; ma14: number },
    arrivalImpact: number,
    weatherImpact: number,
    demandImpact: number,
    daysAhead: number
): number {
    // Base prediction on moving average trend
    let prediction = currentPrice;

    // Apply momentum (time-series component)
    const momentumEffect = (trendAnalysis.momentum / 100) * currentPrice * (daysAhead / 7);
    prediction += momentumEffect;

    // Apply regression factors
    const arrivalEffect = (arrivalImpact / 100) * currentPrice;
    const weatherEffect = (weatherImpact / 100) * currentPrice;
    const demandEffect = (demandImpact / 100) * currentPrice;

    // Time decay: longer predictions have reduced impact
    const timeDecay = 1 - (daysAhead / 30);

    prediction += (arrivalEffect + weatherEffect + demandEffect) * timeDecay;

    // Mean reversion: prices tend to revert to MA14
    const meanReversionStrength = daysAhead / 14;
    const meanReversionEffect = (trendAnalysis.ma14 - prediction) * meanReversionStrength * 0.3;
    prediction += meanReversionEffect;

    // Ensure prediction is reasonable (within ±20% of current)
    const maxChange = currentPrice * 0.20;
    prediction = Math.max(currentPrice - maxChange, Math.min(currentPrice + maxChange, prediction));

    return prediction;
}

/**
 * Calculate confidence score based on data quality and volatility
 */
function calculateConfidence(prices: PriceDataPoint[], daysAhead: number): number {
    // Base confidence
    let confidence = 100;

    // Reduce confidence based on data availability
    const dataPoints = prices.length;
    if (dataPoints < 30) confidence -= 20;
    if (dataPoints < 14) confidence -= 20;
    if (dataPoints < 7) confidence -= 30;

    // Reduce confidence based on volatility
    const recentPrices = prices.slice(0, 14).map(p => p.price);
    const volatility = calculateStandardDeviation(recentPrices);
    const avgPrice = recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length;
    const volatilityPercent = (volatility / avgPrice) * 100;

    if (volatilityPercent > 10) confidence -= 15;
    if (volatilityPercent > 15) confidence -= 15;
    if (volatilityPercent > 20) confidence -= 10;

    // Reduce confidence based on prediction horizon
    confidence -= (daysAhead - 3) * 2;

    // Ensure confidence is between 0-100
    return Math.max(0, Math.min(100, confidence));
}

/**
 * Determine overall trend
 */
function determineTrend(momentum: number): 'rising' | 'falling' | 'stable' {
    if (momentum > 2) return 'rising';
    if (momentum < -2) return 'falling';
    return 'stable';
}

/**
 * Calculate moving average
 */
function calculateMovingAverage(values: number[], period: number): number {
    const subset = values.slice(0, Math.min(period, values.length));
    return subset.reduce((sum, val) => sum + val, 0) / subset.length;
}

/**
 * Calculate standard deviation
 */
function calculateStandardDeviation(values: number[]): number {
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(val => Math.pow(val - avg, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    return Math.sqrt(avgSquareDiff);
}
