# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` (includes TypeScript compilation and Vite build)
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Project Architecture

This is a React crossword puzzle application built with:

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with Hot Module Replacement
- **Styling**: Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin)
- **Linting**: ESLint with TypeScript, React hooks, and React refresh rules

### Key Structure

- `src/App.tsx`: Main application component containing crossword puzzle UI with row/column input controls
- `src/main.tsx`: Application entry point with React StrictMode
- `src/App.css` & `src/index.css`: Styling files
- `vite.config.ts`: Vite configuration with React and Tailwind CSS plugins

### TypeScript Configuration

The project uses multiple TypeScript config files:
- `tsconfig.json`: Base configuration
- `tsconfig.app.json`: Application-specific settings
- `tsconfig.node.json`: Node.js environment settings for build tools

### Current Features

The application currently includes:
- Input fields for specifying crossword grid dimensions (rows/columns)
- Korean language interface
- Basic form validation for numeric inputs
- Tailwind CSS styling with utility classes

### Development Notes

- Uses Vite's Fast Refresh for hot reloading during development
- ESLint is configured with recommended rules for TypeScript and React
- Tailwind CSS v4 is integrated via Vite plugin (not traditional PostCSS setup)