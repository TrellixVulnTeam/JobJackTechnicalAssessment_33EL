FROM node:16 AS ui-build
WORKDIR /usr/src/app
COPY api-frontend/ ./api-frontend/
RUN cd api-frontend && npm install @angular/cli && npm install && npm run build

FROM node:16 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/api-frontend/dist ./api-frontend/dist
COPY package*.json ./
RUN npm install
COPY server.js .

EXPOSE 3080

CMD ["node", "server.js"]
