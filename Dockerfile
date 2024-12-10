FROM node:22.12.0-slim@sha256:a4b757cd491c7f0b57f57951f35f4e85b7e1ad54dbffca4cf9af0725e1650cd8 AS builder
ENV NODE_ENV=development
WORKDIR /app
RUN apt-get update && apt-get upgrade -y
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
COPY *.json .
COPY src ./src
COPY assets ./assets
RUN npm install
RUN npm run buildncc

FROM node:22.12.0-slim@sha256:a4b757cd491c7f0b57f57951f35f4e85b7e1ad54dbffca4cf9af0725e1650cd8 AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --chown=node:node --from=builder /app/dist* .
RUN apt-get update && apt-get upgrade -y
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
USER node
CMD ["dumb-init", "node", "index.js"]