import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Initialisation de la connexion Socket.io
const socket = io();

const Chat = () => {
    // Déclaration de l'état pour stocker les messages et l'entrée utilisateur
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Utilisation de useEffect pour écouter les messages de chat
    useEffect(() => {
        // Écoute de l'événement 'chat message' pour recevoir les messages
        socket.on('chat message', (msg) => {
            // Mise à jour de l'état des messages avec le nouveau message reçu
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Nettoyage de l'écouteur d'événements lors du démontage du composant
        return () => {
            socket.off('chat message');
        };
    }, []);

    // Fonction pour envoyer un message
    const sendMessage = (e) => {
        e.preventDefault();
        // Émission de l'événement 'chat message' avec le message de l'utilisateur
        socket.emit('chat message', input);
        // Réinitialisation de l'entrée utilisateur
        setInput('');
    };

    return (
        <div>
            <ul>
                {/* Affichage de la liste des messages */}
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
                {/* Champ de saisie pour le message de l'utilisateur */}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {/* Bouton pour envoyer le message */}
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default Chat;