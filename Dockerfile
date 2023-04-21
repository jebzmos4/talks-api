FROM node:16-slim as build

ARG COMMIT_SHA=<not-specified>

WORKDIR /build-dir

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

RUN echo "talks-api: $COMMIT_SHA" >> ./commit.sha

########################################################################################################################

FROM node:16-slim

LABEL maintainer="undefined" \
      name="talks-api" \
      description="talks api service"

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV SERVICE_PREFIX=/
ENV PORT=3000
ENV MONGODB_URL='mongodb://localhost/neotarra'

WORKDIR /home/node/app

COPY --from=build /build-dir ./

RUN ls /home/node/app/dist
RUN ls /home/node/app

USER node

CMD ["npm", "run", "start:prod"]
