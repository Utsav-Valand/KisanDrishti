'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import PriceChart from '@/components/ui/PriceChart';
import { TrendingUp, TrendingDown, MapPin, Filter } from 'lucide-react';

export default function FarmerPricesPage() {
    const router = useRouter();
    const [selectedCrop, setSelectedCrop] = useState('wheat');
    const [radius, setRadius] = useState(50);

    // Demo data
    const demoData = [
        { id: '1', mandi_name: 'अहमदाबाद मंडी', district: 'Ahmedabad', state: 'Gujarat', crop_name: 'wheat', price_modal: 2450, price_min: 2400, price_max: 2500, date: '2026-01-21', arrivals: 150, created_at: '' },
        { id: '2', mandi_name: 'गांधीनगर मंडी', district: 'Gandhinagar', state: 'Gujarat', crop_name: 'wheat', price_modal: 2420, price_min: 2380, price_max: 2460, date: '2026-01-21', arrivals: 120, created_at: '' },
        { id: '3', mandi_name: 'मेहसाणा मंडी', district: 'Mehsana', state: 'Gujarat', crop_name: 'wheat', price_modal: 2400, price_min: 2350, price_max: 2450, date: '2026-01-21', arrivals: 100, created_at: '' },
    ];

    const priceHistory = [
        { id: '1', mandi_name: 'अहमदाबाद मंडी', district: 'Ahmedabad', state: 'Gujarat', crop_name: 'wheat', price_modal: 2400, price_min: 2350, price_max: 2450, date: '2026-01-15', created_at: '' },
        { id: '2', mandi_name: 'अहमदाबाद मंडी', district: 'Ahmedabad', state: 'Gujarat', crop_name: 'wheat', price_modal: 2420, price_min: 2370, price_max: 2470, date: '2026-01-18', created_at: '' },
        { id: '3', mandi_name: 'अहमदाबाद मंडी', district: 'Ahmedabad', state: 'Gujarat', crop_name: 'wheat', price_modal: 2450, price_min: 2400, price_max: 2500, date: '2026-01-21', created_at: '' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-primary-600 text-white p-4 shadow-lg">
                <h1 className="text-2xl font-bold">मंडी भाव</h1>
                <p className="text-sm text-primary-100">आज के ताज़ा भाव</p>
            </header>

            {/* Main Content */}
            <main className="page-container">
                {/* Filters */}
                <Card className="mb-6">
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    फसल चुनें
                                </label>
                                <select
                                    value={selectedCrop}
                                    onChange={(e) => setSelectedCrop(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="wheat">गेहूं</option>
                                    <option value="cotton">कपास</option>
                                    <option value="maize">मक्का</option>
                                    <option value="rice">चावल</option>
                                    <option value="soybean">सोयाबीन</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    दूरी: {radius} km
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="10"
                                    value={radius}
                                    onChange={(e) => setRadius(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-600 mt-1">
                                    <span>10 km</span>
                                    <span>100 km</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Price Chart */}
                <div className="mb-6">
                    <PriceChart data={priceHistory} cropName="गेहूं" />
                </div>

                {/* Mandi List */}
                <div className="mb-6">
                    <h2 className="section-heading">आसपास की मंडियाँ</h2>
                    <div className="space-y-4">
                        {demoData.map((mandi, idx) => (
                            <Card key={idx} hoverable>
                                <CardContent>
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900">
                                                {mandi.mandi_name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{mandi.district} • {15 + idx * 5} km</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-primary-600">
                                                ₹{mandi.price_modal}
                                            </p>
                                            <p className="text-xs text-gray-600">प्रति क्विंटल</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-600">न्यूनतम: </span>
                                            <span className="font-semibold">₹{mandi.price_min}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">अधिकतम: </span>
                                            <span className="font-semibold">₹{mandi.price_max}</span>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="badge badge-info">
                                            आवक: {mandi.arrivals} क्विंटल
                                        </span>
                                        {idx === 0 && (
                                            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                                                <TrendingUp className="w-4 h-4" />
                                                <span>+₹50</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Get Recommendation Button */}
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => router.push('/farmer/recommendations')}
                >
                    <TrendingUp className="w-5 h-5" />
                    सबसे अच्छी मंडी सुझाएं
                </Button>
            </main>

            <BottomNav />
        </div>
    );
}
