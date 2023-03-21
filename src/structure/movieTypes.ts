export interface Movie {
    id: number
    title: string
    overview?: string
    posterPath?: string
    tagline?: string
    releaseDate?: string
    genres?: string
    country?: string
    runtime: number
}

export interface Review {
    id: number
    movieID: number
    reviewerID: number
    reviewer: string
    rating: number
    review: string
    writedDate: string
}