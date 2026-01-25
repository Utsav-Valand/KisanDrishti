'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import Card, { CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { MapPin, User } from 'lucide-react';

export default function BuyerBrowsePage() {
    const router = useRouter();
    const [filters, setFilters] = useState({
        crop: '',
        district: '',
        minQuantity: '',
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-primary-600 text-white p-4 shadow-lg">
                <h1 className="text-2xl font-bold">फसल खोजें</h1>
                <p className="text-sm text-primary-100">किसानों की उपलब्ध फसलें</p>
            </header>

            {/* Main Content */}
            <main className="page-container">
                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader title="फ़िल्टर" />
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    फसल
                                </label>
                                <select
                                    value={filters.crop}
                                    onChange={(e) => setFilters({ ...filters, crop: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">सभी फसलें</option>
                                    <option value="wheat">गेहूं</option>
                                    <option value="cotton">कपास</option>
                                    <option value="maize">मक्का</option>
                                    <option value="rice">चावल</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    जिला
                                </label>
                                <input
                                    type="text"
                                    value={filters.district}
                                    onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                                    placeholder="जिला दर्ज करें"
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    न्यूनतम मात्रा (क्विंटल)
                                </label>
                                <input
                                    type="number"
                                    value={filters.minQuantity}
                                    onChange={(e) => setFilters({ ...filters, minQuantity: e.target.value })}
                                    placeholder="0"
                                    className="input-field"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Crop Listings */}
                <div className="mb-6">
                    <h2 className="section-heading">उपलब्ध फसलें ({12})</h2>
                    <div className="space-y-4">
                        {[
                            { id: 1, farmer: 'राजेश पटेल', crop: 'गेहूं', variety: 'लोक-1', quantity: 50, quality: 'A', district: 'अहमदाबाद', village: 'धोलका', harvestDate: '2026-02-15' },
                            { id: 2, farmer: 'सुरेश शर्मा', crop: 'कपास', variety: 'BT', quantity: 30, quality: 'B', district: 'सूरत', village: 'बारडोली', harvestDate: '2026-02-20' },
                            { id: 3, farmer: 'विकास कुमार', crop: 'मक्का', variety: 'हाइब्रिड', quantity: 40, quality: 'A', district: 'राजकोट', village: 'गोंडल', harvestDate: '2026-02-10' },
                            { id: 4, farmer: 'रमेश भाई', crop: 'गेहूं', variety: 'GW-322', quantity: 60, quality: 'A', district: 'अहमदाबाद', village: 'सानंद', harvestDate: '2026-02-18' },
                        ].map((listing) => (
                            <Card key={listing.id} hoverable>
                                <CardContent>
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <User className="w-4 h-4 text-gray-600" />
                                                <p className="font-semibold text-gray-900">{listing.farmer}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4" />
                                                <span>{listing.village}, {listing.district}</span>
                                            </div>
                                        </div>
                                        <span className="badge badge-success">उपलब्ध</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <p className="text-sm text-gray-600">फसल</p>
                                            <p className="font-semibold text-gray-900">{listing.crop}</p>
                                            <p className="text-xs text-gray-500">{listing.variety}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">मात्रा</p>
                                            <p className="font-semibold text-gray-900">{listing.quantity} क्विंटल</p>
                                            <p className="text-xs text-gray-500">ग्रेड {listing.quality}</p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-gray-600">कटाई की तारीख</p>
                                        <p className="text-sm font-medium text-gray-900">{listing.harvestDate}</p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="primary"
                                        size="md"
                                        className="w-full"
                                        onClick={() => router.push(`/buyer/offer/${listing.id}`)}
                                    >
                                        ऑफर भेजें
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
