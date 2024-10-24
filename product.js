const BASE_URL = 'https://fakestoreapi.com';

document.addEventListener('DOMContentLoaded', async () => {
    // se citeste id-ul produsului salvat in local storage
    const productID = localStorage.getItem("productID");
    const productURL = `${BASE_URL}/products/${productID}}`;
    const response = await fetch(productURL);
    const productData = await response.json();
    console.log(productData);

    const imgContainer = document.getElementById("img-container");
    const img = document.createElement("img");
    img.src = productData.img;
    imgContainer.appendChild(img);

    const imgTitle = document.getElementById("product title");
    imgTitle.textContent = productData.title;

    const productCateg = document.getElementById("product-categ");
    productCateg.textContent = productData.category;

    const productPrice = document.getElementById("product-price");
    productPrice.textContent = productData.price;
    
    const productDescription = document.getElementById("product-description");
    productDescription = productData.description;
});
