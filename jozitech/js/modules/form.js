/**
 * Form handling functionality
 */
import { showModal } from "./modal.js"

// Setup contact form
export function setupForm() {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Store form data in localStorage for the response page
      const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value,
        date: new Date().toISOString(),
      }

      localStorage.setItem("formSubmission", JSON.stringify(formData))
    })
  }

  // Setup newsletter form
  const newsletterForm = document.getElementById("newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = newsletterForm.querySelector('input[type="email"]').value

      // Store email in localStorage
      const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]")
      subscribers.push({
        email,
        date: new Date().toISOString(),
      })
      localStorage.setItem("subscribers", JSON.stringify(subscribers))

      // Show success message
      showModal(`
                <h3>Thank You!</h3>
                <p>You have been subscribed to our newsletter with the email: ${email}</p>
            `)

      // Reset form
      newsletterForm.reset()
    })
  }
}

// Display form data on response page
export function displayFormData() {
  const responseContent = document.getElementById("form-response-content")

  if (responseContent) {
    try {
      const formData = JSON.parse(localStorage.getItem("formSubmission"))

      if (formData) {
        responseContent.innerHTML = `
                    <h1>Thank You, ${formData.name}!</h1>
                    <p>We've received your message and will contact you at <strong>${formData.email}</strong> soon.</p>
                    <div class="response-details">
                        <h3>Your Message Details:</h3>
                        <p><strong>Subject:</strong> ${formData.subject}</p>
                        <p><strong>Message:</strong> ${formData.message}</p>
                        <p><strong>Submitted on:</strong> ${new Date(formData.date).toLocaleString()}</p>
                    </div>
                `
      } else {
        responseContent.innerHTML = `
                    <h1>No Form Submission Found</h1>
                    <p>Please fill out our contact form to submit your inquiry.</p>
                    <a href="contact.html" class="btn primary">Go to Contact Page</a>
                `
      }
    } catch (error) {
      console.error("Error displaying form data:", error)
      responseContent.innerHTML = `
                <h1>Error Processing Submission</h1>
                <p>There was an error processing your form submission.</p>
                <a href="contact.html" class="btn primary">Go to Contact Page</a>
            `
    }
  }
}
