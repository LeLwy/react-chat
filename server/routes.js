const express = require('express'); // Importation du module express pour créer des routes et des middlewares
const path = require('path'); // Importation du module path pour travailler avec les chemins de fichiers
const router = express.Router(); // Création d'un routeur express pour gérer les routes

// Middleware pour servir les fichiers statiques depuis le répertoire 'client/build'
router.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Route catch-all pour envoyer le fichier 'index.html' pour toutes les requêtes non gérées par les routes précédentes
router.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = router; // Exportation du routeur pour l'utiliser dans d'autres parties de l'application