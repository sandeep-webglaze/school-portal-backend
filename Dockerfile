# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.20.0

################################################################################
# Base
################################################################################
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

# Enable Corepack so packageManager from package.json controls Yarn version
RUN corepack enable


################################################################################
# Production dependencies
################################################################################
FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production --immutable


################################################################################
# Build
################################################################################
FROM deps AS build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --immutable

COPY . .

RUN yarn run build


################################################################################
# Production image
################################################################################
FROM base AS final

ENV NODE_ENV=production

USER root

RUN chown -R node:node .

USER node

COPY package.json .

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main.js"]