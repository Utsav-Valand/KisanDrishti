-- KisanDrishti Database Schema
-- PostgreSQL/Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role VARCHAR(20) NOT NULL CHECK (role IN ('farmer', 'buyer', 'admin')),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  language VARCHAR(5) DEFAULT 'hi',
  state VARCHAR(100),
  district VARCHAR(100),
  village VARCHAR(100),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  buyer_type VARCHAR(50), -- 'private', 'fpo', 'bulk_trader'
  business_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crops table
CREATE TABLE crops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  crop_name VARCHAR(100) NOT NULL,
  variety VARCHAR(100),
  quantity DECIMAL(10, 2) NOT NULL, -- in quintals
  quality VARCHAR(50), -- 'A', 'B', 'C' grade
  harvest_date DATE,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mandi prices table
CREATE TABLE mandi_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mandi_name VARCHAR(255) NOT NULL,
  district VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  crop_name VARCHAR(100) NOT NULL,
  variety VARCHAR(100),
  price_min DECIMAL(10, 2),
  price_max DECIMAL(10, 2),
  price_modal DECIMAL(10, 2) NOT NULL, -- most common price
  arrivals DECIMAL(10, 2), -- quantity arrived in quintals
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offers table
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  crop_id UUID NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  price DECIMAL(10, 2) NOT NULL, -- per quintal
  quantity DECIMAL(10, 2) NOT NULL,
  pickup_date DATE,
  payment_mode VARCHAR(50), -- 'cash', 'online', 'credit'
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demand posts table
CREATE TABLE demand_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  crop_name VARCHAR(100) NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  price_range_min DECIMAL(10, 2),
  price_range_max DECIMAL(10, 2),
  radius_km INTEGER DEFAULT 50,
  district VARCHAR(100),
  state VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge articles table
CREATE TABLE knowledge_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(50) NOT NULL, -- 'crop', 'disease', 'weather', 'mandi'
  crop_name VARCHAR(100),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  language VARCHAR(5) DEFAULT 'hi',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50), -- 'offer', 'price_alert', 'weather', 'general'
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_crops_user_id ON crops(user_id);
CREATE INDEX idx_crops_status ON crops(status);
CREATE INDEX idx_mandi_prices_date ON mandi_prices(date);
CREATE INDEX idx_mandi_prices_crop ON mandi_prices(crop_name);
CREATE INDEX idx_mandi_prices_district ON mandi_prices(district);
CREATE INDEX idx_offers_buyer_id ON offers(buyer_id);
CREATE INDEX idx_offers_crop_id ON offers(crop_id);
CREATE INDEX idx_offers_seller_id ON offers(seller_id);
CREATE INDEX idx_demand_posts_buyer_id ON demand_posts(buyer_id);
CREATE INDEX idx_demand_posts_status ON demand_posts(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_chat_messages_sender ON chat_messages(sender_id);
CREATE INDEX idx_chat_messages_receiver ON chat_messages(receiver_id);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE demand_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Farmers can manage their own crops
CREATE POLICY "Farmers can manage own crops" ON crops
  FOR ALL USING (auth.uid() = user_id);

-- Everyone can view available crops
CREATE POLICY "Anyone can view available crops" ON crops
  FOR SELECT USING (status = 'available');

-- Buyers and sellers can view their offers
CREATE POLICY "Users can view their offers" ON offers
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Buyers can create offers
CREATE POLICY "Buyers can create offers" ON offers
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Sellers can update offer status
CREATE POLICY "Sellers can update offers" ON offers
  FOR UPDATE USING (auth.uid() = seller_id);

-- Buyers can manage their demand posts
CREATE POLICY "Buyers can manage demand posts" ON demand_posts
  FOR ALL USING (auth.uid() = buyer_id);

-- Everyone can view active demand posts
CREATE POLICY "Anyone can view active demand posts" ON demand_posts
  FOR SELECT USING (status = 'active');

-- Users can view their notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their notifications
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can view their chat messages
CREATE POLICY "Users can view own messages" ON chat_messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can send messages
CREATE POLICY "Users can send messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Mandi prices are public (read-only for non-admins)
CREATE POLICY "Anyone can view mandi prices" ON mandi_prices
  FOR SELECT USING (true);

-- Knowledge articles are public
CREATE POLICY "Anyone can view knowledge articles" ON knowledge_articles
  FOR SELECT USING (true);
