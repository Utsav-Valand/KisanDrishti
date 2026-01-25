// Farming vocabulary dictionary for common terms
export const farmingVocabulary: Record<string, Record<string, string>> = {
    // Hindi
    hi: {
        mandi: 'मंडी',
        bhav: 'भाव',
        fasal: 'फसल',
        bhugtan: 'भुगतान',
        beej: 'बीज',
        khaad: 'खाद',
        keet: 'कीट',
        rog: 'रोग',
        kisan: 'किसान',
        khareedaar: 'खरीदार',
        quintal: 'क्विंटल',
        price: 'कीमत',
        sell: 'बेचें',
        buy: 'खरीदें',
        crop: 'फसल',
        market: 'बाजार',
        offer: 'प्रस्ताव',
        profit: 'लाभ',
        distance: 'दूरी',
    },
    // Gujarati
    gu: {
        mandi: 'માંડી',
        bhav: 'ભાવ',
        fasal: 'પાક',
        bhugtan: 'ચુકવણી',
        beej: 'બીજ',
        khaad: 'ખાતર',
        keet: 'જીવાત',
        rog: 'રોગ',
        kisan: 'ખેડૂત',
        khareedaar: 'ખરીદદાર',
        quintal: 'ક્વિન્ટલ',
        price: 'કિંમત',
        sell: 'વેચો',
        buy: 'ખરીદો',
        crop: 'પાક',
        market: 'બજાર',
        offer: 'ઓફર',
        profit: 'નફો',
        distance: 'અંતર',
    },
    // Marathi
    mr: {
        mandi: 'मंडी',
        bhav: 'भाव',
        fasal: 'पीक',
        bhugtan: 'देयक',
        beej: 'बियाणे',
        khaad: 'खत',
        keet: 'किडे',
        rog: 'रोग',
        kisan: 'शेतकरी',
        khareedaar: 'खरेदीदार',
        quintal: 'क्विंटल',
        price: 'किंमत',
        sell: 'विक्री',
        buy: 'खरेदी',
        crop: 'पीक',
        market: 'बाजार',
        offer: 'ऑफर',
        profit: 'नफा',
        distance: 'अंतर',
    },
    // Punjabi
    pa: {
        mandi: 'ਮੰਡੀ',
        bhav: 'ਭਾਅ',
        fasal: 'ਫਸਲ',
        bhugtan: 'ਭੁਗਤਾਨ',
        beej: 'ਬੀਜ',
        khaad: 'ਖਾਦ',
        keet: 'ਕੀੜੇ',
        rog: 'ਰੋਗ',
        kisan: 'ਕਿਸਾਨ',
        khareedaar: 'ਖਰੀਦਦਾਰ',
        quintal: 'ਕੁਇੰਟਲ',
        price: 'ਕੀਮਤ',
        sell: 'ਵੇਚੋ',
        buy: 'ਖਰੀਦੋ',
        crop: 'ਫਸਲ',
        market: 'ਮੰਡੀ',
        offer: 'ਪੇਸ਼ਕਸ਼',
        profit: 'ਲਾਭ',
        distance: 'ਦੂਰੀ',
    },
    // Tamil
    ta: {
        mandi: 'மண்டி',
        bhav: 'விலை',
        fasal: 'பயிர்',
        bhugtan: 'கட்டணம்',
        beej: 'விதை',
        khaad: 'உரம்',
        keet: 'பூச்சி',
        rog: 'நோய்',
        kisan: 'விவசாயி',
        khareedaar: 'வாங்குபவர்',
        quintal: 'குவிண்டால்',
        price: 'விலை',
        sell: 'விற்க',
        buy: 'வாங்க',
        crop: 'பயிர்',
        market: 'சந்தை',
        offer: 'சலுகை',
        profit: 'லாபம்',
        distance: 'தூரம்',
    },
};

/**
 * Translate farming terms using vocabulary dictionary
 * @param text Text containing farming terms
 * @param targetLang Target language code
 * @returns Translated text with farming terms replaced
 */
export function translateFarmingTerms(text: string, targetLang: string): string {
    if (!farmingVocabulary[targetLang]) return text;

    let translatedText = text;
    const vocab = farmingVocabulary[targetLang];

    // Replace English farming terms with local language
    Object.entries(vocab).forEach(([english, local]) => {
        const regex = new RegExp(`\\b${english}\\b`, 'gi');
        translatedText = translatedText.replace(regex, local);
    });

    return translatedText;
}

/**
 * Get localized crop names
 */
export const cropNames: Record<string, Record<string, string>> = {
    wheat: {
        en: 'Wheat',
        hi: 'गेहूं',
        gu: 'ઘઉં',
        mr: 'गहू',
        pa: 'ਕਣਕ',
        ta: 'கோதுமை',
    },
    rice: {
        en: 'Rice',
        hi: 'चावल',
        gu: 'ચોખા',
        mr: 'तांदूळ',
        pa: 'ਚੌਲ',
        ta: 'அரிசி',
    },
    cotton: {
        en: 'Cotton',
        hi: 'कपास',
        gu: 'કપાસ',
        mr: 'कापूस',
        pa: 'ਕਪਾਹ',
        ta: 'பருத்தி',
    },
    sugarcane: {
        en: 'Sugarcane',
        hi: 'गन्ना',
        gu: 'શેરડી',
        mr: 'ऊस',
        pa: 'ਗੰਨਾ',
        ta: 'கரும்பு',
    },
    maize: {
        en: 'Maize',
        hi: 'मक्का',
        gu: 'મકાઈ',
        mr: 'मका',
        pa: 'ਮੱਕੀ',
        ta: 'சோளம்',
    },
    soybean: {
        en: 'Soybean',
        hi: 'सोयाबीन',
        gu: 'સોયાબીન',
        mr: 'सोयाबीन',
        pa: 'ਸੋਇਆਬੀਨ',
        ta: 'சோயாபீன்',
    },
    groundnut: {
        en: 'Groundnut',
        hi: 'मूंगफली',
        gu: 'મગફળી',
        mr: 'भुईमूग',
        pa: 'ਮੂੰਗਫਲੀ',
        ta: 'கடலை',
    },
    onion: {
        en: 'Onion',
        hi: 'प्याज',
        gu: 'ડુંગળી',
        mr: 'कांदा',
        pa: 'ਪਿਆਜ਼',
        ta: 'வெங்காயம்',
    },
    tomato: {
        en: 'Tomato',
        hi: 'टमाटर',
        gu: 'ટામેટા',
        mr: 'टोमॅटो',
        pa: 'ਟਮਾਟਰ',
        ta: 'தக்காளி',
    },
    potato: {
        en: 'Potato',
        hi: 'आलू',
        gu: 'બટાકા',
        mr: 'बटाटा',
        pa: 'ਆਲੂ',
        ta: 'உருளைக்கிழங்கு',
    },
};

/**
 * Get crop name in target language
 */
export function getCropName(cropKey: string, lang: string): string {
    return cropNames[cropKey.toLowerCase()]?.[lang] || cropKey;
}
