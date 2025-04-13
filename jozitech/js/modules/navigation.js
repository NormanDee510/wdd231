/**
 * Navigation functionality
 */
export function setupNavigation() {
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true"

      menuToggle.setAttribute("aria-expanded", !isExpanded)
      navMenu.classList.toggle("expanded")
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("expanded") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("expanded")
        menuToggle.setAttribute("aria-expanded", "false")
      }
    })
  }

  // Highlight current page in navigation
  const currentPath = window.location.pathname
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    if (currentPath.endsWith(link.getAttribute("href"))) {
      link.classList.add("active")
    }
  })
}
