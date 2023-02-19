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
    poster_path?: string
    tagline?: string
    release_date?: string
    genres?: string
    country?: string
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