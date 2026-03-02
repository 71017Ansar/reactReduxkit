import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import MovieGrid from './components/MovieGrid'
import Navbar from './components/Navbar'
import { fetchMovies } from './features/movies/moviesSlice'

function App() {
  const dispatch = useAppDispatch()
  const movies = useAppSelector((state) => state.movies.items)
  const status = useAppSelector((state) => state.movies.status)
  const error = useAppSelector((state) => state.movies.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies())
    }
  }, [dispatch, status])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        {status === 'loading' && (
          <p className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
            Loading movies...
          </p>
        )}

        {status === 'failed' && (
          <p className="mx-auto max-w-7xl px-4 py-8 text-sm text-red-600 sm:px-6 lg:px-8">
            {error}
          </p>
        )}

        {status === 'succeeded' && <MovieGrid movies={movies} />}
      </main>
    </div>
  )
}

export default App
