const items = [
    { name: "CCTV", price: 20000, quantity: 3 },
    { name: "Official Trouser", price: 1500,  quantity: 5 },
    { name: "Sub-woofer system", price: 8999,  quantity: 2 },
    { name: "Mountain bike", price: 29000,  quantity: 4 }
];

function updateAvailableItems() {
    items.forEach(item => {
        const availableElement = document.querySelector(`.buyButton[data-name="${item.name}"]`).previousElementSibling;
        if (item.quantity > 0) {
            availableElement.textContent = `Available: ${item.quantity}`;
        } else {
            availableElement.textContent = 'Sold out';
        }
    });
}

function buyItem(itemName) {
    const item = items.find(i => i.name === itemName);
    if (item && item.quantity > 0) {
        item.quantity--;
        updateAvailableItems();
        alert(`${item.name} bought!`);
        if (item.quantity === 0) {
            alert(`${item.name} is now sold out!`);
        }
    }
}

// Initial display of available items
window.onload = () => {
    updateAvailableItems();
};

// Add event listeners to buy buttons
document.querySelectorAll('.buyButton').forEach(button => {
    const itemName = button.parentElement.querySelector('h4').textContent;
    button.setAttribute('data-name', itemName);
    button.setAttribute('onclick', `buyItem('${itemName}')`);
});
