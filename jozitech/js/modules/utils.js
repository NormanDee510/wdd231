/**
 * Utility functions
 */

// Lazy loading for images
export function setupLazyLoading() {
  const lazyImages = document.querySelectorAll(".lazy-image")

  if (lazyImages.length === 0) return

  // Use Intersection Observer if available
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            const src = img.dataset.src

            if (src) {
              img.src = src
              img.classList.add("loaded")
              imageObserver.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      },
    )

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  } else {
    // Fallback for browsers without IntersectionObserver
    function lazyLoad() {
      lazyImages.forEach((img) => {
        if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
          const src = img.dataset.src

          if (src) {
            img.src = src
            img.classList.add("loaded")
          }
        }
      })
    }

    // Initial check
    lazyLoad()

    // Add scroll event listener
    window.addEventListener("scroll", lazyLoad)
    window.addEventListener("resize", lazyLoad)
  }
}

// Format currency
export function formatCurrency(amount) {
  return `R ${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Truncate text
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Get URL parameters
export function getUrlParams() {
  return new URLSearchParams(window.location.search)
}
