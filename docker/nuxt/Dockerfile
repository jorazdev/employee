FROM node:20-alpine

# Installation des outils nécessaires
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration du monorepo
COPY package*.json ./
COPY turbo.json ./

# Copier yarn.lock ou package-lock.json s'ils existent
COPY yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Copier les workspaces
COPY apps ./apps
COPY packages ./packages

# Installer les dépendances avec le bon gestionnaire de packages
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
    else npm install; fi

# Exposer les ports (app + HMR)
EXPOSE 5300 24678

# Démarrer en mode développement avec hot reload
CMD ["npm", "run", "dev", "--workspace=nuxt"]