# KisanDrishti

**AI-Powered Crop Price Intelligence Platform for Indian Farmers**

KisanDrishti is a comprehensive mobile-first web platform that helps Indian farmers get the best price for their crops through real-time mandi price analysis, AI-powered recommendations, and direct buyer connections.

## 🌟 Features

### For Farmers
- **Live Mandi Prices**: Real-time prices from nearby APMC mandis
- **AI Price Predictions**: 3/7/14 day price forecasts with confidence scores using time-series analysis
- **AI Recommendations**: Best market and best day to sell suggestions
- **Price Trends**: Visual charts showing 7-day price movements
- **Direct Buyer Connect**: Receive offers from private buyers, FPOs, and traders
- **OCR Receipt Scanner**: Scan mandi receipts to auto-fill crop details
- **Voice Input/Output**: Speak your queries in Hindi and other regional languages
- **Offline Support**: Access cached prices and knowledge articles offline

### For Buyers
- **Browse Crops**: Filter and search available crops by type, location, quantity
- **Send Offers**: Make price offers directly to farmers
- **Demand Posts**: Publish crop requirements to attract sellers
- **Chat System**: Communicate with farmers in-app

### Knowledge Hub
- **Crop Encyclopedia**: Detailed information on major crops
- **Disease Guide**: Pest identification and treatment
- **Weather Alerts**: Crop protection based on weather
- **AI Chatbot**: Ask farming questions in simple language

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS (WhatsApp-style UI)
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth (Phone OTP)
- **Storage**: Supabase Storage
- **Charts**: Recharts
- **Maps**: Leaflet + OpenStreetMap
- **OCR**: Tesseract.js
- **Voice**: Web Speech API
- **PWA**: next-pwa
- **i18n**: 6 languages (Hindi, Gujarati, Marathi, Punjabi, Tamil, English)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### Setup Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd "Krishi Mitra"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings → API
   - Copy your project URL and anon key

4. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. **Set up database**
   - Go to Supabase Dashboard → SQL Editor
   - Run `supabase/schema.sql` to create tables
   - Run `supabase/seed.sql` to add demo data

6. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
   - Deploy!

3. **Update Supabase settings**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel URL to allowed redirect URLs

## 📱 PWA Installation

The app can be installed on mobile devices:
1. Open the app in Chrome/Safari
2. Tap the "Add to Home Screen" option
3. The app will work offline with cached data

## 🌐 Supported Languages

- Hindi (हिंदी) - Default
- Gujarati (ગુજરાતી)
- Marathi (मराठी)
- Punjabi (ਪੰਜਾਬੀ)
- Tamil (தமிழ்)
- English

## 📂 Project Structure

```
Krishi Mitra/
├── app/                      # Next.js app directory
│   ├── farmer/              # Farmer module pages
│   ├── buyer/               # Buyer module pages
│   ├── knowledge/           # Knowledge hub pages
│   ├── login/               # Authentication
│   └── signup/              # Registration
├── components/              # Reusable components
│   └── ui/                  # UI components
├── lib/                     # Utilities and helpers
│   ├── supabase.ts         # Database client
│   ├── recommendation-engine.ts  # AI logic
│   ├── ocr-helper.ts       # OCR functionality
│   └── translation-helper.ts     # i18n utilities
├── public/                  # Static assets
│   ├── manifest.json       # PWA manifest
│   └── locales/            # Translation files
└── supabase/               # Database files
    ├── schema.sql          # Database schema
    └── seed.sql            # Demo data
```

## 🎯 Key Features Implementation

### 1. Voice Input/Output
Uses Web Speech API for:
- Speech-to-text for farmer queries
- Text-to-speech for AI responses
- Supports Hindi and regional languages

### 2. OCR Receipt Scanner
- Uses Tesseract.js for client-side OCR
- Extracts: crop name, quantity, rate, mandi name, date
- Auto-fills crop listing form

### 3. AI Recommendations
Rule-based engine that analyzes:
- 7-day price trends (moving average)
- Distance to markets
- Transport costs
- Demand signals from buyer posts
- Day-of-week patterns

### 4. Offline Support
PWA features:
- Service worker caches last 7 days of prices
- Knowledge articles cached
- Works without internet
- Low data mode option

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Phone OTP authentication
- Secure API routes
- Environment variables for sensitive data

## 🤝 Contributing

This is a demo project. For production use:
1. Implement actual SMS/WhatsApp integration (Twilio/MSG91)
2. ~~Add ML models for better price predictions~~ ✅ **DONE** - Time-series + regression prediction engine
3. Integrate real-time mandi price APIs (data.gov.in APMC API)
4. Add payment gateway for transactions
5. Implement proper admin panel
6. Add weather API integration for prediction accuracy
7. Implement prediction caching (Redis/Supabase)

## 🤖 AI Features

### Price Prediction Engine
- **Endpoint**: `POST /api/ai/predict-price`
- **Features**: 3/7/14 day price forecasts with confidence scores
- **Algorithm**: Time-series analysis (MA7/14/30) + regression (arrivals, weather, demand)
- **Documentation**: See [docs/PRICE_PREDICTION_ENGINE.md](docs/PRICE_PREDICTION_ENGINE.md)

**Test the API:**
```powershell
# Windows PowerShell
.\test-api.ps1

# Or manually
Invoke-RestMethod -Uri "http://localhost:3000/api/ai/predict-price" `
  -Method POST -ContentType "application/json" `
  -Body (Get-Content test-data.json -Raw)
```

## 📄 License

MIT License - feel free to use for educational purposes

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Contact: [utsavvaland0@gmail.com]

---

**Made with ❤️ for Indian Farmers**
