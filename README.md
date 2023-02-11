# SoleCraft Frontend

A modern e-commerce frontend application for custom shoe design and sales, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Modern UI/UX with Tailwind CSS
- Authentication system (login, registration, guest checkout)
- Product catalog with filters and search
- Shopping cart functionality
- User dashboard and profile management
- State management with Zustand
- API integration ready for SoleCraft backend
- Responsive design (mobile-first)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **API Client**: Axios + TanStack Query
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see .env.example)
4. Run development server: `npm run dev`
5. Open http://localhost:3000

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
├── components/             # React components
├── lib/                    # Utility libraries
├── stores/                 # Zustand stores
├── types/                  # TypeScript types
└── hooks/                  # Custom hooks
```

## API Integration

Configure the API base URL in environment variables:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT License

## 🚀 Features

### ✅ Implemented Core Features
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Authentication System**: Login, registration, and guest checkout support
- **Product Catalog**: Product listing with filters and search functionality
- **Shopping Cart**: Add, remove, and manage cart items
- **User Dashboard**: Profile management and order history
- **State Management**: Zustand for cart and authentication state
- **API Integration**: Ready for SoleCraft backend API integration
- **Responsive Design**: Mobile-first approach with tablet and desktop support

### 🔄 Ready for Implementation
- **Product Customization**: Framework ready for customization options
- **Order Management**: Checkout flow and order tracking
- **Admin Dashboard**: Basic scaffolding for admin features
- **Payment Integration**: Prepared for payment gateway integration

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **API Client**: Axios + TanStack Query
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Animations**: Framer Motion (ready for implementation)

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── common/            # Common components (header, footer)
│   ├── pages/             # Page-specific components
│   └── providers.tsx      # App providers (Auth, Query Client)
├── lib/
│   ├── api.ts             # API configuration and functions
│   └── utils.ts           # Utility functions
├── stores/
│   ├── authStore.ts       # Authentication state
│   └── cartStore.ts       # Shopping cart state
├── types/
│   └── index.ts           # TypeScript type definitions
└── hooks/                 # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd solecraft-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌐 API Integration

### Backend Configuration

The frontend is designed to work with the SoleCraft FastAPI backend. Configure the API base URL in your environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000  # Development
NEXT_PUBLIC_API_BASE_URL=https://api.solecraft.com  # Production
```

### Available API Endpoints

#### ✅ Implemented Endpoints
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `POST /auth/guest` - Guest session creation
- `GET /users/profile` - User profile data
- `PUT /users/profile` - Update user profile
- `GET /users/addresses` - User addresses
- `POST /users/addresses` - Add new address
- `GET /products` - Product listing with filters
- `GET /products/{slug}` - Product details
- `GET /health` - API health check

#### 🔄 Mock Endpoints (Ready for Backend)
- Cart management endpoints
- Order processing endpoints
- Category management
- Search and filtering
- Discount/coupon system

### Test Credentials

For development and testing:

```
Admin User:
Email: admin@solecraft.com
Password: admin123!

Product Manager:
Email: manager@solecraft.com
Password: manager123!
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#6b7280)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, various sizes
- **Body**: Regular, readable sizing

### Components
Built with shadcn/ui for consistent, accessible components:
- Buttons, Forms, Cards
- Navigation, Modals, Dropdowns
- Loading states, Error boundaries
- Mobile-responsive components

## 📱 Pages & Routes

### Public Routes
- `/` - Home page with hero and featured products
- `/products` - Product catalog with filters
- `/products/[slug]` - Individual product details
- `/categories/[slug]` - Category-filtered products
- `/cart` - Shopping cart management
- `/auth/login` - User login
- `/auth/register` - User registration

### Protected Routes (Coming Soon)
- `/account` - User dashboard
- `/account/orders` - Order history
- `/checkout` - Checkout process
- `/admin` - Admin dashboard

## 🔒 Authentication

### Features
- **Email/Password Login**: Standard authentication
- **Guest Checkout**: Shop without account creation
- **Persistent Sessions**: Automatic login state restoration
- **Secure Storage**: JWT tokens in localStorage
- **Route Protection**: Automatic redirects for protected routes

### Implementation
```typescript
// Using the auth store
const { user, isAuthenticated, login, logout } = useAuth()

// Login example
await login({ email: 'user@example.com', password: 'password' })
```

## 🛒 Shopping Cart

### Features
- **Persistent Cart**: Survives browser refresh
- **Real-time Updates**: Immediate quantity changes
- **Guest Support**: Cart works without authentication
- **Customization Support**: Ready for product customizations

### Implementation
```typescript
// Using the cart store
const { items, addItem, removeItem, getTotal } = useCartStore()

// Add item example
addItem(product, variant, quantity, customizations)
```

## 🔧 State Management

### Zustand Stores

#### Authentication Store (`authStore.ts`)
- User profile data
- Authentication status
- Login/logout functionality
- Error handling

#### Cart Store (`cartStore.ts`)
- Cart items management
- Quantity updates
- Total calculations
- Persistence

## 🎯 Development Roadmap

### Phase 1: Core Features ✅
- [x] Project setup and structure
- [x] Authentication system
- [x] Product listing and details
- [x] Shopping cart functionality
- [x] Basic UI components

### Phase 2: Enhanced Features 🔄
- [ ] Product customization interface
- [ ] Checkout flow implementation
- [ ] User dashboard and profile
- [ ] Order management
- [ ] Address management

### Phase 3: Advanced Features 📋
- [ ] Admin dashboard
- [ ] Advanced search and filters
- [ ] Wishlist functionality
- [ ] Reviews and ratings
- [ ] Real-time notifications

### Phase 4: Optimization 🚀
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Analytics integration
- [ ] Progressive Web App features

## 🐛 Known Issues & Limitations

1. **Mock Data**: Some features use mock data until backend endpoints are available
2. **Image Placeholders**: Product images use placeholder backgrounds
3. **Payment Integration**: Ready for implementation but not yet connected
4. **Real-time Features**: WebSocket integration pending

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the API documentation in `API_ENDPOINTS.md`

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**SoleCraft Frontend** - Crafting the perfect shoe shopping experience, one step at a time. 👟✨ 