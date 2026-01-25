import Tesseract from 'tesseract.js';

export interface OCRResult {
    cropName?: string;
    quantity?: number;
    rate?: number;
    mandiName?: string;
    date?: string;
    rawText: string;
}

/**
 * Extract text from mandi receipt image using OCR
 * @param imageFile Image file or blob
 * @returns Extracted data from receipt
 */
export async function extractMandiReceipt(
    imageFile: File | Blob
): Promise<OCRResult> {
    try {
        // Perform OCR
        const result = await Tesseract.recognize(imageFile, 'eng+hin', {
            logger: (m) => console.log(m), // Progress logging
        });

        const text = result.data.text;

        // Parse the extracted text
        const parsed = parseMandiReceipt(text);

        return {
            ...parsed,
            rawText: text,
        };
    } catch (error) {
        console.error('OCR Error:', error);
        throw new Error('Failed to extract text from image');
    }
}

/**
 * Parse mandi receipt text to extract structured data
 */
function parseMandiReceipt(text: string): Partial<OCRResult> {
    const result: Partial<OCRResult> = {};

    // Extract quantity (look for patterns like "100 Qtl", "50 quintal")
    const quantityMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:qtl|quintal|क्विंटल)/i);
    if (quantityMatch) {
        result.quantity = parseFloat(quantityMatch[1]);
    }

    // Extract rate/price (look for patterns like "₹2500", "Rs. 2500")
    const rateMatch = text.match(/(?:₹|Rs\.?|रु\.?)\s*(\d+(?:,\d+)?(?:\.\d+)?)/i);
    if (rateMatch) {
        result.rate = parseFloat(rateMatch[1].replace(/,/g, ''));
    }

    // Extract date (DD/MM/YYYY or DD-MM-YYYY)
    const dateMatch = text.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (dateMatch) {
        result.date = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
    }

    // Extract mandi name (look for "Mandi" keyword)
    const mandiMatch = text.match(/([A-Za-z\s]+)\s*(?:mandi|मंडी)/i);
    if (mandiMatch) {
        result.mandiName = mandiMatch[1].trim();
    }

    // Extract crop name (common crops)
    const crops = ['wheat', 'rice', 'cotton', 'maize', 'soybean', 'onion', 'tomato', 'potato',
        'गेहूं', 'चावल', 'कपास', 'मक्का', 'सोयाबीन', 'प्याज', 'टमाटर', 'आलू'];

    for (const crop of crops) {
        const regex = new RegExp(crop, 'i');
        if (regex.test(text)) {
            result.cropName = crop;
            break;
        }
    }

    return result;
}

/**
 * Validate OCR result
 */
export function validateOCRResult(result: OCRResult): boolean {
    return !!(result.cropName || result.quantity || result.rate);
}
