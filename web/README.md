# Centsibility Web Application

React-based web application for the Centsibility financial management platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create an `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

3. Update environment variables in `.env.local`

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## Technology Stack

- React 18+
- Vite
- Redux Toolkit
- React Router v6
- Material-UI (MUI)
- Axios
- Formik & Yup

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── pages/           # Page components
├── services/        # API services
├── store/           # Redux store
├── hooks/           # Custom hooks
├── utils/           # Utility functions
└── routes/          # Route configuration
```

## Features

- User Authentication
- Transaction Management
- Budget Goals
- Financial Dashboard
- Admin Panel
- File Uploads
