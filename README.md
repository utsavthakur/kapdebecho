# Vastraangan: India's Heritage Textile Marketplace

Vastraangan is a modern digital platform designed to bridge the gap between traditional Indian artisans (tailors) and customers looking for authentic, custom-stitched heritage wear.

## 🏛️ Vision
To preserve and promote India's rich textile heritage by providing a professional digital storefront for regional master-tailors specialize in crafts like Lucknowi Chikankari, Kanjeevaram Silk, and more.

---

## 🚀 Technology Stack

### Frontend
- **React (Vite)**: For a fast, modern reactive user interface.
- **Tailwind CSS**: A utility-first CSS framework for custom, premium styling.
- **Framer Motion**: Used for smooth, cinematic animations and transitions.
- **Lucide React**: Clean and consistent iconography.

### Backend (Supabase)
- **Supabase Auth**: Secure user registration and login management.
- **Supabase Database**: A powerful PostgreSQL database for storing profiles, products, and orders.
- **RLS (Row Level Security)**: Ensures data privacy (e.g., users can only view their own orders).
- **Supabase Storage**: Hosting for product images and artisan portfolios.
- **Realtime**: Used for instant notifications on order status updates.

---

## 📝 Technical Implementation (Notes for Beginners)

### 1. The Migration Journey
We successfully moved from **Mock Data** (hardcoded constants) to a **Live Backend**:
- **Services Layer**: Created specialized services in `src/services/` to handle all database operations.
- **Asynchronous Data**: Switched the UI to use `useEffect` and `useState` to fetch data from the cloud rather than local files.

### 2. Database Schema
Our database is organized into several key tables:
- **`profiles`**: Extensions of the core user account (names, roles).
- **`tailors`**: Detailed profiles for artisans, including their region and specialization.
- **`services`**: The actual "products" or stitching services offered by tailors.
- **`orders`**: Tracking the lifecycle of a garment from pending to delivered.
- **`crafts`**: A informational table for regional heritage highlights.

### 3. Manual UPI Payment Flow
Since automated payment gateways can be complex for rural artisans, we implemented a **Manual UPI Verification System**:
1. User places an order.
2. A unique **UPI QR Code** is generated for the specific tailor.
3. User pays via their preferred app and submits the **UTR (Transaction ID)**.
4. The tailor reviews the proof and manually confirms the order in their dashboard.

---

## 🛠️ Setting Up Locally

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Supabase Account](https://supabase.com/)

### 1. Environment Configuration
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_public_key
```

### 2. Database Setup
Apply the migrations in the `supabase/migrations/` folder via the Supabase SQL Editor:
1. Run `00001_initial_schema.sql` (Core tables & security).
2. Run `00002_upi_payments.sql` (Payment system support).
3. Run `seed.sql` to populate initial heritage data.

### 3. Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🎨 Design Philosophy
Vastraangan uses a **Premium Heritage Aesthetic**:
- **Color Palette**: Deep Maroons, Ivories, and Charcoal for an editorial feel.
- **Typography**: Serifs for a timeless, trustworthy character.
- **Interactions**: Subtle parallax and focus effects to highlight the craftsmanship of the textiles.
