export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  featured?: boolean
  stock: number
  rating: number
  specs?: Record<string, string>
}

export const products: Product[] = [
  {
    id: "laptop-001",
    name: "ProBook X5",
    description: "Ultra-thin laptop with 16GB RAM, 512GB SSD, and a stunning 15.6-inch display.",
    price: 12999,
    category: "laptops",
    image: "/placeholder.svg?height=400&width=400",
    featured: true,
    stock: 15,
    rating: 4.7,
    specs: {
      processor: "Intel Core i7-11th Gen",
      memory: "16GB DDR4",
      storage: "512GB NVMe SSD",
      display: "15.6-inch FHD IPS",
      graphics: "Intel Iris Xe Graphics",
      battery: "Up to 10 hours",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "smartphone-001",
    name: "Galaxy Ultra",
    description: "Flagship smartphone with 108MP camera, 5G connectivity, and all-day battery life.",
    price: 18999,
    category: "smartphones",
    image: "/placeholder.svg?height=400&width=400",
    featured: true,
    stock: 20,
    rating: 4.9,
    specs: {
      processor: "Snapdragon 8 Gen 2",
      memory: "12GB RAM",
      storage: "256GB",
      display: "6.8-inch Dynamic AMOLED 2X",
      camera: "108MP main, 12MP ultrawide, 10MP telephoto",
      battery: "5000mAh",
      os: "Android 13",
    },
  },
  {
    id: "headphones-001",
    name: "SoundWave Pro",
    description: "Wireless noise-cancelling headphones with 30-hour battery life and premium sound quality.",
    price: 3499,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    featured: true,
    stock: 30,
    rating: 4.6,
    specs: {
      type: "Over-ear",
      connectivity: "Bluetooth 5.2",
      battery: "30 hours",
      features: "Active Noise Cancellation, Ambient Mode",
      charging: "USB-C",
      weight: "250g",
    },
  },
  {
    id: "smartwatch-001",
    name: "FitTrack X1",
    description: "Advanced smartwatch with health tracking, GPS, and 7-day battery life.",
    price: 4299,
    category: "smart-devices",
    image: "/placeholder.svg?height=400&width=400",
    featured: true,
    stock: 25,
    rating: 4.5,
    specs: {
      display: "1.4-inch AMOLED",
      sensors: "Heart rate, SpO2, accelerometer, gyroscope",
      battery: "7 days typical use",
      water_resistance: "5 ATM",
      connectivity: "Bluetooth 5.0, GPS",
      compatibility: "Android, iOS",
    },
  },
  {
    id: "tablet-001",
    name: "SlateTab Pro",
    description: "Premium tablet with 10.9-inch display, perfect for work and entertainment.",
    price: 8999,
    category: "tablets",
    image: "/placeholder.svg?height=400&width=400",
    stock: 18,
    rating: 4.4,
    specs: {
      processor: "A14 Bionic",
      memory: "8GB RAM",
      storage: "128GB",
      display: "10.9-inch Liquid Retina",
      battery: "Up to 10 hours",
      camera: "12MP rear, 7MP front",
      os: "iPadOS 16",
    },
  },
  {
    id: "speaker-001",
    name: "BoomBox Mini",
    description: "Portable Bluetooth speaker with 360° sound and 20-hour battery life.",
    price: 1899,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    stock: 40,
    rating: 4.3,
    specs: {
      type: "Portable Bluetooth Speaker",
      connectivity: "Bluetooth 5.1",
      battery: "20 hours",
      features: "360° sound, waterproof IPX7",
      charging: "USB-C",
      weight: "550g",
    },
  },
  {
    id: "laptop-002",
    name: "UltraBook Air",
    description: "Lightweight laptop weighing just 1.2kg with all-day battery life.",
    price: 14999,
    category: "laptops",
    image: "/placeholder.svg?height=400&width=400",
    stock: 12,
    rating: 4.6,
    specs: {
      processor: "AMD Ryzen 7 5800U",
      memory: "16GB LPDDR4X",
      storage: "1TB NVMe SSD",
      display: "14-inch 2.8K OLED",
      graphics: "AMD Radeon Graphics",
      battery: "Up to 12 hours",
      os: "Windows 11 Home",
    },
  },
  {
    id: "smartphone-002",
    name: "iPhoneX Pro",
    description: "Latest flagship phone with advanced camera system and powerful performance.",
    price: 19999,
    category: "smartphones",
    image: "/placeholder.svg?height=400&width=400",
    stock: 15,
    rating: 4.8,
    specs: {
      processor: "A16 Bionic",
      memory: "8GB RAM",
      storage: "256GB",
      display: "6.7-inch Super Retina XDR",
      camera: "48MP main, 12MP ultrawide, 12MP telephoto",
      battery: "4323mAh",
      os: "iOS 16",
    },
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getAllCategories(): string[] {
  const categories = new Set(products.map((product) => product.category))
  return Array.from(categories)
}
