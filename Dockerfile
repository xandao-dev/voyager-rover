# https://snyk.io/wp-content/uploads/10-best-practices-to-containerize-Node.js-web-applications-with-Docker.pdf

FROM node:18.11
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN chown -R node /usr/src/app
USER node

VOLUME [ "/usr/src/app" ]
EXPOSE 9229
CMD ["npm", "start"]
