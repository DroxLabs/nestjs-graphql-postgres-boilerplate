# Step 1: Use Node.js base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your NestJS app
COPY . .

# Step 6: Build the app
RUN npm run build

# Step 7: Expose the port that your app runs on
EXPOSE 3999

# Step 8: Start the NestJS app
CMD ["npm", "run", "start:prod"]
