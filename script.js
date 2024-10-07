const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

// Charger les messages au chargement de la page
window.onload = async () => {
    const response = await fetch('/messages');
    const messages = await response.json();
    chatBox.innerHTML = '';
    messages.forEach(msg => ajouterMessage(msg));
};

// Fonction pour ajouter un message
function ajouterMessage({ id, content }) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const p = document.createElement('p');
    p.textContent = content;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => supprimerMessage(id, messageElement));

    messageElement.appendChild(p);
    messageElement.appendChild(deleteBtn);
    chatBox.appendChild(messageElement);
}

// Gestion de l'envoi de message
chatForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const message = messageInput.value;
    if (message.trim() !== '') {
        const response = await fetch('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message })
        });
        const newMessage = await response.json();
        ajouterMessage(newMessage);
        messageInput.value = ''; // Efface l'input après envoi
    }
});

// Supprimer un message
async function supprimerMessage(id, element) {
    await fetch(`/messages/${id}`, { method: 'DELETE' });
    element.remove(); // Retire l'élément du DOM
}
