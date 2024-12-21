document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

let items = [];

async function fetchData() {
    try {
        const [itemsResponse, carouselResponse] = await Promise.all([
            fetch('http://localhost:3000/items'),
            fetch('http://localhost:3000/carousel')
        ]);

        items = await itemsResponse.json();
        const carousel = await carouselResponse.json();

        displayProducts(items);
        displayCarousel(carousel);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayProducts(items) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Clear existing products
    items.forEach(item => {
        const productHTML = generateProductHTML(item);
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
    updateAvailability(items);
}

function generateProductHTML(item) {
    return `
        <div class="product-item">
            <img src="${item.image}" alt="${item.title}" class="product-image"/>
            <h4>${item.title}</h4>
            <div class="rating">${item.rating}</div>
            <p>${item.price}</p>
            <p class="availability">Available: ${item.Available}</p>
            <div class="buyButton" onclick="buyItem('${item.title}')">Buy Now</div>
        </div>
    `;
}

function displayCarousel(images) {
    const carouselContainer = document.getElementById('carousel-container');
    carouselContainer.innerHTML = ''; // Clear existing carousel images
    images.forEach(image => {
        const imgHTML = `<img src="${image.image}" alt="carousel image"/>`;
        carouselContainer.insertAdjacentHTML('beforeend', imgHTML);
    });
}

function buyItem(itemName) {
    const item = items.find(i => i.title === itemName);
    if (item && item.Available > 0) {
        item.Available--;
        alert(`${item.title} bought!`);
        if (item.Available === 0) {
            alert(`${item.title} is now sold out!`);
        }
        updateAvailability(items);
    }
}

function updateAvailability(items) {
    items.forEach(item => {
        const productItem = document.querySelector(`.buyButton[onclick="buyItem('${item.title}')"]`);
        const availabilityElement = productItem.previousElementSibling;
        if (item.Available > 0) {
            availabilityElement.textContent = `Available: ${item.Available}`;
        } else {
            availabilityElement.textContent = 'Sold out';
            productItem.style.display = 'none';
        }
    });
}
