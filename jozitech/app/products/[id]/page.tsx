import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/products"
import AddToCartButton from "@/components/add-to-cart-button"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-8">
      <Link href="/products" className="mb-8 flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg border bg-white">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-contain p-4"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="mt-2 flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating} ({Math.floor(product.rating * 10)} reviews)
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold">R {product.price.toLocaleString()}</p>

          <div className="mt-6 space-y-2 text-sm">
            <p className="flex items-center text-green-600">
              <span className="mr-2 rounded-full bg-green-100 p-1">
                <Truck className="h-4 w-4" />
              </span>
              Free delivery in Johannesburg
            </p>
            <p className="flex items-center">
              <span className="mr-2 rounded-full bg-primary/10 p-1">
                <ShieldCheck className="h-4 w-4" />
              </span>
              2-year warranty included
            </p>
          </div>

          <p className="mt-6">{product.description}</p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <AddToCartButton product={product} />
            <Button variant="outline">Add to Wishlist</Button>
          </div>

          {/* Product Specifications */}
          {product.specs && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Specifications</h2>
              <div className="rounded-lg border">
                {Object.entries(product.specs).map(([key, value], index) => (
                  <div key={key} className={`flex py-3 px-4 ${index % 2 === 0 ? "bg-muted/50" : ""}`}>
                    <span className="w-1/3 font-medium capitalize">{key.replace("_", " ")}</span>
                    <span className="w-2/3">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
