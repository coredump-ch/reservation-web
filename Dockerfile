# Build in node container
FROM node:16-alpine3.14 as build

# Copy code
COPY . /build
WORKDIR /build

# Install dependencies
RUN npm install

# Build release bundle
RUN cp .env.example .env && npm run build

# Copy release into nginx container
FROM nginx:1.20-alpine
COPY --from=build --chown=nginx:nginx /build/public /usr/share/nginx/html

# Add entrypoint script
COPY --chown=nginx:nginx docker_patch_bundle.sh /docker-entrypoint.d/90-patch-bundle.sh
