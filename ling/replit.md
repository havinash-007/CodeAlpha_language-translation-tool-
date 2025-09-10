# Universal Translator

## Overview

Universal Translator is a full-stack web application that provides instant language translation capabilities. Built with React (frontend) and Express.js (backend), the application integrates with Google Translate API to offer real-time text translation between multiple languages. The system features a modern, responsive UI with support for auto-language detection, translation history, quick phrases, and various user interaction features like copy, download, and share functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Component Structure**: Modular component architecture with reusable UI components

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Server**: Custom Vite integration for hot reloading in development
- **API Design**: RESTful API endpoints with structured error handling
- **Request Validation**: Zod schemas for runtime type validation
- **Storage Pattern**: Interface-based storage with in-memory implementation (extensible to database)

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Management**: Shared schema definitions between frontend and backend
- **Migration System**: Drizzle Kit for database migrations
- **Current Implementation**: In-memory storage with interface for easy database integration
- **Database Provider**: Neon Database (serverless PostgreSQL)

### API Structure
- **Translation Endpoint**: `/api/translate` - Processes translation requests
- **History Endpoint**: `/api/translations/recent` - Retrieves recent translations
- **Language Detection**: `/api/detect-language` - Auto-detects source language
- **Error Handling**: Centralized error handling with structured responses
- **Request/Response Types**: Shared TypeScript types for type safety

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Prepared with connect-pg-simple for PostgreSQL session storage
- **User Schema**: Database schema includes user table for future authentication

## External Dependencies

### Third-Party Services
- **LibreTranslate API**: Primary translation service integration (OpenL Translate)
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit Platform**: Development and deployment environment

### Key Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/**: Headless UI component primitives
- **wouter**: Lightweight routing
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette functionality
- **date-fns**: Date formatting and manipulation

### Key Backend Libraries
- **drizzle-orm**: Type-safe database ORM
- **drizzle-zod**: Schema validation integration
- **express**: Web framework
- **tsx**: TypeScript execution for development

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type system
- **ESBuild**: Production bundling
- **Tailwind CSS**: Utility-first styling
- **PostCSS**: CSS processing