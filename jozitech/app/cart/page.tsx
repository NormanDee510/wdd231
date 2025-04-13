"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      clearCart()
      setIsCheckingOut(false)
      // In a real app, you would redirect to a success page
      alert("Order placed successfully!")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center py-16 text-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="hidden border-b p-4 sm:grid sm:grid-cols-6">
              <div className="col-span-3 font-medium">Product</div>
              <div className="col-span-1 text-center font-medium">Price</div>
              <div className="col-span-1 text-center font-medium">Quantity</div>
              <div className="col-span-1 text-right font-medium">Total</div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 border-b p-4 sm:grid-cols-6">
                <div className="col-span-3 flex items-center gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      <Link href={`/products/${item.id}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-1 flex items-center text-sm text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-1 flex items-center justify-center py-2 sm:py-0">
                  <span className="text-sm sm:hidden">Price: </span>
                  <span className="font-medium">R {item.price.toLocaleString()}</span>
                </div>

                <div className="col-span-1 flex items-center justify-center py-2 sm:py-0">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-l-md border border-r-0 bg-muted disabled:opacity-50"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <div className="flex h-8 w-10 items-center justify-center border">{item.quantity}</div>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-r-md border border-l-0 bg-muted"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="col-span-1 flex items-center justify-end py-2 font-medium sm:py-0">
                  <span className="text-sm sm:hidden">Total: </span>R {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>R {(subtotal * 0.15).toLocaleString()}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>R {(subtotal * 1.15).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Button className="mt-6 w-full" onClick={handleCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? "Processing..." : "Checkout"}
              {!isCheckingOut && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
