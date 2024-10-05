// Sélection des éléments
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

// Fonction pour ajouter un message au chat
function ajouterMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Descendre automatiquement à la fin du chat
}

// Gestion de l'envoi de message
chatForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const message = messageInput.value;
    if (message.trim() !== '') {
        ajouterMessage(message);
        messageInput.value = ''; // Efface l'input après envoi
    }
});
