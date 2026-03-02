import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '../../types/movie'
import { loadCartItems, type CartItem } from './cartStorage'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: loadCartItems(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload
      const existingItem = state.items.find((item) => item.id === movie.id)

      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      state.items.push({ ...movie, quantity: 1 })
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find((item) => item.id === action.payload)
      if (!existingItem) {
        return
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload)
        return
      }

      existingItem.quantity -= 1
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
