# Simple Dockerfile for Next.js - Single stage
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Build with placeholders (will be replaced at runtime)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder
ENV NEXT_PUBLIC_API_URL=http://localhost:3001

RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
