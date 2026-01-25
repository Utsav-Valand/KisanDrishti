'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Phone, ArrowLeft } from 'lucide-react';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'farmer';

    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async () => {
        if (phone.length !== 10) {
            alert('कृपया 10 अंकों का मोबाइल नंबर डालें');
            return;
        }

        setLoading(true);
        // Simulate OTP sending
        setTimeout(() => {
            setOtpSent(true);
            setLoading(false);
            alert('OTP भेजा गया: 123456 (Demo)');
        }, 1000);
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            alert('कृपया 6 अंकों का OTP डालें');
            return;
        }

        setLoading(true);
        // Simulate OTP verification
        setTimeout(() => {
            setLoading(false);
            // Redirect based on role
            if (role === 'farmer') {
                router.push('/farmer/dashboard');
            } else if (role === 'buyer') {
                router.push('/buyer/dashboard');
            } else {
                router.push('/admin/dashboard');
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>वापस जाएं</span>
                </button>

                {/* Login Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-6">
                        <Phone className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            {role === 'farmer' ? 'किसान लॉगिन' : 'खरीदार लॉगिन'}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            अपने मोबाइल नंबर से लॉगिन करें
                        </p>
                    </div>

                    {!otpSent ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    मोबाइल नंबर
                                </label>
                                <div className="flex gap-2">
                                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        placeholder="10 अंकों का नंबर"
                                        className="flex-1 input-field rounded-l-none"
                                        maxLength={10}
                                    />
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full"
                                onClick={handleSendOTP}
                                loading={loading}
                                disabled={phone.length !== 10}
                            >
                                OTP भेजें
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    OTP दर्ज करें
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="6 अंकों का OTP"
                                    className="input-field"
                                    maxLength={6}
                                />
                                <p className="text-sm text-gray-600 mt-2">
                                    +91 {phone} पर OTP भेजा गया
                                </p>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full"
                                onClick={handleVerifyOTP}
                                loading={loading}
                                disabled={otp.length !== 6}
                            >
                                लॉगिन करें
                            </Button>

                            <Button
                                variant="outline"
                                size="md"
                                className="w-full"
                                onClick={() => setOtpSent(false)}
                            >
                                नंबर बदलें
                            </Button>
                        </div>
                    )}

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>नए यूज़र हैं?</p>
                        <button
                            onClick={() => router.push(`/signup?role=${role}`)}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            साइन अप करें
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
