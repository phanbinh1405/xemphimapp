export interface PeopleSearchResult {
  adult: boolean
  gender: number
  id: number
  known_for: KnownFor[]
  known_for_department: string
  name: string
  popularity: number
  profile_path?: string
  poster_path?: string
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
  overview?: string
}

export interface KnownFor {
  adult?: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  media_type: string
  original_language: string
  original_title?: string
  overview: string
  poster_path?: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
  first_air_date?: string
  name?: string
  origin_country?: string[]
  original_name?: string
}
