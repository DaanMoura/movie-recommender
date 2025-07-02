import {  useCallback, useState } from 'react'
import MovieCard from './MovieCard'

import useCollection from '../hooks/useCollection'
import useMoviesSearch from '../hooks/useMoviesSearch'

const CHROMA_COLLECTION_NAME = 'movies_gemini'

const MovieRecommender = () => {
  const [queryInput, setQueryInput] = useState('')
  const [queryToSearch, setQueryToSearch] = useState('')


  const { collection , isInitializing } = useCollection(CHROMA_COLLECTION_NAME)

  const { movies, isLoadingQuery } = useMoviesSearch({ collection, queryText: queryToSearch, enabled: queryToSearch.length > 0 && !isInitializing })

  const onSearchClick = useCallback(() => {
    setQueryToSearch(queryInput)
  }, [queryInput])


  return (
    <>
      <h1>Movie Recommender</h1>
      <div className="content">

      <div className="search-container">
        <textarea value={queryInput} onChange={(e) => setQueryInput(e.target.value)}/>
        <button disabled={isLoadingQuery || isInitializing || queryInput.length === 0} type="button" onClick={onSearchClick}>Search</button>
      </div>
      <div className="movies-container">
        {isInitializing && <p>Loading collection...</p>}
        {isLoadingQuery && <p>Searching...</p>}
        {movies.length === 0 && !isInitializing && !isLoadingQuery && queryToSearch.length === 0 && <p>Search for a movie</p>}
        {movies.length === 0 && !isInitializing && !isLoadingQuery && queryToSearch.length > 0 && <p>No movies found</p>}
        {movies.map((movie) => <MovieCard key={movie.title} {...movie} />)}
      </div>
      </div>
    </>
  )
} 

export default MovieRecommender
