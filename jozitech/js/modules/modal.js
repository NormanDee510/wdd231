/**
 * Modal dialog functionality
 */

// Setup modal
export function setupModal() {
  // Create modal container if it doesn't exist
  if (!document.querySelector(".modal-container")) {
    const modalContainer = document.createElement("div")
    modalContainer.className = "modal-container"
    modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-body"></div>
                </div>
            </div>
        `
    document.body.appendChild(modalContainer)

    // Close button functionality
    const closeButton = modalContainer.querySelector(".close-modal")
    closeButton.addEventListener("click", () => {
      modalContainer.classList.remove("active")
    })

    // Close when clicking outside the modal
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        modalContainer.classList.remove("active")
      }
    })

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalContainer.classList.contains("active")) {
        modalContainer.classList.remove("active")
      }
    })
  }
}

// Show modal with content
export function showModal(content) {
  const modalContainer = document.querySelector(".modal-container")
  const modalBody = modalContainer.querySelector(".modal-body")

  // Set content
  if (typeof content === "string") {
    modalBody.innerHTML = content
  } else if (content instanceof HTMLElement) {
    modalBody.innerHTML = ""
    modalBody.appendChild(content)
  }

  // Show modal
  modalContainer.classList.add("active")
}
