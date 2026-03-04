# Web Frontend Setup Guide

## Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend-setup.md)

## Installation Steps

### 1. Navigate to Web Directory

```bash
cd Centsibility/web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Centsibility
VITE_MAX_FILE_SIZE=10485760
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Lint code with ESLint

## Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## Deployment

### Deploy to Netlify/Vercel

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Deploy with Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## Troubleshooting

### Dependencies installation fails

Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### API connection issues

1. Verify backend is running on port 8080
2. Check CORS configuration in backend
3. Verify `VITE_API_BASE_URL` in `.env.local`

### Build fails

1. Check Node.js version (must be 18+)
2. Clear cache: `npm cache clean --force`
3. Re-install dependencies
