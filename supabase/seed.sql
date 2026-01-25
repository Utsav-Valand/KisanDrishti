-- Demo Data for KisanDrishti Platform
-- Run this after schema.sql to populate with sample data

-- Insert demo users (farmers)
INSERT INTO users (id, role, name, phone, language, state, district, village, lat, lng) VALUES
('f1111111-1111-1111-1111-111111111111', 'farmer', 'राजेश पटेल', '9876543210', 'hi', 'Gujarat', 'Ahmedabad', 'धोलका', 23.0225, 72.5714),
('f2222222-2222-2222-2222-222222222222', 'farmer', 'सुरेश शर्मा', '9876543211', 'hi', 'Gujarat', 'Surat', 'बारडोली', 21.1702, 72.8311),
('f3333333-3333-3333-3333-333333333333', 'farmer', 'विकास कुमार', '9876543212', 'hi', 'Gujarat', 'Rajkot', 'गोंडल', 22.3039, 70.8022);

-- Insert demo users (buyers)
INSERT INTO users (id, role, name, phone, language, state, district, buyer_type, business_name, lat, lng) VALUES
('b1111111-1111-1111-1111-111111111111', 'buyer', 'अमित ट्रेडर्स', '9876543220', 'hi', 'Gujarat', 'Ahmedabad', 'bulk_trader', 'अमित ट्रेडर्स', 23.0225, 72.5714),
('b2222222-2222-2222-2222-222222222222', 'buyer', 'गुजरात FPO', '9876543221', 'hi', 'Gujarat', 'Gandhinagar', 'fpo', 'गुजरात FPO', 23.2156, 72.6369);

-- Insert demo crops
INSERT INTO crops (id, user_id, crop_name, variety, quantity, quality, harvest_date, status) VALUES
('c1111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 'wheat', 'लोक-1', 50, 'A', '2026-02-15', 'available'),
('c2222222-2222-2222-2222-222222222222', 'f2222222-2222-2222-2222-222222222222', 'cotton', 'BT', 30, 'B', '2026-02-20', 'available'),
('c3333333-3333-3333-3333-333333333333', 'f3333333-3333-3333-3333-333333333333', 'maize', 'हाइब्रिड', 40, 'A', '2026-02-10', 'available');

-- Insert mandi prices (last 7 days for wheat)
INSERT INTO mandi_prices (mandi_name, district, state, crop_name, variety, price_min, price_max, price_modal, arrivals, date) VALUES
-- Ahmedabad Mandi - Wheat
('अहमदाबाद मंडी', 'Ahmedabad', 'Gujarat', 'wheat', 'लोक-1', 2350, 2450, 2400, 150, '2026-01-15'),
('अहमदाबाद मंडी', 'Ahmedabad', 'Gujarat', 'wheat', 'लोक-1', 2370, 2470, 2420, 160, '2026-01-18'),
('अहमदाबाद मंडी', 'Ahmedabad', 'Gujarat', 'wheat', 'लोक-1', 2400, 2500, 2450, 150, '2026-01-21'),

-- Gandhinagar Mandi - Wheat
('गांधीनगर मंडी', 'Gandhinagar', 'Gujarat', 'wheat', 'लोक-1', 2330, 2430, 2380, 120, '2026-01-15'),
('गांधीनगर मंडी', 'Gandhinagar', 'Gujarat', 'wheat', 'लोक-1', 2350, 2450, 2400, 130, '2026-01-18'),
('गांधीनगर मंडी', 'Gandhinagar', 'Gujarat', 'wheat', 'लोक-1', 2380, 2460, 2420, 120, '2026-01-21'),

-- Mehsana Mandi - Wheat
('मेहसाणा मंडी', 'Mehsana', 'Gujarat', 'wheat', 'लोक-1', 2300, 2400, 2350, 100, '2026-01-15'),
('मेहसाणा मंडी', 'Mehsana', 'Gujarat', 'wheat', 'लोक-1', 2320, 2420, 2370, 110, '2026-01-18'),
('मेहसाणा मंडी', 'Mehsana', 'Gujarat', 'wheat', 'लोक-1', 2350, 2450, 2400, 100, '2026-01-21'),

-- Cotton prices
('सूरत मंडी', 'Surat', 'Gujarat', 'cotton', 'BT', 5400, 5700, 5550, 80, '2026-01-21'),
('राजकोट मंडी', 'Rajkot', 'Gujarat', 'cotton', 'BT', 5350, 5650, 5500, 70, '2026-01-21'),

-- Maize prices
('राजकोट मंडी', 'Rajkot', 'Gujarat', 'maize', 'हाइब्रिड', 1750, 1850, 1800, 120, '2026-01-21'),
('अहमदाबाद मंडी', 'Ahmedabad', 'Gujarat', 'maize', 'हाइब्रिड', 1780, 1880, 1830, 100, '2026-01-21');

-- Insert demo offers
INSERT INTO offers (buyer_id, crop_id, seller_id, price, quantity, pickup_date, payment_mode, status, message) VALUES
('b1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 2450, 50, '2026-02-16', 'online', 'pending', 'अच्छी क्वालिटी है। हम पूरी मात्रा लेना चाहते हैं।'),
('b2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'f2222222-2222-2222-2222-222222222222', 5600, 30, '2026-02-21', 'cash', 'accepted', 'FPO के लिए खरीद रहे हैं।');

-- Insert demo demand posts
INSERT INTO demand_posts (buyer_id, crop_name, quantity, price_range_min, price_range_max, radius_km, district, state, status) VALUES
('b1111111-1111-1111-1111-111111111111', 'wheat', 100, 2400, 2500, 50, 'Ahmedabad', 'Gujarat', 'active'),
('b1111111-1111-1111-1111-111111111111', 'cotton', 50, 5500, 5800, 100, 'Surat', 'Gujarat', 'active'),
('b2222222-2222-2222-2222-222222222222', 'maize', 80, 1750, 1850, 75, 'Rajkot', 'Gujarat', 'active');

-- Insert knowledge articles (Hindi)
INSERT INTO knowledge_articles (category, crop_name, title, content, language) VALUES
('crop', 'wheat', 'गेहूं की खेती - पूरी जानकारी', 
'गेहूं रबी की मुख्य फसल है। बुवाई का समय: नवंबर-दिसंबर। तापमान: 20-25°C। बीज दर: 100-125 kg/हेक्टेयर। पंक्ति से पंक्ति की दूरी: 20-23 cm। सिंचाई: 4-6 बार। खाद: DAP बुवाई के समय, यूरिया 20-25 दिन बाद। कटाई: मार्च-अप्रैल। उपज: 40-50 क्विंटल/हेक्टेयर।', 'hi'),

('disease', 'cotton', 'कपास में सफेद मक्खी का उपचार',
'लक्षण: पत्तियों पर सफेद कीड़े, पत्तियां पीली पड़ना। रोकथाम: 1) नीम का तेल 5ml/लीटर पानी में स्प्रे 2) पीले चिपचिपे ट्रैप लगाएं 3) फसल चक्र अपनाएं। रासायनिक उपचार: इमिडाक्लोप्रिड 0.5ml/लीटर (केवल जरूरत पर)। सावधानी: कीटनाशक का उपयोग कृषि विशेषज्ञ की सलाह से करें।', 'hi'),

('weather', NULL, 'बारिश में फसल कैसे बचाएं',
'बारिश से पहले: 1) जल निकासी की व्यवस्था करें 2) कटी हुई फसल को ढक दें 3) खड़ी फसल में सहारा दें। बारिश के बाद: 1) खेत में जमा पानी निकालें 2) फफूंदनाशक का स्प्रे करें 3) पोषक तत्व डालें। आपातकालीन नंबर: 1800-180-1551 (किसान कॉल सेंटर)', 'hi'),

('mandi', NULL, 'मंडी में अच्छा दाम कैसे पाएं',
'सुझाव: 1) सुबह 8-10 बजे मंडी पहुंचें 2) फसल की ग्रेडिंग करवाएं 3) कई खरीदारों से बात करें 4) जल्दबाजी न करें 5) मंडी शुल्क और कमीशन समझें। ऑनलाइन भाव: eNAM पोर्टल या KisanDrishti ऐप पर चेक करें। याद रखें: MSP (न्यूनतम समर्थन मूल्य) से कम पर न बेचें।', 'hi');

-- Insert demo notifications
INSERT INTO notifications (user_id, title, message, type, read) VALUES
('f1111111-1111-1111-1111-111111111111', 'नया ऑफर मिला', 'अमित ट्रेडर्स ने आपकी गेहूं की फसल पर ₹2450/क्विंटल का ऑफर भेजा है।', 'offer', false),
('f1111111-1111-1111-1111-111111111111', 'भाव में बढ़ोतरी', 'अहमदाबाद मंडी में गेहूं का भाव ₹2450 हो गया है। +₹50 की बढ़ोतरी।', 'price_alert', false);

-- Insert demo chat messages
INSERT INTO chat_messages (sender_id, receiver_id, message, read) VALUES
('b1111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 'नमस्ते, आपकी गेहूं की फसल की क्वालिटी कैसी है?', true),
('f1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'नमस्ते, A ग्रेड है। बहुत अच्छी क्वालिटी है।', false);
