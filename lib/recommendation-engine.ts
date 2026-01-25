import { MandiPrice, DemandPost } from './supabase';
import { calculateDistance, calculateTransportCost } from './distance-calculator';

interface MarketRecommendation {
    mandi_name: string;
    district: string;
    price: number;
    distance: number;
    transportCost: number;
    netProfit: number;
    score: number;
}

interface BestDayRecommendation {
    recommendation: 'sell_today' | 'wait_2_days' | 'wait_weekend' | 'hold';
    reason: string;
    confidence: number;
    pricetrend: 'rising' | 'falling' | 'stable';
}

/**
 * Calculate best market to sell based on price, distance, and demand
 */
export function calculateBestMarket(
    mandiPrices: MandiPrice[],
    farmerLat: number,
    farmerLng: number,
    quantity: number,
    maxRadius: number = 100
): MarketRecommendation[] {
    const recommendations: MarketRecommendation[] = [];

    for (const mandi of mandiPrices) {
        // For demo, use approximate coordinates based on district
        // In production, you'd have actual mandi coordinates
        const mandiCoords = getApproximateCoordinates(mandi.district, mandi.state);

        const distance = calculateDistance(
            farmerLat,
            farmerLng,
            mandiCoords.lat,
            mandiCoords.lng
        );

        // Skip if beyond max radius
        if (distance > maxRadius) continue;

        const transportCost = calculateTransportCost(distance, quantity);
        const totalRevenue = mandi.price_modal * quantity;
        const netProfit = totalRevenue - transportCost;

        // Calculate score: higher price, lower distance = better score
        const priceScore = mandi.price_modal / 100; // Normalize
        const distanceScore = Math.max(0, 100 - distance) / 100; // Closer is better
        const score = (priceScore * 0.7) + (distanceScore * 0.3);

        recommendations.push({
            mandi_name: mandi.mandi_name,
            district: mandi.district,
            price: mandi.price_modal,
            distance,
            transportCost,
            netProfit,
            score
        });
    }

    // Sort by score (highest first)
    return recommendations.sort((a, b) => b.score - a.score);
}

/**
 * Analyze price trends and recommend best day to sell
 */
export function calculateBestDayToSell(
    priceHistory: MandiPrice[],
    demandPosts: DemandPost[]
): BestDayRecommendation {
    // Sort by date (most recent first)
    const sortedPrices = [...priceHistory].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (sortedPrices.length < 3) {
        return {
            recommendation: 'sell_today',
            reason: 'पर्याप्त डेटा नहीं है। आज बेचना सुरक्षित है।',
            confidence: 0.5,
            pricetrend: 'stable'
        };
    }

    // Calculate 7-day moving average
    const recentPrices = sortedPrices.slice(0, 7).map(p => p.price_modal);
    const movingAvg = recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length;
    const currentPrice = sortedPrices[0].price_modal;

    // Calculate trend
    const priceChange = ((currentPrice - movingAvg) / movingAvg) * 100;

    let trend: 'rising' | 'falling' | 'stable';
    if (priceChange > 2) trend = 'rising';
    else if (priceChange < -2) trend = 'falling';
    else trend = 'stable';

    // Calculate demand score
    const activeDemandCount = demandPosts.filter(d => d.status === 'active').length;
    const demandScore = Math.min(activeDemandCount / 5, 1); // Normalize to 0-1

    // Check day of week
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Decision logic
    if (trend === 'rising' && demandScore > 0.5) {
        return {
            recommendation: 'wait_2_days',
            reason: 'भाव बढ़ रहे हैं और मांग अच्छी है। 2 दिन रुकें, बेहतर दाम मिलेंगे।',
            confidence: 0.8,
            pricetrend: trend
        };
    }

    if (trend === 'falling') {
        return {
            recommendation: 'sell_today',
            reason: 'भाव गिर रहे हैं। आज बेच दें, नुकसान से बचें।',
            confidence: 0.85,
            pricetrend: trend
        };
    }

    if (!isWeekend && dayOfWeek >= 4) {
        return {
            recommendation: 'wait_weekend',
            reason: 'सप्ताहांत तक रुकें। शनिवार-रविवार को मंडी में भीड़ और अच्छे दाम मिलते हैं।',
            confidence: 0.7,
            pricetrend: trend
        };
    }

    if (demandScore < 0.3 && trend === 'stable') {
        return {
            recommendation: 'hold',
            reason: 'मांग कम है। कुछ दिन रुकें, बाजार में सुधार की उम्मीद है।',
            confidence: 0.6,
            pricetrend: trend
        };
    }

    return {
        recommendation: 'sell_today',
        reason: 'भाव स्थिर हैं और मांग ठीक है। आज बेचना सही रहेगा।',
        confidence: 0.75,
        pricetrend: trend
    };
}

/**
 * Calculate demand score for a crop
 */
export function calculateDemandScore(
    cropName: string,
    demandPosts: DemandPost[]
): number {
    const relevantDemands = demandPosts.filter(
        d => d.crop_name.toLowerCase() === cropName.toLowerCase() && d.status === 'active'
    );

    const totalQuantityDemanded = relevantDemands.reduce(
        (sum, d) => sum + d.quantity,
        0
    );

    // Normalize to 0-100 score
    return Math.min((totalQuantityDemanded / 100) * 10, 100);
}

/**
 * Get approximate coordinates for a district (demo data)
 * In production, use actual mandi location database
 */
function getApproximateCoordinates(district: string, state: string): { lat: number; lng: number } {
    // Sample coordinates for major districts
    const districtCoords: Record<string, { lat: number; lng: number }> = {
        'ahmedabad': { lat: 23.0225, lng: 72.5714 },
        'surat': { lat: 21.1702, lng: 72.8311 },
        'vadodara': { lat: 22.3072, lng: 73.1812 },
        'rajkot': { lat: 22.3039, lng: 70.8022 },
        'mumbai': { lat: 19.0760, lng: 72.8777 },
        'pune': { lat: 18.5204, lng: 73.8567 },
        'nagpur': { lat: 21.1458, lng: 79.0882 },
        'indore': { lat: 22.7196, lng: 75.8577 },
        'bhopal': { lat: 23.2599, lng: 77.4126 },
        'jaipur': { lat: 26.9124, lng: 75.7873 },
        'ludhiana': { lat: 30.9010, lng: 75.8573 },
        'amritsar': { lat: 31.6340, lng: 74.8723 },
        'chennai': { lat: 13.0827, lng: 80.2707 },
        'coimbatore': { lat: 11.0168, lng: 76.9558 },
    };

    const key = district.toLowerCase();
    return districtCoords[key] || { lat: 23.0, lng: 72.5 }; // Default to Gujarat center
}
