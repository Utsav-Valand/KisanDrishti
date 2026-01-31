/**
 * Simple Demo Example - Price Prediction Engine
 * Copy this code to test the prediction engine
 */

// Example 1: Basic Usage
const exampleInput = {
    crop: 'wheat',
    location: 'Ahmedabad',
    last90DaysPrices: [
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
    ],
    currentArrivals: 150,
    weather: {
        temperature: 25,
        rainfall: 0,
        humidity: 60
    },
    demandIndex: 65
};

// Example 2: API Request (using fetch)
async function getPricePrediction() {
    const response = await fetch('http://localhost:3000/api/ai/predict-price', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(exampleInput)
    });

    const prediction = await response.json();
    console.log('Prediction:', prediction);

    // Expected output:
    // {
    //   "crop": "wheat",
    //   "current_price": 2450,
    //   "predicted_3_days": 2468,
    //   "predicted_7_days": 2485,
    //   "predicted_14_days": 2502,
    //   "confidence_3_days": 85,
    //   "confidence_7_days": 78,
    //   "confidence_14_days": 68,
    //   "trend": "rising",
    //   "factors": {
    //     "price_momentum": 3.45,
    //     "arrival_impact": 0,
    //     "weather_impact": 1,
    //     "demand_impact": 3
    //   }
    // }
}

// Example 3: Using with real mandi data from Supabase
import { createClient } from '@supabase/supabase-js';

async function predictFromMandiData(cropName: string, district: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Fetch last 90 days of mandi prices
    const { data: mandiPrices } = await supabase
        .from('mandi_prices')
        .select('*')
        .eq('crop_name', cropName)
        .eq('district', district)
        .order('date', { ascending: false })
        .limit(90);

    if (!mandiPrices || mandiPrices.length < 7) {
        return { error: 'Insufficient data' };
    }

    // Format data for prediction
    const last90DaysPrices = mandiPrices.map((p: any) => ({
        date: p.date,
        price: p.price_modal,
        arrivals: p.arrivals || 0
    }));

    // Get current weather (mock data - replace with real API)
    const weather = {
        temperature: 25,
        rainfall: 0,
        humidity: 60
    };

    // Calculate demand index from demand_posts
    const { data: demandPosts } = await supabase
        .from('demand_posts')
        .select('*')
        .eq('crop_name', cropName)
        .eq('status', 'active');

    const demandIndex = Math.min((demandPosts?.length || 0) * 20, 100);

    // Make prediction
    const response = await fetch('/api/ai/predict-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            crop: cropName,
            location: district,
            last90DaysPrices,
            currentArrivals: last90DaysPrices[0].arrivals,
            weather,
            demandIndex
        })
    });

    return await response.json();
}

// Example 4: Display in Farmer Dashboard (React/TSX component)
// Note: This should be in a .tsx file, not .ts
/*
import { PredictionOutput } from './price-predictor';

interface PricePredictionCardProps {
    prediction: PredictionOutput;
}

function PricePredictionCard({ prediction }: PricePredictionCardProps) {
    return (
        <div className= "bg-white rounded-lg shadow p-4" >
        <h3 className="font-bold text-lg mb-2" > भाव का अनुमान(Price Prediction) </h3>

            < div className = "space-y-2" >
                <div className="flex justify-between" >
                    <span>आज का भाव: </span>
                        < span className = "font-bold" >₹{ prediction.current_price } /क्विंटल</span >
                            </div>

                            < div className = "flex justify-between" >
                                <span>3 दिन बाद: </span>
                                    < span className = "font-bold text-green-600" >
                        ₹{ prediction.predicted_3_days }/क्विंटल
        < span className = "text-xs text-gray-500 ml-1" >
            ({ prediction.confidence_3_days } % विश्वास)
            </span>
            </span>
            </div>

            < div className = "flex justify-between" >
                <span>7 दिन बाद: </span>
                    < span className = "font-bold text-green-600" >
                        ₹{ prediction.predicted_7_days }/क्विंटल
        < span className = "text-xs text-gray-500 ml-1" >
            ({ prediction.confidence_7_days } % विश्वास)
            </span>
            </span>
            </div>

            < div className = "flex justify-between" >
                <span>14 दिन बाद: </span>
                    < span className = "font-bold text-green-600" >
                        ₹{ prediction.predicted_14_days }/क्विंटल
        < span className = "text-xs text-gray-500 ml-1" >
            ({ prediction.confidence_14_days } % विश्वास)
            </span>
            </span>
            </div>
            </div>

            < div className = "mt-4 p-2 bg-blue-50 rounded" >
                <p className="text-sm" >
                    { prediction.trend === 'rising' && '📈 भाव बढ़ने की संभावना है' }
    { prediction.trend === 'falling' && '📉 भाव गिरने की संभावना है' }
    { prediction.trend === 'stable' && '➡️ भाव स्थिर रहने की संभावना है' }
    </p>
        </div>
        </div>
    );
}
*/

export { exampleInput, getPricePrediction, predictFromMandiData };
