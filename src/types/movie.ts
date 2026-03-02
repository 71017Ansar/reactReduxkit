export interface Movie {
  id: string
  title: string
  year: string
  rated: string
  released: string
  runtime: string
  genre: string
  director: string
  writer: string
  actors: string
  plot: string
  language: string
  country: string
  awards: string
  poster: string
  imdbRating: string
  imdbId: string
  boxOffice: string
}

export interface MoviesApiResponse {
  data: Movie[]
}
