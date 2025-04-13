import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Truck, ShieldCheck, Clock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getFeaturedProducts, getAllCategories } from "@/lib/products"

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20 text-white">
          <div className="container flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                The Latest Tech <br />
                <span className="text-primary">At Your Fingertips</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-gray-300 md:mx-0">
                Discover premium electronics and gadgets with fast delivery across Johannesburg.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Latest electronics"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <Link href="/products" className="flex items-center text-primary hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <p className="mt-2 font-bold">R {product.price.toLocaleString()}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link key={category} href={`/products?category=${category}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-square bg-muted p-6">
                  <div className="flex h-full items-center justify-center">
                    <h3 className="text-center text-xl font-semibold capitalize">{category.replace("-", " ")}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted py-12">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">Why Shop With Us</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Same-day delivery available in Johannesburg</p>
              </CardContent>
            </Card>
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Warranty Guaranteed</h3>
                <p className="text-sm text-muted-foreground">All products come with manufacturer warranty</p>
              </CardContent>
            </Card>
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">Multiple payment options with secure checkout</p>
              </CardContent>
            </Card>
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Customer service available around the clock</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container">
        <div className="rounded-lg bg-primary/10 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Stay Updated</h2>
          <p className="mb-6 text-muted-foreground">
            Subscribe to our newsletter for the latest products and exclusive offers
          </p>
          <form className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
