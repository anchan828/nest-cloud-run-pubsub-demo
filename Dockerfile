FROM node:alpine AS base
LABEL maintainer="anchan828 <anchan828@gmail.com>"
FROM base AS dependencies
WORKDIR /workspace
COPY package*.json ./

RUN set -x \
    && npm ci

COPY nest-cli.json tsconfig.json ./