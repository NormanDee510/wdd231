/**
 * Products functionality
 */
import { formatCurrency, truncateText } from "./utils.js"
import { addToCart } from "./cart.js"
import { showModal } from "./modal.js"

// Fetch products from JSON file
export async function fetchProducts() {
  try {
    const response = await fetch("js/data/products.json")

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.products
  } catch (error) {
    console.error("Error fetching products:", error)
    showModal(`
            <h3>Error Loading Products</h3>
            <p>There was a problem loading the products. Please try again later.</p>
        `)
    return []
  }
}

// Display products in a container
export function displayProducts(products, container) {
  if (!container) return

  // Clear loading message
  container.innerHTML = ""

  if (products.length === 0) {
    container.innerHTML = '<div class="no-products">No products found</div>'
    return
  }

  // Create product cards
  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"

    productCard.innerHTML = `
            <div class="product-image">
                <img src="images/placeholder.jpg" data-src="images/products/${product.image}" alt="${product.name}" class="lazy-image">
            </div>
            <div class="product-details">
                <h3>${product.name}</h3>
                <p class="price">${formatCurrency(product.price)}</p>
                <p class="description">${truncateText(product.description, 100)}</p>
                <div class="product-actions">
                    <button class="btn primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="btn secondary view-details" data-id="${product.id}">Details</button>
                </div>
            </div>
        `

    container.appendChild(productCard)
  })

  // Setup event listeners for product cards
  setupProductEvents(container)
}

// Setup event listeners for product cards
function setupProductEvents(container) {
  // Add to cart buttons
  container.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const productId = button.dataset.id
      addToCart(productId)
      showModal(`
                <h3>Product Added to Cart</h3>
                <p>The item has been added to your shopping cart.</p>
                <div class="modal-actions">
                    <button class="btn primary" id="view-cart-btn">View Cart</button>
                    <button class="btn secondary close-modal-btn">Continue Shopping</button>
                </div>
            `)

      // Setup modal buttons
      document.getElementById("view-cart-btn").addEventListener("click", () => {
        window.location.href = "cart.html"
      })

      document.querySelector(".close-modal-btn").addEventListener("click", () => {
        document.querySelector(".modal-container").classList.remove("active")
      })
    })
  })

  // View details buttons
  container.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id
      localStorage.setItem("selectedProductId", productId)
      window.location.href = "product-details.html"
    })
  })
}

// Setup product filters
export function setupProductFilters(products, container) {
  // Price filter checkboxes
  const priceCheckboxes = document.querySelectorAll('input[name="price"]')

  if (priceCheckboxes.length > 0) {
    priceCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        applyFilters(products, container)
      })
    })
  }
}

// Apply filters to products
function applyFilters(products, container) {
  // Get selected price ranges
  const selectedPriceRanges = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(
    (checkbox) => checkbox.value,
  )

  // Get category from URL
  const urlParams = new URLSearchParams(window.location.search)
  const categoryParam = urlParams.get("category")

  // Filter products
  let filteredProducts = [...products]

  // Apply category filter
  if (categoryParam) {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryParam)
  }

  // Apply price filters
  if (selectedPriceRanges.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      return selectedPriceRanges.some((range) => {
        const [min, max] = range.split("-").map(Number)
        return product.price >= min && product.price <= max
      })
    })
  }

  // Display filtered products
  displayProducts(filteredProducts, container)
}
;```js file="js/modules/cart.js"
/**
 * Shopping cart functionality
 */
import { fetchProducts } from './products.js';
import { formatCurrency } from './utils.js';
import { showModal } from './modal.js';

// Get cart from localStorage
export function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
export function addToCart(productId) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartCount();
}

// Remove item from cart
export function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
}

// Update item quantity
export function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(cart);
        updateCartCount();
    }
}

// Update cart count in header
export function updateCartCount() {
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountEl.textContent = count;
        cartCountEl.style.display = count > 0 ? 'block' : 'none';
    }
}

// Setup cart page
export async function setupCart() {
    const cartContent = document.getElementById('cart-content');
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    const cartItemsList = document.getElementById('cart-items-list');
    
    if (!cartContent || !emptyCart || !cartItems || !cartItemsList) return;
    
    const cart = getCart();
    
    // Show empty cart message if cart is empty
    if (cart.length === 0) {
        cartContent.innerHTML = '';
        emptyCart.classList.remove('hidden');
        return;
    }
    
    try {
        // Fetch all products
        const products = await fetchProducts();
        
        // Get cart items with product details
        const cartWithDetails = cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return {
                ...item,
                product
            };
        }).filter(item => item.product); // Filter out items with no product details
        
        // Show empty cart if no valid items
        if (cartWithDetails.length === 0) {
            cartContent.innerHTML = '';
            emptyCart.classList.remove('hidden');
            return;
        }
        
        // Show cart items
        cartContent.innerHTML = '';
        cartItems.classList.remove('hidden');
        
        // Render cart items
        cartItemsList.innerHTML = '';
        cartWithDetails.forEach(item => {
            const { product, quantity } = item;
            const itemTotal = product.price * quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
\
                <div
class="cart-product">
                    <div class="cart-product-image">
                        <img src="images/placeholder.jpg" data-src="images/products/${product.image}" alt="${product.name}" class="lazy-image">
                    </div>
                    <div class="cart-product-details">
                        <h3>${product.name}</h3>
                        <button class="remove-item" data-id="${product.id}">Remove</button>
                    </div>
                </div>
                <div class="cart-product-price">
                    <span class="label">Price:</span>
                    <span>${formatCurrency(product.price)}
</span>
</div>
                <div
class="cart-product-quantity">
                    <span class="label">Quantity:</span>
                    <div class="cart-product-quantity-controls">
                        <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                        <span class="quantity-value">${quantity}
</span>
;<button class="quantity-btn increase" data-id="${product.id}">
  +
</button>
</div>
                </div>
                <div
class="cart-product-total">
                    <span class="label">Total:</span>
                    <span>${formatCurrency(itemTotal)}
</span>
</div>
            `

cartItemsList.appendChild(cartItem)
})

// Calculate totals
const subtotal = cartWithDetails.reduce((total, item) => {
  return total + item.product.price * item.quantity
}, 0)

const tax = subtotal * 0.15
const total = subtotal + tax

// Update totals in UI
document.getElementById("cart-subtotal").textContent = formatCurrency(subtotal)
document.getElementById("cart-tax").textContent = formatCurrency(tax)
document.getElementById("cart-total").textContent = formatCurrency(total)

// Setup event listeners
setupCartEvents(cartItemsList)
setupCheckout()

} catch (error)
{
  console.error("Error setting up cart:", error)
  cartContent.innerHTML = `
            <div class="error-message">
                <p>There was an error loading your cart. Please try again later.</p>
            </div>
        `
}
}

// Setup cart event listeners
function setupCartEvents(cartItemsList) {
  // Remove item buttons
  cartItemsList.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id
      removeFromCart(productId)
      setupCart() // Refresh cart
    })
  })

  // Decrease quantity buttons
  cartItemsList.querySelectorAll(".quantity-btn.decrease").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id
      const cart = getCart()
      const item = cart.find((item) => item.id === productId)

      if (item && item.quantity > 1) {
        updateCartQuantity(productId, item.quantity - 1)
        setupCart() // Refresh cart
      }
    })
  })

  // Increase quantity buttons
  cartItemsList.querySelectorAll(".quantity-btn.increase").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id
      const cart = getCart()
      const item = cart.find((item) => item.id === productId)

      if (item) {
        updateCartQuantity(productId, item.quantity + 1)
        setupCart() // Refresh cart
      }
    })
  })
}

// Setup checkout button
function setupCheckout() {
  const checkoutBtn = document.getElementById("checkout-btn")

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      showModal(`
                <h3>Checkout</h3>
                <p>This is a demo website. In a real e-commerce site, this would proceed to a secure checkout page.</p>
                <div class="modal-actions">
                    <button class="btn primary" id="complete-order-btn">Complete Order (Demo)</button>
                    <button class="btn secondary close-modal-btn">Cancel</button>
                </div>
            `)

      // Setup modal buttons
      document.getElementById("complete-order-btn").addEventListener("click", () => {
        // Clear cart
        localStorage.removeItem("cart")

        // Show success message
        showModal(`
                    <h3>Order Placed!</h3>
                    <p>Your demo order has been placed successfully.</p>
                    <div class="modal-actions">
                        <button class="btn primary" id="continue-shopping-btn">Continue Shopping</button>
                    </div>
                `)

        document.getElementById("continue-shopping-btn").addEventListener("click", () => {
          window.location.href = "index.html"
        })
      })

      document.querySelector(".close-modal-btn").addEventListener("click", () => {
        document.querySelector(".modal-container").classList.remove("active")
      })
    })
  }
}
