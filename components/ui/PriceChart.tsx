'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MandiPrice } from '@/lib/supabase';

interface PriceChartProps {
    data: MandiPrice[];
    cropName: string;
}

export default function PriceChart({ data, cropName }: PriceChartProps) {
    // Transform data for Recharts
    const chartData = data
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((item) => ({
            date: new Date(item.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            price: item.price_modal,
            min: item.price_min,
            max: item.price_max,
        }));

    return (
        <div className="bg-white rounded-lg shadow-card p-4">
            <h3 className="text-lg font-semibold mb-4">{cropName} - Price Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        stroke="#6b7280"
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="#6b7280"
                        label={{ value: '₹/Quintal', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '14px',
                        }}
                        formatter={(value: number) => [`₹${value}`, 'Price']}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ fill: '#16a34a', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 flex justify-around text-sm">
                <div className="text-center">
                    <p className="text-gray-600">Min</p>
                    <p className="font-semibold text-red-600">₹{Math.min(...chartData.map(d => d.min || 0))}</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-600">Max</p>
                    <p className="font-semibold text-green-600">₹{Math.max(...chartData.map(d => d.max || 0))}</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-600">Current</p>
                    <p className="font-semibold text-primary-600">₹{chartData[chartData.length - 1]?.price || 0}</p>
                </div>
            </div>
        </div>
    );
}
