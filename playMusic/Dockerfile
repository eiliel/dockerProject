# Utilise une image Node.js comme base
FROM node:16

# Définie le répertoire de travail
WORKDIR /app

# Copie le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

RUN npm install -g vite

# Installe les dépendances
RUN npm install

RUN chown -R node /app/node_modules

# Copie tout le contenu du répertoire actuel dans le répertoire de travail
COPY . .

# Expose le port sur lequel fonctionne l'application Vite
EXPOSE 8080

# Commande pour lancer l'application
CMD ["npm", "run", "dev"]
