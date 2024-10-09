FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 5000

HEALTHCHECK CMD curl --fail http://localhost:5000 || exit 1

RUN useradd -ms /bin/bash appuser

USER appuser

CMD [ "npm", "start"]