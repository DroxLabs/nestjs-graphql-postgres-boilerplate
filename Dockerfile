# Step 1: Use Node.js base image
FROM node:18-alpine AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies (only production dependencies)
RUN npm install --only=production

# Step 5: Copy the rest of the NestJS application
COPY . .

# Step 6: Build the NestJS app
RUN npm run build

# Step 7: Use a lightweight, secure base image for production
FROM node:18-alpine

# Step 8: Set working directory
WORKDIR /app

# Step 9: Copy production dependencies and the build output from the previous stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Step 10: Expose the port that the app runs on
EXPOSE 3999

# Step 11: Define the command to run the application
CMD ["node", "dist/main"]

