FROM node:18-alpine
#RUN addgroup app && adduser -S -G app app app
#RUN mkdir app && chown app:app /app
#USER app 
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
RUN apk add --no-cache bash
COPY . .


CMD ["npm","run","start"]