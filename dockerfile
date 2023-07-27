# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Install Yarn
# RUN npm install -g yarn

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
# This is done separately from copying the entire app directory to leverage Docker cache
COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn install --frozen-lockfile \
    && yarn cache clean

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]