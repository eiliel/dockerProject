# Utilise une image Node.js comme base
FROM node:16

# Définie le répertoire de travail
WORKDIR /app

# Copie le package.json et le package-lock.json dans le répertoire de travail
COPY . .

RUN npm install -g vite

# Installe les dépendances
RUN npm install

# Expose le port sur lequel fonctionne l'application Vite
EXPOSE 8080

# Commande pour lancer l'application
CMD ["npm", "run", "dev"]
