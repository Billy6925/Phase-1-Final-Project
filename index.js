const items = [
    { name: "CCTV", price: 20000, category: "electronics", quantity: 3 },
    { name: "Official Trouser", price: 1500, category: "clothing", quantity: 5 },
    { name: "Sub-woofer system", price: 8999, category: "electronics", quantity: 2 },
    { name: "Mountain bike", price: 29000, category: "sports", quantity: 4 }
];

function updateAvailableItems() {
    items.forEach(item => {
        const availableElement = document.querySelector(`.buyButton[onclick="buyItem('${item.name}')"]`).previousElementSibling;
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
    const itemName = button.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    button.setAttribute('onclick', `buyItem('${itemName}')`);
});
