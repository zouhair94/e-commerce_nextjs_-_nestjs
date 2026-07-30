# 🛒 Full-Stack E-Commerce Monorepo (Next.js + NestJS)

An enterprise-grade, full-stack e-commerce platform built within a modern monorepo architecture. Designed for high performance, modularity, and seamless developer experience, this project combines a fast, SEO-optimized **Next.js** storefront with a resilient, scalable **NestJS** backend REST API.

---

## 🌟 Key Highlights & Engineering Architectural Focus

- **Unified Monorepo Architecture**: Shared TypeScript types, configurations, and utilities across frontend and backend services to ensure end-to-end type safety and zero code duplication.
- **Production-Ready Core**: Implements full authentication workflows, secure payment processing, shopping cart management, inventory tracking, and role-based access control (RBAC).
- **Modern Tech Stack**: Combines server-side rendering (SSR) and client hydration in Next.js with the structured, modular design of NestJS dependency injection and Prisma ORM.

---

## 🛠️ Tech Stack & System Architecture

### **Frontend (Client & Admin)**
- **Framework**: Next.js (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI / Radix UI
- **State Management & Data Fetching**: React Query / Zustand / Context API
- **Form Validation**: React Hook Form + Zod / Yup

### **Backend (API Service)**
- **Framework**: NestJS (Node.js)
- **Database & ORM**: PostgreSQL / MySQL with Prisma ORM
- **Authentication & Security**: JWT (JSON Web Tokens), Passport.js, Bcrypt hashing, RBAC (Admin vs Customer roles)
- **Validation & Serialization**: `class-validator`, `class-transformer`

### **Monorepo & Tooling**
- **Monorepo Manager**: Turborepo / npm workspaces
- **Shared Packages**: Shared DTOs/Interfaces, ESLint rules, and TypeScript configurations
- **Deployment & DevOps**: Docker, GitHub Actions, Vercel (Frontend), Render (Backend)

---

## ✨ Core Features

### 🛍️ **E-Commerce Client Storefront**
- **Dynamic Product Catalog**: Filtering by category, price, search indexing, and pagination.
- **Product Details**: Variant handling (sizes, colors), dynamic stock checking, and rich image galleries.
- **Interactive Cart & Checkout**: Persistent cart state, promo code validation, and checkout flows.
- **User Dashboard**: Order history, delivery status tracking, and account management.
- **Payment Integration**: Stripe / PayPal sandbox implementation for secure online payments.

### 🛡️ **Backend API Core**
- **Authentication Module**: Secure register, login, refresh token rotation, and password reset flows.
- **Product & Category Management**: CRUD endpoints with strict validation and image upload capabilities.
- **Order Processing Engine**: Transactional order placement with dynamic inventory adjustment.
- **Admin Management & RBAC**: Restricted endpoints for site administrators to manage stock, review sales analytics, and manage users.

---

## 📂 Monorepo Project Structure

```text
.
├── apps/
│   ├── web/               # Next.js Frontend Application (Storefront)
│   └── api/               # NestJS Backend API Service
│
├── packages/
│   ├── types/             # Shared TypeScript Interfaces & DTO definitions
│   ├── config/            # Shared ESLint, Prettier, and Tailwind configurations
│   └── ui/                # Shared React UI components (design system)
│
├── package.json           # Root workspace configuration
└── turbo.json             # Build pipeline and caching orchestration
```

# 🚀 Getting Started
Prerequisites
```text Node.js: >= 18.x

pnpm: >= 8.x

PostgreSQL Database running locally or via Docker
```
## Local Setup Instructions
Clone the repository:

```bash
git clone [https://github.com/zouhair94/e-commerce_nextjs_-_nestjs.git](https://github.com/zouhair94/e-commerce_nextjs_-_nestjs.git)
cd e-commerce_nextjs_-_nestjs ```
Install dependencies:

```bash
pnpm install ```
Configure Environment Variables:
Create .env files in apps/backend and apps/frontend following the provided .env.example templates.

Available Workspace Scripts:
Run scripts using pnpm from the root workspace:

Start all services in parallel:

```bash
pnpm dev```
Start Frontend only (@app/frontend):

```bash
pnpm dev:frontend ```
Start Backend only (@app/backend):

```bash
pnpm dev:backend ```
Build all applications:

```bash
pnpm build ```
Lint codebase:

```bash
pnpm lint
```
