import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { products, getAllCategories } from "@/lib/products"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categoryFilter = searchParams.category as string | undefined

  const filteredProducts = categoryFilter ? products.filter((product) => product.category === categoryFilter) : products

  const categories = getAllCategories()

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        {categoryFilter
          ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1).replace("-", " ")}`
          : "All Products"}
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Sidebar with categories */}
        <div className="md:col-span-1">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 font-semibold">Categories</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className={`block rounded-md px-3 py-2 text-sm hover:bg-muted ${!categoryFilter ? "bg-muted font-medium" : ""}`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/products?category=${category}`}
                    className={`block rounded-md px-3 py-2 text-sm hover:bg-muted ${categoryFilter === category ? "bg-muted font-medium" : ""}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mb-4 mt-6 font-semibold">Price Range</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="price-1" className="mr-2" />
                <label htmlFor="price-1" className="text-sm">
                  Under R1,000
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="price-2" className="mr-2" />
                <label htmlFor="price-2" className="text-sm">
                  R1,000 - R5,000
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="price-3" className="mr-2" />
                <label htmlFor="price-3" className="text-sm">
                  R5,000 - R10,000
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="price-4" className="mr-2" />
                <label htmlFor="price-4" className="text-sm">
                  Over R10,000
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading products...</div>}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
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
                      <div className="mt-2 flex items-center justify-between">
                        <p className="font-bold">R {product.price.toLocaleString()}</p>
                        <div className="flex items-center">
                          <span className="text-sm text-yellow-500">★</span>
                          <span className="ml-1 text-sm text-muted-foreground">{product.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
