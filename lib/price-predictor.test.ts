/**
 * Test script for Price Prediction Engine
 * Run this to test the prediction logic with sample data
 */

import { predictCropPrice, PredictionInput } from './price-predictor';

// Sample data: Wheat prices in Ahmedabad for last 30 days
const sampleInput: PredictionInput = {
    crop: 'wheat',
    location: 'Ahmedabad',
    last90DaysPrices: [
        // Most recent first
        { date: '2026-01-31', price: 2450, arrivals: 150 },
        { date: '2026-01-30', price: 2440, arrivals: 155 },
        { date: '2026-01-29', price: 2420, arrivals: 160 },
        { date: '2026-01-28', price: 2400, arrivals: 165 },
        { date: '2026-01-27', price: 2390, arrivals: 158 },
        { date: '2026-01-26', price: 2380, arrivals: 152 },
        { date: '2026-01-25', price: 2370, arrivals: 148 },
        { date: '2026-01-24', price: 2360, arrivals: 145 },
        { date: '2026-01-23', price: 2350, arrivals: 150 },
        { date: '2026-01-22', price: 2340, arrivals: 155 },
        { date: '2026-01-21', price: 2330, arrivals: 160 },
        { date: '2026-01-20', price: 2320, arrivals: 158 },
        { date: '2026-01-19', price: 2310, arrivals: 152 },
        { date: '2026-01-18', price: 2300, arrivals: 148 },
        { date: '2026-01-17', price: 2290, arrivals: 145 },
        { date: '2026-01-16', price: 2280, arrivals: 150 },
        { date: '2026-01-15', price: 2270, arrivals: 155 },
        { date: '2026-01-14', price: 2260, arrivals: 160 },
        { date: '2026-01-13', price: 2250, arrivals: 158 },
        { date: '2026-01-12', price: 2240, arrivals: 152 },
        { date: '2026-01-11', price: 2230, arrivals: 148 },
        { date: '2026-01-10', price: 2220, arrivals: 145 },
        { date: '2026-01-09', price: 2210, arrivals: 150 },
        { date: '2026-01-08', price: 2200, arrivals: 155 },
        { date: '2026-01-07', price: 2190, arrivals: 160 },
        { date: '2026-01-06', price: 2180, arrivals: 158 },
        { date: '2026-01-05', price: 2170, arrivals: 152 },
        { date: '2026-01-04', price: 2160, arrivals: 148 },
        { date: '2026-01-03', price: 2150, arrivals: 145 },
        { date: '2026-01-02', price: 2140, arrivals: 150 },
    ],
    currentArrivals: 150,
    weather: {
        temperature: 25, // °C
        rainfall: 0,     // mm
        humidity: 60,    // %
    },
    demandIndex: 65, // 0-100 scale
};

// Run prediction
console.log('=== KisanDrishti Price Prediction Engine Test ===\n');
console.log('Input:');
console.log(`Crop: ${sampleInput.crop}`);
console.log(`Location: ${sampleInput.location}`);
console.log(`Current Price: ₹${sampleInput.last90DaysPrices[0].price}/quintal`);
console.log(`Current Arrivals: ${sampleInput.currentArrivals} quintals`);
console.log(`Weather: ${sampleInput.weather.temperature}°C, ${sampleInput.weather.rainfall}mm rain, ${sampleInput.weather.humidity}% humidity`);
console.log(`Demand Index: ${sampleInput.demandIndex}/100\n`);

const result = predictCropPrice(sampleInput);

console.log('Output (JSON):');
console.log(JSON.stringify(result, null, 2));

console.log('\n=== Human-Readable Summary ===');
console.log(`Current Price: ₹${result.current_price}/quintal`);
console.log(`\n3-Day Prediction: ₹${result.predicted_3_days}/quintal (${result.confidence_3_days}% confidence)`);
console.log(`7-Day Prediction: ₹${result.predicted_7_days}/quintal (${result.confidence_7_days}% confidence)`);
console.log(`14-Day Prediction: ₹${result.predicted_14_days}/quintal (${result.confidence_14_days}% confidence)`);
console.log(`\nTrend: ${result.trend.toUpperCase()}`);
console.log(`\nFactors:`);
console.log(`  - Price Momentum: ${result.factors.price_momentum}%`);
console.log(`  - Arrival Impact: ${result.factors.arrival_impact}`);
console.log(`  - Weather Impact: ${result.factors.weather_impact}`);
console.log(`  - Demand Impact: ${result.factors.demand_impact}`);

// Test with insufficient data
console.log('\n\n=== Testing Error Handling ===');
try {
    const badInput: PredictionInput = {
        ...sampleInput,
        last90DaysPrices: sampleInput.last90DaysPrices.slice(0, 5), // Only 5 days
    };
    predictCropPrice(badInput);
} catch (error) {
    console.log('✓ Correctly caught error:', (error as Error).message);
}

// Test with high arrivals (price pressure)
console.log('\n=== Testing High Arrivals Scenario ===');
const highArrivalsInput: PredictionInput = {
    ...sampleInput,
    currentArrivals: 300, // Double the normal arrivals
};
const highArrivalsResult = predictCropPrice(highArrivalsInput);
console.log(`High arrivals prediction (3 days): ₹${highArrivalsResult.predicted_3_days}/quintal`);
console.log(`Arrival impact: ${highArrivalsResult.factors.arrival_impact} (negative = price pressure)`);

// Test with low demand
console.log('\n=== Testing Low Demand Scenario ===');
const lowDemandInput: PredictionInput = {
    ...sampleInput,
    demandIndex: 20, // Low demand
};
const lowDemandResult = predictCropPrice(lowDemandInput);
console.log(`Low demand prediction (3 days): ₹${lowDemandResult.predicted_3_days}/quintal`);
console.log(`Demand impact: ${lowDemandResult.factors.demand_impact} (negative = low demand)`);

console.log('\n✓ All tests completed successfully!');
