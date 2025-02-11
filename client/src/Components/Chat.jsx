import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Initialisation de la connexion Socket.io
const socket = io();

const Chat = () => {
    // Déclaration de l'état pour stocker les messages et l'entrée utilisateur
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);

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
        socket.emit('chat message', input, (error) => {
            if (error) {
                // Gestion des erreurs lors de l'envoi du message
                setError('Erreur lors de l\'envoi du message');
            } else {
                // Réinitialisation de l'entrée utilisateur et de l'erreur
                setInput('');
                setError(null);
            }
        });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Chat en Temps Réel</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {/* Affichage de la liste des messages */}
                {messages.map((msg, index) => (
                    <li key={index} style={{ background: '#f1f1f1', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
                        {msg}
                    </li>
                ))}
            </ul>
            <form onSubmit={sendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Champ de saisie pour le message de l'utilisateur */}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    placeholder="Entrez votre message..."
                />
                {/* Bouton pour envoyer le message */}
                <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff' }}>
                    Envoyer
                </button>
            </form>
            {/* Affichage de l'erreur s'il y en a une */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Chat;