export type Movie = {
  id: string
  distance: number | null
  title: string
  tags: string[]
  synopsis: string
}

export type CollectionName = 'movies' | 'movies_gemini'