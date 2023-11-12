FROM mysql:latest

# Définie les variables d'environnement pour la configuration de la base de données
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=music_library

# Copie le fichier SQL d'initialisation dans le conteneur
COPY init.sql /docker-entrypoint-initdb.d/init.sql
