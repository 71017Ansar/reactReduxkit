import type { Movie } from '../../types/movie'

export interface CartItem extends Movie {
  quantity: number
}

const CART_STORAGE_KEY = 'movie-cart-items'

export const loadCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) {
      return []
    }

    const parsed = JSON.parse(stored) as CartItem[]
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((item) => item?.id && item?.quantity)
  } catch {
    return []
  }
}

export const saveCartItems = (items: CartItem[]): void => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}
