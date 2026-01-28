# متجر صدام (Saddam Store)

## Overview

متجر صدام is a unified gaming hub website. It provides five core sections: Products (digital store), Bio (link-in-bio page), Game Topup (currency top-up ordering), Bot (Telegram bot integration), and SaaS Tools (marketing utilities like hashtag generators). The application follows a mobile-first, dark neon gaming aesthetic and integrates with WhatsApp for order processing.

## User Preferences

Preferred communication style: Simple, everyday language.

## Authentication

- **Provider**: Replit Auth (OpenID Connect)
- **Methods**: Google, Apple, GitHub, email/password
- **Routes**: /api/login, /api/logout, /api/auth/user
- **Profile Page**: /profile (requires authentication)
- **Session Storage**: PostgreSQL with connect-pg-simple

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom dark neon gaming theme, CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: REST endpoints defined in shared routes file
- **Development**: tsx for TypeScript execution, Vite dev server for HMR

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` defines all tables (products, bioLinks, botLogs, topupRequests, saasGenerations)
- **Migrations**: Drizzle Kit with `db:push` command

### Project Structure
```
client/          # React frontend
  src/
    components/  # Reusable UI components
    pages/       # Route pages
    hooks/       # Custom React hooks for API calls
    lib/         # Utilities and query client
server/          # Express backend
  routes.ts      # API endpoint definitions
  storage.ts     # Database operations layer
  db.ts          # Database connection
shared/          # Shared between client/server
  schema.ts      # Drizzle database schemas
  routes.ts      # API route definitions with Zod validation
```

### Key Design Patterns
- **Shared Types**: Schema and route definitions shared between frontend and backend via `@shared/*` alias
- **Storage Interface**: `IStorage` interface abstracts database operations for testability
- **Type-Safe API**: Zod schemas validate both API inputs and outputs
- **Component Library**: shadcn/ui provides consistent, accessible components

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage (if sessions are added)

### External Services
- **WhatsApp Business**: Order completion via `wa.me/message/REDKIHRAVCUEB1` deep links
- **TikTok**: Social link to `https://www.tiktok.com/@saddamhub`

### Key NPM Packages
- **drizzle-orm / drizzle-kit**: Database ORM and migrations
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animations
- **react-icons**: Social media icons (TikTok, WhatsApp, Telegram)
- **wouter**: Client-side routing
- **zod**: Runtime type validation
- **react-hook-form**: Form handling with `@hookform/resolvers`