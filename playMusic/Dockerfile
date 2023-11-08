# Utilisez une image Node.js comme base
FROM node:16

# Définissez le répertoire de travail
WORKDIR /app

# Copiez le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tout le contenu du répertoire actuel dans le répertoire de travail
COPY . .

# Exposez le port sur lequel fonctionne l'application Vite
EXPOSE 8080

# Commande pour lancer l'application
CMD ["npm", "run", "dev"]
