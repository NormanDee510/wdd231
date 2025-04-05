// Function to generate the card content
function generateCards(items) {
    const cardGrid = document.querySelector('.card-grid');

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <figure>
                <img src="images/${item.image}" alt="${item.name}">
            </figure>
            <h2>${item.name}</h2>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        cardGrid.appendChild(card);
    });
}

// Function to handle the visitor's last visit
function displayVisitorMessage() {
    const visitorMessage = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    
    if (!lastVisit) {
        localStorage.setItem('lastVisit', currentTime);
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentTime - lastVisit) / (1000 * 60 * 60 * 24));
        localStorage.setItem('lastVisit', currentTime);

        if (daysSinceLastVisit < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitorMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
        }
    }
}

// Fetch the items from the JSON file
fetch('data/items.json')
    .then(response => response.json())
    .then(data => {
        generateCards(data.items);
    })
    .catch(error => console.log(error));

// Display the visitor message
displayVisitorMessage();
