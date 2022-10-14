FROM node:16.13.1-alpine as deps

WORKDIR /app
COPY package.json  ./

RUN npm install

COPY . .

# RUN cd prisma && npx prisma migrate save --experimental 
# RUN cd prisma && npx prisma migrate up --experimental 
# RUN cd prisma && npx prisma generate 

EXPOSE 5502