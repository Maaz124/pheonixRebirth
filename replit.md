# Phoenix Method™ Trauma Recovery Platform

## Overview

The Phoenix Method™ is a comprehensive trauma-informed coaching platform designed for emotionally exhausted women rising from trauma, anxiety, or narcissistic abuse. The platform provides a structured 7-phase recovery program with interactive exercises, assessments, journaling, resource management, and a complete commercial marketing funnel with subscription monetization.

## Recent Changes (July 29, 2025)
- **Complete Marketing Funnel & SEO System**: Implemented comprehensive lead generation and conversion system with professional landing pages, lead magnets, email sequences, and blog content
- **Professional Landing Page**: High-converting homepage with problem/solution framework, social proof, testimonials, and lead capture forms
- **Interactive Lead Magnet**: Phoenix Assessment tool with personalized results and automated email sequence integration
- **SEO-Optimized Blog**: Content marketing system with trauma recovery articles, category filtering, and newsletter signup
- **Email Marketing Infrastructure**: Complete sequences for lead nurturing, onboarding, and conversion with personalized content
- **Lead Capture & Management**: Database system for tracking leads, sources, and email campaign engagement
- **Commercial Subscription System**: Stripe-integrated pricing with 3 tiers (Free, $29/month, $79/month) and secure payment processing
- **Professional Branding**: Phoenix-themed design system with warm color palette and consistent visual identity throughout all touchpoints

## Previous Changes - Phase 5 (July 16, 2025)
- **Phase 5 "Nurture Your Nervous System" Complete**: Created 8 comprehensive exercises with 5 interactive practice components covering nervous system awareness, breathwork, somatic practices, vagus nerve activation, and safety anchors
- **Nervous System Interactive Tools**: Built specialized components for nervous system state tracking, breathwork practice studio, body awareness explorer, vagus nerve activation lab, and safety anchor builder
- **Regulation-Focused Assessments**: Created 3 detailed assessments covering nervous system awareness, regulation techniques, and stress response patterns

## Previous Changes (July 13, 2025)
- **Phase 4 "Establish Boundaries" Complete**: Created 8 comprehensive exercises with 5 interactive practice components covering boundary types, guilt-free no practice, communication scripts, workplace scenarios, and relationship dynamics
- **Advanced Interactive Components**: Added sophisticated form elements including Select dropdowns, multi-step scenarios, and structured script practice frameworks
- **Boundary-Specific Assessments**: Created 3 detailed assessments covering boundary health, violation recognition, and communication effectiveness

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

This is a full-stack web application built with a modern TypeScript stack, featuring a React frontend and Express.js backend with PostgreSQL database integration.

### Architecture Pattern
- **Monorepo Structure**: Single repository containing client, server, and shared code
- **Shared Schema**: Common TypeScript definitions and database schemas shared between frontend and backend
- **API-First Design**: RESTful API with clear separation between client and server
- **Component-Based UI**: React components with shadcn/ui design system

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM (Migrated from in-memory storage on 2025-07-09)
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints with JSON responses
- **Middleware**: Express middleware for logging, error handling, and request parsing
- **Storage**: DatabaseStorage implementation replacing MemStorage for persistent data

### Database Schema
The application uses a comprehensive schema designed around the 7-phase recovery program and commercial operations:

- **Users**: Authentication, profile management, and subscription data (Stripe integration)
- **Phases**: The 7 phases of the Phoenix Method (P.H.O.E.N.I.X)
- **Exercises**: Interactive content for each phase (assessments, readings, practices)
- **User Progress**: Tracking completion status across phases and exercises
- **Journal Entries**: Personal reflection and mood tracking
- **Resources**: Categorized therapeutic tools and materials
- **Assessments**: Structured questionnaires with user responses
- **Leads**: Marketing funnel lead capture and tracking
- **Email Campaigns**: Automated email sequence management for marketing and onboarding

## Data Flow

### User Journey Flow
1. User accesses the platform and views their current phase
2. Progress tracking shows completed vs. total exercises across all phases
3. Users can access phase-specific exercises and assessments
4. Journal entries capture mood, energy levels, and reflections
5. Resources provide additional support materials organized by category

### API Request Flow
1. Frontend makes API requests using TanStack Query
2. Express middleware handles logging and error processing
3. Routes delegate to storage layer for database operations
4. Drizzle ORM handles SQL query generation and execution
5. Responses include proper error handling and JSON formatting

### State Management
- **Server State**: Managed by TanStack Query with automatic caching and refetching
- **Local State**: React hooks for component-level state
- **Form State**: React Hook Form for complex form handling
- **UI State**: Local component state for modal, drawer, and interaction states

## External Dependencies

### Core Technologies
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle Kit**: Database migrations and schema management
- **Radix UI**: Accessible component primitives
- **TanStack Query**: Server state management
- **React Hook Form**: Form validation and handling

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **Vite**: Fast development server and build tool
- **ESBuild**: Fast JavaScript bundling for production
- **Tailwind CSS**: Utility-first CSS framework

### Therapeutic Framework Integration
The application implements therapeutic modalities including:
- Cognitive Behavioral Therapy (CBT) tools
- Mindfulness and meditation practices
- Neuro-Linguistic Programming (NLP) techniques
- Trauma-informed approaches
- Progressive disclosure of content based on user readiness

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Local connection to Neon Database via environment variables
- **Build Process**: Separate client and server builds with shared type definitions

### Production Deployment
- **Frontend**: Static assets served by Express in production
- **Backend**: Node.js server with Express handling both API and static file serving
- **Database**: Production PostgreSQL database via Neon
- **Environment Configuration**: Environment variables for database URLs and configuration

### Build Process
1. **Client Build**: Vite compiles React app to static assets in `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Shared Types**: TypeScript ensures type safety across client/server boundary
4. **Database Migrations**: Drizzle Kit handles schema changes and migrations

The architecture prioritizes user safety and gradual progression through trauma recovery, with careful attention to not overwhelming users while providing comprehensive support tools and tracking capabilities.