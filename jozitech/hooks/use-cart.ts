"use client"

// Import the useCart hook directly from cart-provider
import { useCart as useCartHook } from "@/components/cart-provider"

// Re-export the hook
export function useCart() {
  return useCartHook()
}
