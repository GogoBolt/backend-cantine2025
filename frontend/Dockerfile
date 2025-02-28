# frontend\Dockerfile

# Étape 1 : Utiliser une image de base Node.js 20
FROM node:20 AS builder

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm ci

# Étape 5 : Copier le reste des fichiers de l'application
COPY . .

# Étape 6 : Build de l'application Nuxt 3
RUN npm run build

# Étape 7 : Utiliser une image légère pour l'exécution
FROM node:20-alpine

# Étape 8 : Définir le répertoire de travail
WORKDIR /app

# Étape 9 : Copier les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/.output ./.output

# Étape 10 : Exposer le port 3000
EXPOSE 3000

# Étape 11 : Définir la commande par défaut pour démarrer l'application
CMD ["node", ".output/server/index.mjs"]
