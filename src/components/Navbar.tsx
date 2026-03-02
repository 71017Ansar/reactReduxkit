import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from '../features/cart/cartSlice'

function Navbar() {
  const dispatch = useAppDispatch()
  const [showCartDetails, setShowCartDetails] = useState(false)
  const cartItems = useAppSelector((state) => state.cart.items)

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Movie Store</h1>
          <p className="text-sm text-slate-500">Redux Toolkit + Tailwind CSS</p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCartDetails((value) => !value)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cart ({cartCount})
          </button>

          {showCartDetails && (
            <div className="absolute right-0 mt-2 w-96 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">
                  Cart Details
                </h2>
                <button
                  type="button"
                  onClick={() => dispatch(clearCart())}
                  className="text-xs font-semibold text-red-600 hover:text-red-500"
                >
                  Clear cart
                </button>
              </div>

              {cartItems.length === 0 && (
                <p className="text-sm text-slate-500">Your cart is empty.</p>
              )}

              <ul className="max-h-80 space-y-3 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500">{item.year}</p>
                      <p className="text-xs text-slate-700">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
