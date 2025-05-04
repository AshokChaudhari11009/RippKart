const BASE_URL = 'http://127.0.0.1:8000/api/products/';
let page_size = 4; 
let page = 1;

let API_URL = `${BASE_URL}?page_size=${page_size}&page=${page}`;
let nextPageUrl = null;
let previousPageUrl = null;

function renderProducts(products) {
    let output = '';
  
    products.results.forEach(product => {
        output += `
        <div class="product-card">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-brand">${product.brand}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-stock">
                Available quantity: ${product.quantity}
            </div>
        </div>
        `;
    });
  
    document.getElementById('product-container').innerHTML = output;
}

function renderPagination() {
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    
    prevButton.disabled = !previousPageUrl;
    nextButton.disabled = !nextPageUrl;
}

function loadNextPage() {
    if (nextPageUrl) {
        fetch(nextPageUrl)
            .then(res => res.json())
            .then(data => {
                renderProducts(data);
                nextPageUrl = data.next;
                previousPageUrl = data.previous;
                renderPagination();
            });
    }
}

function loadPreviousPage() {
    if (previousPageUrl) {
        fetch(previousPageUrl)
            .then(res => res.json())
            .then(data => {
                renderProducts(data);
                nextPageUrl = data.next;
                previousPageUrl = data.previous;
                renderPagination();
            });
    }
}


document.getElementById('nextBtn').addEventListener('click', loadNextPage);
document.getElementById('prevBtn').addEventListener('click', loadPreviousPage);


fetch(API_URL)
  .then(res => res.json())
  .then(data => {
      renderProducts(data);
      nextPageUrl = data.next;
      previousPageUrl = data.previous;
      renderPagination();
  })
  .catch(err => console.error('Error fetching products:', err));