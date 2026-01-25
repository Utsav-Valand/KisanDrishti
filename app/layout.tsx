import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'KisanDrishti - Crop Price Intelligence',
    description: 'AI-powered crop price intelligence and selling guidance platform for Indian farmers',
    manifest: '/manifest.json',
    themeColor: '#16a34a',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'KisanDrishti',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="hi">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
