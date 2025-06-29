import { useEffect, useState } from 'react'
import { getChromaCollection } from '../functions/chroma'
import type { Collection } from 'chromadb'
import MovieCard from './MovieCard'

import type { Movie } from '../types'
import { useMutation } from '@tanstack/react-query'

const MovieRecommender = () => {
  const [queryInput, setQueryInput] = useState('')

  const [chromaCollection, setChromaCollection] = useState<Collection | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])
  const [searched, setSearched] = useState(false)

  const { mutate: loadChromaCollection, isPending: isLoadingChromaCollection } = useMutation({
    mutationFn: async () => {
      const collection = await getChromaCollection()
      setChromaCollection(collection)
    }
  })

  useEffect(() => {
    loadChromaCollection()
  }, [loadChromaCollection])

  const { mutate: searchMovies, isPending: isLoadingQuery } = useMutation({
    mutationFn: async () => {
      const result = await chromaCollection?.query({ queryTexts: [queryInput] })
      const movies: Movie[] = []

      if (!result) return movies

      const distances = result.distances[0].map(d => ((1 - (d ?? 0)) + 1)/ 2)

      for (let i = 0; i < result?.ids[0].length ; i++) {
        movies.push({
          id: result.ids[0][i],
          distance: distances[i],
          title: result.metadatas?.[0]?.[i]?.title as string ?? '',
          tags: (result.metadatas?.[0]?.[i]?.tags as string).split(',') ?? [],
          synopsis: result.metadatas?.[0]?.[i]?.synopsis as string ?? ''
        })
      }
      setMovies(movies)
      setSearched(true)
    }
  })

  return (
    <>
      <h1>Movie Recommender</h1>
      <div className="content">

      <div className="search-container">
        <textarea value={queryInput} onChange={(e) => setQueryInput(e.target.value)}/>
        <button disabled={isLoadingQuery || isLoadingChromaCollection || queryInput.length === 0} type="button" onClick={() => searchMovies()}>Search</button>
      </div>
      <div className="movies-container">
        {isLoadingChromaCollection && <p>Loading collection...</p>}
        {isLoadingQuery && <p>Searching...</p>}
        {movies.length === 0 && !isLoadingChromaCollection && !isLoadingQuery && !searched && <p>Search for a movie</p>}
        {movies.length === 0 && !isLoadingChromaCollection && !isLoadingQuery && searched && <p>No movies found</p>}
        {movies.map((movie) => <MovieCard key={movie.title} {...movie} />)}
      </div>
      </div>
    </>
  )
}

export default MovieRecommender
