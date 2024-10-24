/**
 * API Documentation: https://fakestoreapi.com/docs
 * baseUrl: https://fakestoreapi.com
 * endpoints: 
 *  /products
 *  /products/{id}
 *  /products/categories
 *  /products/category/{category}
 */

const BASE_URL = 'https://fakestoreapi.com';

const categoryCssClasses = {
    "electronics": "text-bg-info",
    "jewelery": "text-bg-warning",
    "men's clothing": "text-bg-primary",
    "women's clothing": "text-bg-danger"
}

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

document.addEventListener('DOMContentLoaded', async () => {
    const result = await fetchAPI('products');
    if (result.succes) {
        displayProducts(result.data);
    } else {
        // todo
    }

});

function displayProducts(productsList) {
    const container = document.getElementById('products-container');
    
    for (const product of productsList) {
        const card = document.createElement('article');
        card.className = 'col-2-md m-2 card cursor-pointer';
        const cardContent = `<img src="${product.image}" alt="Product Image">
        <div class="card-content">
            <div class="title">${product.title}</div>
            <div class="price">$${product.price}</div>
            <span class="badge rounded-pill ${categoryCssClasses[product.category]}">${product.category}</span>
            <div class="description">${product.description}</div>
        </div>`;
        card.innerHTML = cardContent;
        container.appendChild(card);

        card.addEventListener('click', () => {
            localStorage.setItem('activeId', product.id);
            window.location.href = './product_page.html';
        });
    }
}