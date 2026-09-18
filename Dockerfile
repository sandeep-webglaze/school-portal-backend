# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.20.0

################################################################################
# Base
################################################################################
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

# Enable Corepack
RUN corepack enable


################################################################################
# Install dependencies
################################################################################
FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --immutable


################################################################################
# Build application
################################################################################
FROM deps AS build

COPY . .

RUN yarn build


################################################################################
# Production image
################################################################################
FROM base AS final

ENV NODE_ENV=production

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist

COPY package.json .

USER node

EXPOSE 8080

CMD ["node", "dist/main.js"]