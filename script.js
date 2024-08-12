// Add Card Functionality
document.querySelectorAll('.add-card button').forEach(btn => {
    btn.addEventListener('click', function () {
        const inputField = this.previousElementSibling;
        const cardTitle = inputField.value.trim();
        if (cardTitle) {
            const list = this.parentElement.parentElement;
            const addCardSection = this.parentElement;

            // Create a unique ID for each card
            const cardId = 'card-' + Date.now();

            const newCard = document.createElement('div');
            newCard.className = 'card';
            newCard.id = cardId; // Assign unique ID
            newCard.draggable = true;
            newCard.ondragstart = drag;
            newCard.innerHTML = `<span>${cardTitle}</span>
                <div class="card-buttons">
                    <button class="edit">✏️</button>
                    <button class="delete">🗑️</button>
                </div>`;

            // Insert the new card after existing cards but before the 'add-card' section
            list.insertBefore(newCard, addCardSection);
            inputField.value = '';
        }
    });
});

// Edit and Delete functionality
document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit')) {
        const card = e.target.closest('.card');
        const cardText = card.querySelector('span').textContent;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = cardText;
        inputField.className = 'edit-input';
        inputField.addEventListener('blur', function () {
            const newText = inputField.value.trim();
            if (newText) {
                card.querySelector('span').textContent = newText;
            }
            card.replaceChild(card.querySelector('span'), inputField);
            card.classList.remove('editing');
        });
        inputField.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                inputField.blur();
            }
        });
        card.classList.add('editing');
        card.replaceChild(inputField, card.querySelector('span'));
        inputField.focus();
    } else if (e.target.classList.contains('delete')) {
        const card = e.target.closest('.card');
        card.remove();
    } else if (e.target.classList.contains('delete-all')) {
        const list = e.target.closest('.list');
        list.querySelectorAll('.card').forEach(card => card.remove());
    }
});

// Drag and Drop functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); // Set the card ID
    ev.dataTransfer.setData("sourceId", ev.target.closest('.list').id); // Source list ID
}

function drop(ev) {
    ev.preventDefault();
    const cardId = ev.dataTransfer.getData("text");
    const sourceId = ev.dataTransfer.getData("sourceId");

    const targetList = ev.target.closest('.list');
    const targetId = targetList.id;

    if (sourceId !== targetId) {
        const card = document.getElementById(cardId);
        if (card) {
            targetList.querySelector('.add-card').before(card);
        }
    }
}