import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">JoziTech</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your premium electronics store in Johannesburg, offering the latest tech gadgets and accessories.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/products/laptops" className="text-muted-foreground hover:text-primary">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/products/smartphones" className="text-muted-foreground hover:text-primary">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/products/accessories" className="text-muted-foreground hover:text-primary">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products/smart-devices" className="text-muted-foreground hover:text-primary">
                  Smart Devices
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <address className="mt-2 not-italic text-sm text-muted-foreground">
              <p>123 Tech Street</p>
              <p>Sandton, Johannesburg</p>
              <p>South Africa</p>
              <p className="mt-2">
                <a href="tel:+27123456789" className="hover:text-primary">
                  +27 12 345 6789
                </a>
              </p>
              <p>
                <a href="mailto:info@jozitech.co.za" className="hover:text-primary">
                  info@jozitech.co.za
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JoziTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
