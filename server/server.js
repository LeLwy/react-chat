// Importation des modules nécessaires
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Création de l'application Express
const app = express();

// Création du serveur HTTP en utilisant l'application Express
const server = http.createServer(app);

// Initialisation de Socket.IO avec le serveur HTTP
const io = socketIo(server);

// Écoute les connexions des clients
io.on('connection', (socket) => {
    console.log('Nouveau client connecté'); // Affiche un message lorsque un nouveau client se connecte

    // Écoute la déconnexion des clients
    socket.on('disconnect', () => {
        console.log('Client déconnecté'); // Affiche un message lorsque un client se déconnecte
    });

    // Écoute les messages de chat et les diffuse à tous les clients
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Réémet le message de chat à tous les clients connectés
    });
});

// Définition du port d'écoute du serveur
const PORT = process.env.PORT || 5000;

// Démarrage du serveur sur le port défini
server.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));