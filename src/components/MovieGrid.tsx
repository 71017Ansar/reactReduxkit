import type { Movie } from '../types/movie'
import MovieCard from './MovieCard'

interface MovieGridProps {
  movies: Movie[]
}

function MovieGrid({ movies }: MovieGridProps) {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  )
}

export default MovieGrid
