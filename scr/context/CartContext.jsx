import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [restaurantCart, setRestaurantCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eslam-restaurant-cart') || '[]') } catch { return [] }
  })
  const [accessoriesCart, setAccessoriesCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eslam-accessories-cart') || '[]') } catch { return [] }
  })
  const [isRestaurantCartOpen, setRestaurantCartOpen] = useState(false)
  const [isAccessoriesCartOpen, setAccessoriesCartOpen] = useState(false)

  useEffect(() => { localStorage.setItem('eslam-restaurant-cart', JSON.stringify(restaurantCart)) }, [restaurantCart])
  useEffect(() => { localStorage.setItem('eslam-accessories-cart', JSON.stringify(accessoriesCart)) }, [accessoriesCart])

  function addToCart(type, product, qty = 1) {
    const setter = type === 'restaurant' ? setRestaurantCart : setAccessoriesCart
    const current = type === 'restaurant' ? restaurantCart : accessoriesCart
    const price = Number(product.discount_price || product.price || 0)
    const existing = current.find((i) => i.id === product.id)
    if (existing) {
      setter(current.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i))
    } else {
      setter([...current, { id: product.id, name: product.name, image: product.image, price, qty }])
    }
  }
  function updateQty(type, id, qty) {
    const setter = type === 'restaurant' ? setRestaurantCart : setAccessoriesCart
    const current = type === 'restaurant' ? restaurantCart : accessoriesCart
    if (qty <= 0) setter(current.filter((i) => i.id !== id))
    else setter(current.map((i) => i.id === id ? { ...i, qty } : i))
  }
  function removeFromCart(type, id) {
    const setter = type === 'restaurant' ? setRestaurantCart : setAccessoriesCart
    const current = type === 'restaurant' ? restaurantCart : accessoriesCart
    setter(current.filter((i) => i.id !== id))
  }
  function clearCart(type) {
    if (type === 'restaurant') setRestaurantCart([])
    else setAccessoriesCart([])
  }

  const restaurantTotal = useMemo(() => restaurantCart.reduce((s, i) => s + Number(i.price) * i.qty, 0), [restaurantCart])
  const accessoriesTotal = useMemo(() => accessoriesCart.reduce((s, i) => s + Number(i.price) * i.qty, 0), [accessoriesCart])
  const restaurantCount = useMemo(() => restaurantCart.reduce((s, i) => s + i.qty, 0), [restaurantCart])
  const accessoriesCount = useMemo(() => accessoriesCart.reduce((s, i) => s + i.qty, 0), [accessoriesCart])

  const value = useMemo(() => ({
    restaurantCart, accessoriesCart,
    addToCart, updateQty, removeFromCart, clearCart,
    restaurantTotal, accessoriesTotal, restaurantCount, accessoriesCount,
    isRestaurantCartOpen, setRestaurantCartOpen,
    isAccessoriesCartOpen, setAccessoriesCartOpen
  }), [restaurantCart, accessoriesCart, restaurantTotal, accessoriesTotal, restaurantCount, accessoriesCount, isRestaurantCartOpen, isAccessoriesCartOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}