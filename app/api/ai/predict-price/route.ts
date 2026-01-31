import { NextRequest, NextResponse } from 'next/server';
import { predictCropPrice, PredictionInput } from '@/lib/price-predictor';

/**
 * POST /api/ai/predict-price
 * 
 * Crop Price Prediction API Endpoint
 * Returns JSON-only predictions for 3, 7, and 14 days
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['crop', 'location', 'last90DaysPrices', 'currentArrivals', 'weather', 'demandIndex'];
        for (const field of requiredFields) {
            if (!(field in body)) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Validate data structure
        if (!Array.isArray(body.last90DaysPrices) || body.last90DaysPrices.length < 7) {
            return NextResponse.json(
                { error: 'Insufficient data: Need at least 7 days of price history' },
                { status: 400 }
            );
        }

        // Validate weather data
        if (!body.weather || typeof body.weather.temperature !== 'number') {
            return NextResponse.json(
                { error: 'Invalid weather data' },
                { status: 400 }
            );
        }

        // Prepare input
        const input: PredictionInput = {
            crop: body.crop,
            location: body.location,
            last90DaysPrices: body.last90DaysPrices,
            currentArrivals: body.currentArrivals,
            weather: body.weather,
            demandIndex: body.demandIndex,
        };

        // Generate prediction
        const prediction = predictCropPrice(input);

        // Return JSON only (no explanations)
        return NextResponse.json(prediction, { status: 200 });

    } catch (error) {
        console.error('Price prediction error:', error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Prediction failed',
                crop: '',
                current_price: 0,
                predicted_3_days: 0,
                predicted_7_days: 0,
                predicted_14_days: 0,
                confidence_3_days: 0,
                confidence_7_days: 0,
                confidence_14_days: 0,
                trend: 'stable' as const,
                factors: {
                    price_momentum: 0,
                    arrival_impact: 0,
                    weather_impact: 0,
                    demand_impact: 0,
                }
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/ai/predict-price
 * Returns API documentation
 */
export async function GET() {
    return NextResponse.json({
        endpoint: '/api/ai/predict-price',
        method: 'POST',
        description: 'Crop Price Prediction Engine - Returns 3/7/14 day price predictions',
        input: {
            crop: 'string (e.g., "wheat", "cotton")',
            location: 'string (district name)',
            last90DaysPrices: 'array of { date: string, price: number, arrivals: number }',
            currentArrivals: 'number (quintals)',
            weather: '{ temperature: number, rainfall: number, humidity: number }',
            demandIndex: 'number (0-100 scale)',
        },
        output: {
            crop: 'string',
            current_price: 'number (₹/Quintal)',
            predicted_3_days: 'number (₹/Quintal)',
            predicted_7_days: 'number (₹/Quintal)',
            predicted_14_days: 'number (₹/Quintal)',
            confidence_3_days: 'number (0-100%)',
            confidence_7_days: 'number (0-100%)',
            confidence_14_days: 'number (0-100%)',
            trend: '"rising" | "falling" | "stable"',
            factors: {
                price_momentum: 'number',
                arrival_impact: 'number',
                weather_impact: 'number',
                demand_impact: 'number',
            },
        },
        example: {
            request: {
                crop: 'wheat',
                location: 'Ahmedabad',
                last90DaysPrices: [
                    { date: '2026-01-31', price: 2450, arrivals: 150 },
                    { date: '2026-01-30', price: 2420, arrivals: 160 },
                    { date: '2026-01-29', price: 2400, arrivals: 155 },
                    // ... more data points
                ],
                currentArrivals: 150,
                weather: { temperature: 25, rainfall: 0, humidity: 60 },
                demandIndex: 65,
            },
        },
    });
}
