export interface DetailMovie {
  adult: boolean
  backdropPath: string
  belongsToCollection: BelongsToCollection
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdbId: string
  originalLanguage: string
  originalTitle: string
  overview: string
  popularity: number
  posterPath: string
  productionCompanies: ProductionCompany[]
  productionCountries: ProductionCountry[]
  releaseDate: string
  revenue: number
  runtime: number
  spokenLanguages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  voteAverage: number
  voteCount: number
  name?: string
}

export interface BelongsToCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}