// Initialize or fetch existing items from local browser memory storage
let basket = JSON.parse(localStorage.getItem('hidera_cart_storage')) || [];

// Wait for DOM to finish rendering
document.addEventListener('DOMContentLoaded', () => {
    renderCartContents();
    setupCartEventListeners();
});

// Setup click handlers for operational triggers
function setupCartEventListeners() {
    // Select any element that has our designated dynamic hook class
    document.body.addEventListener('click', (event) => {
        const targetBtn = event.target.closest('.add-to-cart-btn');
        
        if (targetBtn) {
            // FIXED: Read the quantity input dynamically right when the button is clicked
            const quantitySelected = parseInt(document.getElementById('productQtyInput')?.value) || 3;

            // Pull element meta attributes along with the selected quantity
            const product = {
                id: targetBtn.getAttribute('data-id'),
                name: targetBtn.getAttribute('data-name'),
                price: parseFloat(targetBtn.getAttribute('data-price')),
                quantity: quantitySelected // Safely maps to the selected element value!
            };
            
            addItemToBasket(product);
        }
    });
}

// Logical calculation engine: Adds item or increments count
function addItemToBasket(item) {
    const existingIndex = basket.findIndex(entry => entry.id === item.id);
    
    if (existingIndex > -1) {
        // If it exists, add the newly selected quantity to the basket instead of just 1
        basket[existingIndex].quantity += item.quantity;
    } else {
        basket.push(item);
    }
    
    // Save state changes and re-render current viewport layout
    synchronizeCartState();
    
    // Smoothly display/slide out the Sidebar overlay via Bootstrap's programmatic API
    const element = document.getElementById('cartSidebar');
    if (element) {
        const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(element);
        offcanvasInstance.show();
    }
}

// Synchronize changes to local application layer memory storage systems
function synchronizeCartState() {
    localStorage.setItem('hidera_cart_storage', JSON.stringify(basket));
    renderCartContents();
}

// Remove an item entirely from the current transaction list array stack
function removeBasketItem(itemId) {
    basket = basket.filter(item => item.id !== itemId);
    synchronizeCartState();
}

// Visual layout compilation template mapping layout engine
function renderCartContents() {
    const container = document.getElementById('cartItemsContainer');
    const totalLabel = document.getElementById('cartTotalSum');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!container) return;
    
    if (basket.length === 0) {
        container.innerHTML = `<div class="text-center text-muted py-5"><i class="fas fa-folder-open d-block mb-2 fs-3"></i>Your bag is empty</div>`;
        if (totalLabel) totalLabel.innerText = "₦0";
        if (checkoutBtn) checkoutBtn.classList.add('disabled');
        return;
    }
    
    if (checkoutBtn) checkoutBtn.classList.remove('disabled');
    
    let totalAccumulator = 0;
    container.innerHTML = ''; // Wipe stale rows clean
    
    basket.forEach(item => {
        const itemCostTotal = item.price * item.quantity;
        totalAccumulator += itemCostTotal;
        
        const markupRow = document.createElement('div');
        markupRow.className = "d-flex justify-content-between align-items-center mb-3 p-3 bg-black rounded border border-secondary shadow-sm";
        markupRow.innerHTML = `
            <div>
                <h6 class="text-warning mb-0 fw-bold">${item.name}</h6>
                <small class="text-white-50">₦${item.price.toLocaleString()} x ${item.quantity}</small>
            </div>
            <div class="text-end">
                <span class="d-block fw-bold text-white mb-1">₦${itemCostTotal.toLocaleString()}</span>
                <button class="btn btn-sm text-danger p-0 border-0 bg-transparent" onclick="removeBasketItem('${item.id}')">
                    <i class="fas fa-trash-alt small"></i> Remove
                </button>
            </div>
        `;
        container.appendChild(markupRow);
    });
    
    if (totalLabel) {
        totalLabel.innerText = `₦${totalAccumulator.toLocaleString()}`;
    }
}