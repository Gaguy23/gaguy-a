const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = new sqlite3.Database('./database.sqlite');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

// Créer la table des messages si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL
)`);

// Récupérer tous les messages
app.get('/messages', (req, res) => {
    db.all('SELECT * FROM messages', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Ajouter un message
app.post('/messages', (req, res) => {
    const { content } = req.body;
    db.run('INSERT INTO messages (content) VALUES (?)', [content], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, content });
    });
});

// Supprimer un message
app.delete('/messages/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM messages WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Message supprimé' });
    });
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
