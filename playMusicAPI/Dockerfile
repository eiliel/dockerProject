# Utilise une image Node.js comme base
FROM node:18

# Définie le répertoire de travail
WORKDIR /app

# Copie le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le contenu du répertoire actuel dans le répertoire de travail
COPY . .

# Commande pour lancer l'API
CMD ["node", "server.js"]
