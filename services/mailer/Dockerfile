FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Ensure the shell script has execute permissions
RUN chmod +x ./docker-entrypoint.sh

# Use the shell script as the entrypoint
CMD ["npm", "start"]