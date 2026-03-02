import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '../../types/movie'

interface WishlistState {
  items: Movie[]
}

const initialState: WishlistState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload
      const existingItem = state.items.find((item) => item.id === movie.id)

      if (existingItem) {
        return
      }

      state.items.push({ ...movie })
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearWishlist: (state) => {
      state.items = []
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions

export default wishlistSlice.reducer
