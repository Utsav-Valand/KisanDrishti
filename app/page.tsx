'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { Sprout, TrendingUp, Users, BookOpen } from 'lucide-react';

export default function HomePage() {
    const router = useRouter();
    const [language, setLanguage] = useState('hi');

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
            {/* Header */}
            <header className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Sprout className="w-8 h-8 text-primary-600" />
                    <h1 className="text-2xl font-bold text-primary-700">KisanDrishti</h1>
                </div>
                <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            </header>

            {/* Hero Section */}
            <main className="px-6 py-12 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        {language === 'hi' ? 'सही दाम, सही समय' : 'Right Price, Right Time'}
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        {language === 'hi'
                            ? 'AI की मदद से अपनी फसल का सबसे अच्छा दाम पाएं'
                            : 'Get the best price for your crops with AI guidance'}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-card p-6 text-center">
                        <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-lg mb-2">
                            {language === 'hi' ? 'लाइव मंडी भाव' : 'Live Mandi Prices'}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {language === 'hi'
                                ? 'आसपास की सभी मंडियों के ताज़ा भाव देखें'
                                : 'View latest prices from nearby mandis'}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-card p-6 text-center">
                        <Users className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-lg mb-2">
                            {language === 'hi' ? 'सीधे खरीदार' : 'Direct Buyers'}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {language === 'hi'
                                ? 'खरीदारों से सीधे संपर्क करें'
                                : 'Connect directly with buyers'}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-card p-6 text-center">
                        <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-lg mb-2">
                            {language === 'hi' ? 'AI सलाह' : 'AI Guidance'}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {language === 'hi'
                                ? 'कब और कहाँ बेचें - AI बताएगा'
                                : 'When and where to sell - AI will guide'}
                        </p>
                    </div>
                </div>

                {/* Role Selection */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-center mb-6">
                        {language === 'hi' ? 'आप कौन हैं?' : 'Who are you?'}
                    </h3>

                    <div className="space-y-4">
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full"
                            onClick={() => router.push('/login?role=farmer')}
                        >
                            <Sprout className="w-6 h-6" />
                            {language === 'hi' ? 'मैं किसान हूँ' : 'I am a Farmer'}
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-full"
                            onClick={() => router.push('/login?role=buyer')}
                        >
                            <Users className="w-6 h-6" />
                            {language === 'hi' ? 'मैं खरीदार हूँ' : 'I am a Buyer'}
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full"
                            onClick={() => router.push('/knowledge')}
                        >
                            <BookOpen className="w-6 h-6" />
                            {language === 'hi' ? 'ज्ञान केंद्र' : 'Knowledge Hub'}
                        </Button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 text-gray-600 text-sm">
                    <p>{language === 'hi' ? 'भारतीय किसानों के लिए बनाया गया' : 'Made for Indian Farmers'}</p>
                </div>
            </main>
        </div>
    );
}
