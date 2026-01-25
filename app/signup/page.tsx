'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { User, MapPin, ArrowLeft } from 'lucide-react';

function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'farmer';

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        state: '',
        district: '',
        village: '',
        language: 'hi',
        buyerType: '',
        businessName: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.name || !formData.phone || !formData.district) {
            alert('कृपया सभी आवश्यक फ़ील्ड भरें');
            return;
        }

        setLoading(true);
        // Simulate signup
        setTimeout(() => {
            setLoading(false);
            router.push(`/login?role=${role}`);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white p-4 pb-20">
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 mt-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>वापस जाएं</span>
                </button>

                {/* Signup Card */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="text-center mb-6">
                        <User className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            {role === 'farmer' ? 'किसान रजिस्ट्रेशन' : 'खरीदार रजिस्ट्रेशन'}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                नाम *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="अपना नाम दर्ज करें"
                                className="input-field"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                मोबाइल नंबर *
                            </label>
                            <div className="flex gap-2">
                                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                    placeholder="10 अंकों का नंबर"
                                    className="flex-1 input-field rounded-l-none"
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    राज्य *
                                </label>
                                <select
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">चुनें</option>
                                    <option value="Gujarat">गुजरात</option>
                                    <option value="Maharashtra">महाराष्ट्र</option>
                                    <option value="Punjab">पंजाब</option>
                                    <option value="Tamil Nadu">तमिलनाडु</option>
                                    <option value="Madhya Pradesh">मध्य प्रदेश</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    जिला *
                                </label>
                                <input
                                    type="text"
                                    value={formData.district}
                                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                    placeholder="जिला"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        {role === 'farmer' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    गाँव
                                </label>
                                <input
                                    type="text"
                                    value={formData.village}
                                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                                    placeholder="गाँव का नाम"
                                    className="input-field"
                                />
                            </div>
                        )}

                        {role === 'buyer' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        खरीदार का प्रकार
                                    </label>
                                    <select
                                        value={formData.buyerType}
                                        onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="">चुनें</option>
                                        <option value="private">निजी खरीदार</option>
                                        <option value="fpo">FPO</option>
                                        <option value="bulk_trader">थोक व्यापारी</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        व्यवसाय का नाम
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                        placeholder="व्यवसाय का नाम"
                                        className="input-field"
                                    />
                                </div>
                            </>
                        )}

                        {/* Language */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                पसंदीदा भाषा
                            </label>
                            <select
                                value={formData.language}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                className="input-field"
                            >
                                <option value="hi">हिंदी</option>
                                <option value="gu">ગુજરાતી</option>
                                <option value="mr">मराठी</option>
                                <option value="pa">ਪੰਜਾਬੀ</option>
                                <option value="ta">தமிழ்</option>
                                <option value="en">English</option>
                            </select>
                        </div>

                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full mt-6"
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            रजिस्टर करें
                        </Button>

                        <div className="text-center text-sm text-gray-600 mt-4">
                            <p>पहले से अकाउंट है?</p>
                            <button
                                onClick={() => router.push(`/login?role=${role}`)}
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                लॉगिन करें
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
        </Suspense>
    );
}
