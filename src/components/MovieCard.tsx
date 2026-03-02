import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import {
  addToWishlist,
  removeFromWishlist,
} from '../features/cart/wishlistSlice'
import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useAppDispatch()
  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === movie.id),
  )

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-64 w-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
          {movie.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {movie.year} | {movie.runtime}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{movie.genre}</p>
        <p className="mt-3 text-sm font-medium text-amber-700">
          IMDb: {movie.imdbRating}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => dispatch(addToCart(movie))}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch(
                isWishlisted
                  ? removeFromWishlist(movie.id)
                  : addToWishlist(movie),
              )
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            {isWishlisted ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
