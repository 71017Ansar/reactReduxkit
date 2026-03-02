import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import { saveCartItems } from '../features/cart/cartStorage'
import moviesReducer from '../features/movies/moviesSlice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    cart: cartReducer,
  },
})

store.subscribe(() => {
  saveCartItems(store.getState().cart.items)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
