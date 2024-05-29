ARG NODE_TAG="lts-slim"
ARG NGINX_TAG="stable-alpine"

FROM node:${NODE_TAG} AS dev-stage

ENV DEBIAN_FRONTEND=noninteractive

RUN set -eux \
    && apt-get update \
    && apt-get install --yes --only-upgrade openssl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

COPY package* ./

RUN npm ci

COPY ./ ./

EXPOSE 8000

CMD ["npm", "run", "dev", "--", "--host"]

FROM dev-stage AS build-stage

RUN CI=true npm run test:unit \
    && CI=true npm run test:e2e

RUN npm run build

FROM nginx:${NGINX_TAG} AS prod-stage

COPY --from=build-stage /app/dist/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/
