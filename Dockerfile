# Dockerfile for Next.js with build-time env vars
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Accept build arguments from Render
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_VISION_MARINE_API_KEY
ARG OPENAI_API_KEY

# Set as environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_VISION_MARINE_API_KEY=$NEXT_PUBLIC_VISION_MARINE_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY

# Build the application with actual env vars
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
