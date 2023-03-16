import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, ProductVariant } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, variant: ProductVariant, quantity: number, customizations?: any) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, variant, quantity, customizations) => {
        const existingItemIndex = get().items.findIndex(
          item => item.product_variant_id === variant.id && 
          JSON.stringify(item.customizations) === JSON.stringify(customizations)
        )
        
        if (existingItemIndex > -1) {
          // Update existing item quantity
          set(state => ({
            items: state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          }))
        } else {
          // Add new item
          const newItem: CartItem = {
            id: Date.now().toString(),
            product_variant_id: variant.id,
            quantity,
            unit_price: variant.price,
            total_price: variant.price * quantity,
            customizations,
            product_variant: { ...variant, product }
          }
          
          set(state => ({
            items: [...state.items, newItem]
          }))
        }
      },
      
      removeItem: (itemId) => {
        set(state => ({
          items: state.items.filter(item => item.id !== itemId)
        }))
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.id === itemId
              ? { ...item, quantity, total_price: item.unit_price * quantity }
              : item
          )
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.total_price, 0)
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
) 