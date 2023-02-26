export interface Board {
    id: number
    title: string
    writedDate: string
    user_id: number
    name: string
}

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

export interface User {
    id: number
    user_id: string
    name: string
    gender: number
    email: string
    registeredDate: string

    count?: number
}