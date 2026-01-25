'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, TrendingUp, ShoppingBag, MessageCircle, BookOpen } from 'lucide-react';

interface NavItem {
    href: string;
    icon: React.ReactNode;
    label: string;
    activePattern: RegExp;
}

export default function BottomNav() {
    const pathname = usePathname();

    // Determine user role from pathname
    const role = pathname.split('/')[1]; // 'farmer', 'buyer', or 'knowledge'

    const farmerNav: NavItem[] = [
        { href: '/farmer/dashboard', icon: <Home className="w-6 h-6" />, label: 'Home', activePattern: /^\/farmer\/dashboard/ },
        { href: '/farmer/prices', icon: <TrendingUp className="w-6 h-6" />, label: 'Prices', activePattern: /^\/farmer\/prices/ },
        { href: '/farmer/sell-offer', icon: <ShoppingBag className="w-6 h-6" />, label: 'Sell', activePattern: /^\/farmer\/sell/ },
        { href: '/farmer/offers', icon: <MessageCircle className="w-6 h-6" />, label: 'Offers', activePattern: /^\/farmer\/offers/ },
        { href: '/knowledge', icon: <BookOpen className="w-6 h-6" />, label: 'Knowledge', activePattern: /^\/knowledge/ },
    ];

    const buyerNav: NavItem[] = [
        { href: '/buyer/dashboard', icon: <Home className="w-6 h-6" />, label: 'Home', activePattern: /^\/buyer\/dashboard/ },
        { href: '/buyer/browse', icon: <ShoppingBag className="w-6 h-6" />, label: 'Browse', activePattern: /^\/buyer\/browse/ },
        { href: '/buyer/demand', icon: <TrendingUp className="w-6 h-6" />, label: 'Demand', activePattern: /^\/buyer\/demand/ },
        { href: '/buyer/chat', icon: <MessageCircle className="w-6 h-6" />, label: 'Chat', activePattern: /^\/buyer\/chat/ },
        { href: '/knowledge', icon: <BookOpen className="w-6 h-6" />, label: 'Knowledge', activePattern: /^\/knowledge/ },
    ];

    const navItems = role === 'farmer' ? farmerNav : role === 'buyer' ? buyerNav : [];

    if (navItems.length === 0) return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 pb-safe-bottom">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = item.activePattern.test(pathname);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive
                                    ? 'text-primary-600'
                                    : 'text-gray-600 hover:text-primary-500'
                                }`}
                        >
                            <div className={`${isActive ? 'scale-110' : ''} transition-transform`}>
                                {item.icon}
                            </div>
                            <span className="text-xs mt-1 font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
