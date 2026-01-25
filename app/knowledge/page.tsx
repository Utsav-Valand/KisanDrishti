'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BookOpen, Sprout, Bug, Cloud, TrendingUp, MessageCircle } from 'lucide-react';

export default function KnowledgeHubPage() {
    const router = useRouter();

    const categories = [
        {
            icon: <Sprout className="w-8 h-8" />,
            title: 'फसल विश्वकोश',
            subtitle: 'फसलों की जानकारी',
            color: 'from-green-500 to-emerald-600',
            href: '/knowledge/crops',
        },
        {
            icon: <Bug className="w-8 h-8" />,
            title: 'रोग और कीट',
            subtitle: 'पहचान और उपचार',
            color: 'from-red-500 to-rose-600',
            href: '/knowledge/diseases',
        },
        {
            icon: <Cloud className="w-8 h-8" />,
            title: 'मौसम सलाह',
            subtitle: 'फसल सुरक्षा',
            color: 'from-blue-500 to-indigo-600',
            href: '/knowledge/weather',
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'मंडी गाइड',
            subtitle: 'भाव की जानकारी',
            color: 'from-purple-500 to-violet-600',
            href: '/knowledge/mandi-guide',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-primary-600 text-white p-4 shadow-lg">
                <div className="flex items-center gap-3">
                    <BookOpen className="w-8 h-8" />
                    <div>
                        <h1 className="text-2xl font-bold">ज्ञान केंद्र</h1>
                        <p className="text-sm text-primary-100">खेती की पूरी जानकारी</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="page-container">
                {/* AI Chatbot Card */}
                <Card
                    className="mb-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white cursor-pointer"
                    onClick={() => router.push('/knowledge/ai-chat')}
                >
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="bg-white text-primary-600 p-3 rounded-full">
                                <MessageCircle className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-1">AI कृषि मित्र</h3>
                                <p className="text-sm text-primary-100">
                                    अपनी भाषा में सवाल पूछें, तुरंत जवाब पाएं
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Categories Grid */}
                <div className="mb-6">
                    <h2 className="section-heading">विषय</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category, idx) => (
                            <div
                                key={idx}
                                onClick={() => router.push(category.href)}
                                className={`bg-gradient-to-br ${category.color} text-white rounded-lg p-6 shadow-lg cursor-pointer transition-transform active:scale-95`}
                            >
                                <div className="mb-3">{category.icon}</div>
                                <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                                <p className="text-sm opacity-90">{category.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Articles */}
                <Card className="mb-6">
                    <CardHeader title="लोकप्रिय लेख" />
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { title: 'गेहूं की खेती - पूरी जानकारी', category: 'फसल', views: 1234 },
                                { title: 'कपास में सफेद मक्खी का उपचार', category: 'रोग', views: 987 },
                                { title: 'बारिश में फसल कैसे बचाएं', category: 'मौसम', views: 856 },
                                { title: 'मंडी में अच्छा दाम कैसे पाएं', category: 'मंडी', views: 765 },
                            ].map((article, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                                    onClick={() => router.push(`/knowledge/article/${idx + 1}`)}
                                >
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-1">{article.title}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <span className="badge badge-info">{article.category}</span>
                                            <span>• {article.views} views</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Tips Section */}
                <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200">
                    <CardHeader title="आज का सुझाव" />
                    <CardContent>
                        <div className="flex items-start gap-3">
                            <div className="bg-yellow-500 text-white p-2 rounded-full">
                                <Sprout className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 mb-1">
                                    फसल कटाई के बाद
                                </p>
                                <p className="text-sm text-gray-700">
                                    कटाई के तुरंत बाद फसल को छाया में सुखाएं। धूप में सुखाने से गुणवत्ता खराब हो सकती है।
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <BottomNav />
        </div>
    );
}
