FROM node:18 as BASE
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
CMD ["npx","nest", "start"]
EXPOSE 3000