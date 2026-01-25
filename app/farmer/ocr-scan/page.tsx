'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Camera, Upload, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { extractMandiReceipt, OCRResult } from '@/lib/ocr-helper';

export default function OCRScanPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [image, setImage] = useState<string | null>(null);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<OCRResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview image
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Perform OCR
        setScanning(true);
        setError(null);

        try {
            const ocrResult = await extractMandiReceipt(file);
            setResult(ocrResult);
        } catch (err) {
            setError('रसीद स्कैन करने में त्रुटि। कृपया फिर से प्रयास करें।');
        } finally {
            setScanning(false);
        }
    };

    const handleRetry = () => {
        setImage(null);
        setResult(null);
        setError(null);
    };

    const handleUseData = () => {
        // Navigate to add crop page with pre-filled data
        const params = new URLSearchParams({
            crop: result?.cropName || '',
            quantity: result?.quantity?.toString() || '',
            rate: result?.rate?.toString() || '',
        });
        router.push(`/farmer/crops/add?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-primary-600 text-white p-4 shadow-lg">
                <h1 className="text-2xl font-bold">मंडी रसीद स्कैन करें</h1>
                <p className="text-sm text-primary-100">रसीद की फोटो लें या अपलोड करें</p>
            </header>

            {/* Main Content */}
            <main className="page-container">
                {!image ? (
                    <Card className="mb-6">
                        <CardHeader title="रसीद अपलोड करें" />
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-4">
                                        मंडी रसीद की फोटो लें या गैलरी से चुनें
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <div className="space-y-2">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Camera className="w-5 h-5" />
                                            फोटो लें
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="md"
                                            className="w-full"
                                            onClick={() => {
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.removeAttribute('capture');
                                                    fileInputRef.current.click();
                                                }
                                            }}
                                        >
                                            <Upload className="w-5 h-5" />
                                            गैलरी से चुनें
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">सुझाव:</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• रसीद को अच्छी रोशनी में रखें</li>
                                        <li>• सभी जानकारी स्पष्ट दिखनी चाहिए</li>
                                        <li>• फोटो सीधी और साफ होनी चाहिए</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Image Preview */}
                        <Card className="mb-6">
                            <CardHeader title="रसीद प्रीव्यू" />
                            <CardContent>
                                <img
                                    src={image}
                                    alt="Receipt"
                                    className="w-full rounded-lg border border-gray-300"
                                />
                            </CardContent>
                        </Card>

                        {/* Scanning Status */}
                        {scanning && (
                            <Card className="mb-6 bg-blue-50 border-2 border-blue-200">
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                                        <div>
                                            <p className="font-semibold text-blue-900">स्कैन हो रहा है...</p>
                                            <p className="text-sm text-blue-700">कृपया प्रतीक्षा करें</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Error */}
                        {error && (
                            <Card className="mb-6 bg-red-50 border-2 border-red-200">
                                <CardContent>
                                    <div className="flex items-start gap-3">
                                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-red-900">त्रुटि</p>
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* OCR Result */}
                        {result && !scanning && (
                            <Card className="mb-6 bg-green-50 border-2 border-green-200">
                                <CardHeader
                                    title="स्कैन पूर्ण"
                                    action={<CheckCircle className="w-6 h-6 text-green-600" />}
                                />
                                <CardContent>
                                    <div className="space-y-3">
                                        {result.cropName && (
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-sm text-gray-600">फसल</p>
                                                <p className="font-semibold text-gray-900">{result.cropName}</p>
                                            </div>
                                        )}
                                        {result.quantity && (
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-sm text-gray-600">मात्रा</p>
                                                <p className="font-semibold text-gray-900">{result.quantity} क्विंटल</p>
                                            </div>
                                        )}
                                        {result.rate && (
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-sm text-gray-600">भाव</p>
                                                <p className="font-semibold text-gray-900">₹{result.rate} प्रति क्विंटल</p>
                                            </div>
                                        )}
                                        {result.mandiName && (
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-sm text-gray-600">मंडी</p>
                                                <p className="font-semibold text-gray-900">{result.mandiName}</p>
                                            </div>
                                        )}
                                        {result.date && (
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-sm text-gray-600">तारीख</p>
                                                <p className="font-semibold text-gray-900">{result.date}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Actions */}
                        <div className="space-y-3">
                            {result && (
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    onClick={handleUseData}
                                >
                                    इस डेटा का उपयोग करें
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                size="md"
                                className="w-full"
                                onClick={handleRetry}
                            >
                                <RefreshCw className="w-5 h-5" />
                                फिर से स्कैन करें
                            </Button>
                        </div>
                    </>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
