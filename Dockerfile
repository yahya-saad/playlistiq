# Stage 1: Build CSS
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install all dependencies including devDependencies (for tailwindcss CLI)
RUN npm install
COPY . .
# Generate the production CSS
RUN npm run build:css

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
# Only copy production files
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
# Explicitly overwrite src/public/output.css with the one built in the builder stage
COPY --from=builder /app/src/public/output.css ./src/public/output.css

EXPOSE 3000
CMD ["npm", "start"]
