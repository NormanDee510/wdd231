import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">About JoziTech</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Our Story</h2>
          <p className="mb-4">
            Founded in 2020, JoziTech started as a small electronics shop in Sandton, Johannesburg. Our founder, a tech
            enthusiast with a passion for making technology accessible to everyone, saw a gap in the market for a
            customer-focused electronics retailer that offered quality products at competitive prices.
          </p>
          <p className="mb-4">
            What began as a modest store has now grown into one of Johannesburg's premier destinations for electronics
            and gadgets. Our online store extends our reach beyond physical boundaries, allowing us to serve customers
            throughout South Africa.
          </p>
          <p>
            At JoziTech, we believe that technology should enhance lives, and we're committed to helping our customers
            find the perfect tech solutions for their needs.
          </p>
        </div>
        <div className="order-first md:order-last">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="JoziTech store"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="my-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg border p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Our Mission</h3>
          <p>
            To provide high-quality electronics and exceptional customer service, making technology accessible to
            everyone in Johannesburg and beyond.
          </p>
        </div>
        <div className="rounded-lg border p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Our Vision</h3>
          <p>
            To become South Africa's most trusted electronics retailer, known for our expertise, integrity, and
            customer-first approach.
          </p>
        </div>
        <div className="rounded-lg border p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Our Values</h3>
          <p>
            Quality, integrity, innovation, and exceptional customer service are the core values that guide everything
            we do at JoziTech.
          </p>
        </div>
      </div>

      <div className="my-12">
        <h2 className="mb-6 text-2xl font-semibold">Why Choose JoziTech?</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Quality Products</h3>
              <p className="text-muted-foreground">
                We carefully select every product in our inventory to ensure it meets our high standards.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Expert Advice</h3>
              <p className="text-muted-foreground">
                Our team of tech enthusiasts is always ready to help you find the perfect product.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Fast Delivery</h3>
              <p className="text-muted-foreground">
                We offer same-day delivery in Johannesburg and fast shipping nationwide.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">After-Sales Support</h3>
              <p className="text-muted-foreground">
                Our commitment to you doesn't end after purchase. We're here to help with any issues.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12 rounded-lg bg-muted p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold">Ready to Experience JoziTech?</h2>
        <p className="mb-6 mx-auto max-w-2xl">
          Whether you're looking for the latest smartphone, a powerful laptop, or smart home devices, we have what you
          need. Browse our extensive collection and enjoy a seamless shopping experience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
