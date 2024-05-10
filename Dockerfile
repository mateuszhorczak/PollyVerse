
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm i pinia -f

COPY src/ ./src/
COPY *.ts ./
COPY tsconfig.json ./tsconfig.json

RUN npm run build
# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["node", ".output/server/index.mjs"]
