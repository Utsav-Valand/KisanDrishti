'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TrendingUp, ShoppingBag, Plus, Bell, Sprout } from 'lucide-react';

export default function FarmerDashboard() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-primary-600 text-white p-4 shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">नमस्ते, राजेश</h1>
                        <p className="text-sm text-primary-100">अहमदाबाद, गुजरात</p>
                    </div>
                    <button className="relative p-2">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="page-container">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="stat-card">
                        <Sprout className="w-8 h-8 mb-2" />
                        <p className="text-sm opacity-90">मेरी फसलें</p>
                        <p className="text-3xl font-bold">3</p>
                    </div>

                    <div className="stat-card">
                        <ShoppingBag className="w-8 h-8 mb-2" />
                        <p className="text-sm opacity-90">प्राप्त ऑफर</p>
                        <p className="text-3xl font-bold">5</p>
                    </div>
                </div>

                {/* Today's Best Price */}
                <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                    <CardHeader
                        title="आज का सबसे अच्छा भाव"
                        subtitle="गेहूं - अहमदाबाद मंडी"
                    />
                    <CardContent>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-4xl font-bold text-green-700">₹2,450</p>
                                <p className="text-sm text-gray-600">प्रति क्विंटल</p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-green-600" />
                        </div>
                        <div className="mt-4 flex gap-2">
                            <span className="badge badge-success">+₹50 बढ़ा</span>
                            <span className="badge badge-info">15 km दूर</span>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Recommendation */}
                <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
                    <CardHeader title="AI सलाह" />
                    <CardContent>
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white p-2 rounded-full">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 mb-1">
                                    आज बेचना सही रहेगा
                                </p>
                                <p className="text-sm text-gray-700">
                                    गेहूं के भाव स्थिर हैं और मांग अच्छी है। अहमदाबाद मंडी में ₹2,450/क्विंटल मिल रहा है।
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            className="w-full mt-4"
                            onClick={() => router.push('/farmer/recommendations')}
                        >
                            पूरी रिपोर्ट देखें
                        </Button>
                    </CardContent>
                </Card>

                {/* My Crops */}
                <Card className="mb-6">
                    <CardHeader
                        title="मेरी फसलें"
                        action={
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push('/farmer/crops/add')}
                            >
                                <Plus className="w-4 h-4" />
                                जोड़ें
                            </Button>
                        }
                    />
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { name: 'गेहूं', quantity: 50, quality: 'A', status: 'available' },
                                { name: 'कपास', quantity: 30, quality: 'B', status: 'available' },
                                { name: 'मक्का', quantity: 20, quality: 'A', status: 'reserved' },
                            ].map((crop, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900">{crop.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {crop.quantity} क्विंटल • ग्रेड {crop.quality}
                                        </p>
                                    </div>
                                    <span
                                        className={`badge ${crop.status === 'available' ? 'badge-success' : 'badge-warning'
                                            }`}
                                    >
                                        {crop.status === 'available' ? 'उपलब्ध' : 'रिज़र्व'}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="md"
                            className="w-full mt-4"
                            onClick={() => router.push('/farmer/crops')}
                        >
                            सभी फसलें देखें
                        </Button>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => router.push('/farmer/prices')}
                    >
                        <TrendingUp className="w-5 h-5" />
                        भाव देखें
                    </Button>

                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => router.push('/farmer/sell-offer')}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        बेचें
                    </Button>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
