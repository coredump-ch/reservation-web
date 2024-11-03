# Build in node container
FROM node:22-alpine3.19 AS build

# Copy code
COPY . /build
WORKDIR /build

# Install dependencies
RUN npm install

# Build release bundle
RUN cp .env.example .env && npm run build

# Copy release into nginx container
FROM nginx:1.27-alpine
COPY --from=build --chown=nginx:nginx /build/dist /usr/share/nginx/html

# Add entrypoint script
COPY --chown=nginx:nginx docker_patch_bundle.sh /docker-entrypoint.d/90-patch-bundle.sh

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s \
    CMD curl -s -I --fail-with-body http://localhost:80/bundle.js
