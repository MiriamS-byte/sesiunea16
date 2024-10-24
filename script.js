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
const productsEndpoint = `/products`;

const categoryCssClasses = {
    "electronics": "text-bg-info", //clase de bootstrap
    "jewelery": "text-bg-warning",
    "men's clothing": "text-bg-primary",
    "women's clothing": "text-bg-danger"
}

/**
 * product card html:
 * <article class='col-2-md m-2 card cursor-pointer'>
        <img src="${product.image}" alt="Product Image">
        <div class="card-content">
            <div class="title">${product.title}</div>
            <div class="price">$${product.price}</div>
            <span class="badge rounded-pill ${categoryCssClasses[product.category]}">${product.category}</span>
            <div class="description">${product.description}</div>
        </div>`
    </article>
 * 
 */

document.addEventListener('DOMContentLoaded', async () => {
    // asta inseamna ca codul se executa doar cand apare eventul DOM Content Loader
    // adica dupa ce tot codul a fost interpretat de browser

    //get request catre server
    const productsURL = `${BASE_URL}${productsEndpoint}`;
    const response = await fetch(productsURL);
    const data = await response.json();
    console.log(data);
    //adaugare de elemente
    const productsContainer = document.getElementById(`products-container`);
    for(const product of data){
        const article = document.createElement(`articel`);
        article.className = "col-2-md m-2 card cursor-pointer";
        article.innerHTML = `<img src="${product.image}" alt="Product Image">
                             <div class="card-content">
                                <div class="title">${product.title}</div>
                                <div class="price">$${product.price}</div>
                                <span class="badge rounded-pill ${categoryCssClasses[product.category]}">${product.category}</span>
                                <div class="description">${product.description}</div>
                            </div>`;
        productsContainer.appendChild(article);
        //putem sa incadram article intr-un elem A pe care sa aplicam eventul
        article.addEventListener(`click`, () => {
            //salvam in local storage id-ul produsului pe care facem click - mergem apoi in product.js
            localStorage.setItem("productID", product.id);
            window.location.pathname = "./product_page.html"
        })
    }
});
