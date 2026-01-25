'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TrendingUp, MapPin, Calendar, DollarSign, Lightbulb } from 'lucide-react';

export default function FarmerRecommendationsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-primary-600 text-white p-4 shadow-lg">
                <h1 className="text-2xl font-bold">AI सलाह</h1>
                <p className="text-sm text-primary-100">गेहूं - 50 क्विंटल</p>
            </header>

            {/* Main Content */}
            <main className="page-container">
                {/* Best Day to Sell */}
                <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                    <CardHeader title="कब बेचें?" />
                    <CardContent>
                        <div className="flex items-start gap-3 mb-4">
                            <div className="bg-green-500 text-white p-3 rounded-full">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xl font-bold text-green-700 mb-2">
                                    आज बेचना सही रहेगा
                                </p>
                                <p className="text-gray-700">
                                    भाव स्थिर हैं और मांग ठीक है। आज बेचना सही रहेगा।
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">भाव ट्रेंड</h4>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                <span className="text-sm font-semibold text-green-600">स्थिर</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                पिछले 7 दिनों में भाव में ₹30 की बढ़ोतरी
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Best Market to Sell */}
                <Card className="mb-6">
                    <CardHeader title="कहाँ बेचें?" subtitle="सबसे अच्छी मंडियाँ" />
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: 'अहमदाबाद मंडी', price: 2450, distance: 15, transport: 750, profit: 121750 },
                                { name: 'गांधीनगर मंडी', price: 2420, distance: 25, transport: 1250, profit: 119750 },
                                { name: 'मेहसाणा मंडी', price: 2400, distance: 45, transport: 2250, profit: 117750 },
                            ].map((market, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-lg border-2 ${idx === 0
                                            ? 'bg-green-50 border-green-300'
                                            : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                {market.name}
                                                {idx === 0 && (
                                                    <span className="badge badge-success text-xs">सर्वश्रेष्ठ</span>
                                                )}
                                            </h4>
                                            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{market.distance} km दूर</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-primary-600">
                                                ₹{market.price}
                                            </p>
                                            <p className="text-xs text-gray-600">प्रति क्विंटल</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="bg-white rounded p-2">
                                            <p className="text-gray-600">कुल आय</p>
                                            <p className="font-semibold text-green-600">
                                                ₹{(market.price * 50).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-white rounded p-2">
                                            <p className="text-gray-600">ट्रांसपोर्ट</p>
                                            <p className="font-semibold text-red-600">
                                                -₹{market.transport}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">
                                                शुद्ध लाभ:
                                            </span>
                                            <span className="text-lg font-bold text-green-700">
                                                ₹{market.profit.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Tips */}
                <Card className="mb-6 bg-blue-50 border-2 border-blue-200">
                    <CardHeader title="अतिरिक्त सुझाव" />
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                <p className="text-sm text-gray-700">
                                    सुबह 8-10 बजे के बीच मंडी पहुंचें, इस समय खरीदार ज्यादा होते हैं
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                <p className="text-sm text-gray-700">
                                    फसल की ग्रेडिंग करवा लें, अच्छी क्वालिटी पर ₹50-100 ज्यादा मिल सकते हैं
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                <p className="text-sm text-gray-700">
                                    5 खरीदारों को ऑफर भेजें, प्लेटफॉर्म पर बेहतर दाम मिल सकता है
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={() => router.push('/farmer/sell-offer')}
                    >
                        <DollarSign className="w-5 h-5" />
                        अब बेचें
                    </Button>

                    <Button
                        variant="outline"
                        size="md"
                        className="w-full"
                        onClick={() => router.push('/farmer/prices')}
                    >
                        सभी भाव देखें
                    </Button>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
