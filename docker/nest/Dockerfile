FROM node:20-alpine

RUN apk add --no-cache libc6-compat
RUN npm install -g turbo

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json turbo.json ./
COPY yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Copier ton code
COPY apps ./apps
COPY packages ./packages

# ✅ Donner les droits à l’utilisateur node déjà présent
RUN chown -R node:node /app

# ✅ Passer à l’utilisateur node existant
USER node

# Installer les dépendances
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
    else npm install; fi

EXPOSE 9300

CMD ["npm", "run", "dev", "--workspace=nest"]
