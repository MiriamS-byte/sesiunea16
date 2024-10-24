const BASE_URL = 'https://fakestoreapi.com';

document.addEventListener('DOMContentLoaded', async () => {
    let productId = localStorage.getItem('activeId');
    if (!productId) {
        productId = 1;
    }
    const productResult = await fetchAPI(`products/${productId}`);
    if (productResult.succes) {
        const product = productResult.data;
        const img = document.createElement('img');
        img.className = 'img-fluid';
        img.src = product.image;
        document.getElementById('img-container').appendChild(img);
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('review-count').textContent = `${product.rating.count} reviews`;
        document.getElementById('product-categ').textContent = `${product.category}`;
        document.getElementById('product-price').textContent = `$${product.price}`;
        document.getElementById('product-description').textContent = product.description;
    }
});

async function fetchAPI(endpoint) {
    const url = new URL(endpoint, BASE_URL);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error on fetch: ${response.status}!`);
        }
        const data = await response.json();
        return {
            succes: true,
            data: data
        };
    } catch (error) {
        return { 
            success: false, 
            error: error 
        };
    }
}