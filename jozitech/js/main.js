// Main JavaScript file
import { setupNavigation } from "./modules/navigation.js"
import { setupLazyLoading } from "./modules/utils.js"
import { fetchProducts, displayProducts, setupProductFilters } from "./modules/products.js"
import { setupForm, displayFormData } from "./modules/form.js"
import { updateCartCount, setupCart } from "./modules/cart.js"
import { setupModal } from "./modules/modal.js"

// Initialize components based on current page
document.addEventListener("DOMContentLoaded", async () => {
  // Set current year in footer
  document.querySelectorAll("#current-year").forEach((el) => {
    el.textContent = new Date().getFullYear()
  })

  // Common setup for all pages
  setupNavigation()
  setupLazyLoading()
  updateCartCount()
  setupModal()

  // Page-specific setup
  const currentPage = document.body.id

  try {
    switch (currentPage) {
      case "home":
        const featuredProducts = await fetchProducts()
        const featuredContainer = document.querySelector(".featured-products")
        if (featuredContainer) {
          displayProducts(
            featuredProducts.filter((p) => p.featured),
            featuredContainer,
          )
        }
        break

      case "products":
        const allProducts = await fetchProducts()
        const productsGrid = document.querySelector(".products-grid")
        if (productsGrid) {
          // Get category from URL if present
          const urlParams = new URLSearchParams(window.location.search)
          const categoryParam = urlParams.get("category")

          // Update active category in sidebar
          if (categoryParam) {
            document.querySelectorAll(".filter-link").forEach((link) => {
              link.classList.remove("active")
              if (link.dataset.category === categoryParam) {
                link.classList.add("active")
              }
            })

            // Update page title
            const titleEl = document.getElementById("products-title")
            if (titleEl) {
              const categoryName = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).replace("-", " ")
              titleEl.textContent = categoryName
            }

            // Filter products by category
            const filteredProducts = allProducts.filter((p) => p.category === categoryParam)
            displayProducts(filteredProducts, productsGrid)
          } else {
            displayProducts(allProducts, productsGrid)
          }

          // Setup product filters
          setupProductFilters(allProducts, productsGrid)
        }
        break

      case "contact":
        setupForm()
        break

      case "form-response":
        displayFormData()
        break

      case "cart":
        setupCart()
        break
    }
  } catch (error) {
    console.error("Error initializing page:", error)
  }
})
