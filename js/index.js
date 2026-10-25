const productGrid = document.getElementById('productGrid');
const statusContainer = document.getElementById('status-container');
const searchInput = document.getElementById('searchInput');

let allProducts = [];

function renderProducts(products) {
    productGrid.innerHTML = ''; 

    if (products.length === 0) {
        productGrid.innerHTML = '<div class="empty-message">Produk yang kamu cari tidak ditemukan.</div>';
        return;
    }

    products.forEach(produk => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = produk.thumbnail;
        img.alt = produk.title;
        img.loading = 'lazy';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h3');
        title.textContent = produk.title;

        const price = document.createElement('div');
        price.className = 'card-price';
        price.textContent = `$${produk.price.toFixed(2)}`;

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        card.appendChild(img);
        card.appendChild(cardBody);

        productGrid.appendChild(card);
    });
}

async function fetchProdukData() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        allProducts = data.products;
        
        statusContainer.style.display = 'none';
        renderProducts(allProducts); 

    } catch (error) {
        statusContainer.textContent = `Gagal memuat katalog produk: ${error.message}`;
        statusContainer.classList.add('status-error');
    }
}

searchInput.addEventListener('input', function(e) {
    const kataKunci = e.target.value.toLowerCase().trim();
    
    const produkTersaring = allProducts.filter(produk => {
        return produk.title.toLowerCase().includes(kataKunci);
    });

    renderProducts(produkTersaring);
});

document.addEventListener("DOMContentLoaded", fetchProdukData);