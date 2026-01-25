'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ShoppingBag, TrendingUp, Users, Package } from 'lucide-react';

export default function BuyerDashboard() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-primary-600 text-white p-4 shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">नमस्ते, अमित ट्रेडर्स</h1>
                        <p className="text-sm text-primary-100">थोक व्यापारी • अहमदाबाद</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="page-container">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="stat-card">
                        <ShoppingBag className="w-8 h-8 mb-2" />
                        <p className="text-sm opacity-90">भेजे गए ऑफर</p>
                        <p className="text-3xl font-bold">8</p>
                    </div>

                    <div className="stat-card">
                        <Package className="w-8 h-8 mb-2" />
                        <p className="text-sm opacity-90">खरीदी गई फसल</p>
                        <p className="text-3xl font-bold">450</p>
                        <p className="text-xs opacity-75">क्विंटल</p>
                    </div>
                </div>

                {/* Active Demand Posts */}
                <Card className="mb-6">
                    <CardHeader
                        title="मेरी मांग"
                        action={
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push('/buyer/demand')}
                            >
                                नई मांग
                            </Button>
                        }
                    />
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { crop: 'गेहूं', quantity: 100, priceRange: '2400-2500', responses: 5 },
                                { crop: 'कपास', quantity: 50, priceRange: '5500-5800', responses: 3 },
                            ].map((demand, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900">{demand.crop}</p>
                                        <p className="text-sm text-gray-600">
                                            {demand.quantity} क्विंटल • ₹{demand.priceRange}
                                        </p>
                                    </div>
                                    <span className="badge badge-info">{demand.responses} प्रतिक्रियाएं</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Offers */}
                <Card className="mb-6">
                    <CardHeader title="हाल के ऑफर" />
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { farmer: 'राजेश पटेल', crop: 'गेहूं', quantity: 50, price: 2450, status: 'pending' },
                                { farmer: 'सुरेश शर्मा', crop: 'कपास', quantity: 30, price: 5600, status: 'accepted' },
                                { farmer: 'विकास कुमार', crop: 'मक्का', quantity: 40, price: 1800, status: 'rejected' },
                            ].map((offer, idx) => (
                                <div
                                    key={idx}
                                    className="p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-semibold text-gray-900">{offer.farmer}</p>
                                            <p className="text-sm text-gray-600">
                                                {offer.crop} • {offer.quantity} क्विंटल
                                            </p>
                                        </div>
                                        <span
                                            className={`badge ${offer.status === 'accepted'
                                                    ? 'badge-success'
                                                    : offer.status === 'pending'
                                                        ? 'badge-warning'
                                                        : 'badge-danger'
                                                }`}
                                        >
                                            {offer.status === 'accepted' ? 'स्वीकृत' : offer.status === 'pending' ? 'लंबित' : 'अस्वीकृत'}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-primary-600">₹{offer.price} प्रति क्विंटल</p>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="md"
                            className="w-full mt-4"
                            onClick={() => router.push('/buyer/offers')}
                        >
                            सभी ऑफर देखें
                        </Button>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => router.push('/buyer/browse')}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        फसल खोजें
                    </Button>

                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => router.push('/buyer/chat')}
                    >
                        <Users className="w-5 h-5" />
                        चैट
                    </Button>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
