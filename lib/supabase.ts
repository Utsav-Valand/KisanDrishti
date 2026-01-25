import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (for API routes)
export const getServerSupabase = () => {
    return createClient(
        supabaseUrl,
        process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
    );
};

// Database types
export interface User {
    id: string;
    role: 'farmer' | 'buyer' | 'admin';
    name: string;
    phone: string;
    language: string;
    state?: string;
    district?: string;
    village?: string;
    lat?: number;
    lng?: number;
    buyer_type?: string;
    business_name?: string;
    created_at: string;
    updated_at: string;
}

export interface Crop {
    id: string;
    user_id: string;
    crop_name: string;
    variety?: string;
    quantity: number;
    quality?: string;
    harvest_date?: string;
    status: 'available' | 'sold' | 'reserved';
    created_at: string;
    updated_at: string;
}

export interface MandiPrice {
    id: string;
    mandi_name: string;
    district: string;
    state: string;
    crop_name: string;
    variety?: string;
    price_min?: number;
    price_max?: number;
    price_modal: number;
    arrivals?: number;
    date: string;
    created_at: string;
}

export interface Offer {
    id: string;
    buyer_id: string;
    crop_id: string;
    seller_id: string;
    price: number;
    quantity: number;
    pickup_date?: string;
    payment_mode?: string;
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
    message?: string;
    created_at: string;
    updated_at: string;
}

export interface DemandPost {
    id: string;
    buyer_id: string;
    crop_name: string;
    quantity: number;
    price_range_min?: number;
    price_range_max?: number;
    radius_km: number;
    district?: string;
    state?: string;
    status: 'active' | 'fulfilled' | 'expired';
    created_at: string;
    updated_at: string;
}

export interface KnowledgeArticle {
    id: string;
    category: string;
    crop_name?: string;
    title: string;
    content: string;
    language: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
}

export interface Notification {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type?: string;
    read: boolean;
    created_at: string;
}

export interface ChatMessage {
    id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    read: boolean;
    created_at: string;
}
