import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Movie, MoviesApiResponse } from '../../types/movie'

type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface MoviesState {
  items: Movie[]
  status: FetchStatus
  error: string | null
}

const initialState: MoviesState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await fetch('https://fooapi.com/api/movies')

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`)
  }

  const payload = (await response.json()) as MoviesApiResponse
  return payload.data
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to load movies'
      })
  },
})

export default moviesSlice.reducer
