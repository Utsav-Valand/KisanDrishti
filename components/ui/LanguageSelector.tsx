'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

const languages = [
    { code: 'hi', name: 'हिंदी', nativeName: 'Hindi' },
    { code: 'gu', name: 'ગુજરાતી', nativeName: 'Gujarati' },
    { code: 'mr', name: 'मराठी', nativeName: 'Marathi' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', nativeName: 'Punjabi' },
    { code: 'ta', name: 'தமிழ்', nativeName: 'Tamil' },
    { code: 'en', name: 'English', nativeName: 'English' },
];

interface LanguageSelectorProps {
    currentLanguage: string;
    onLanguageChange?: (lang: string) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;

        if (onLanguageChange) {
            onLanguageChange(newLang);
        } else {
            // Update URL with new language
            const currentPath = window.location.pathname;
            const newPath = `/${newLang}${currentPath.substring(3)}`; // Replace language code
            router.push(newPath);
        }
    };

    return (
        <div className="relative inline-block">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-3 py-2 border border-gray-200">
                <Globe className="w-5 h-5 text-primary-600" />
                <select
                    value={currentLanguage}
                    onChange={handleChange}
                    className="bg-transparent border-none focus:outline-none text-sm font-medium cursor-pointer"
                >
                    {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
