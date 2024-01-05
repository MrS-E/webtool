FROM node:18 as BASE
WORKDIR /app
COPY . .
RUN npm install
CMD ["npx","vite"]
EXPOSE 5173