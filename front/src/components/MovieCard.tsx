import type { Movie } from '../types'
import './MovieCard.css'

const MovieTag = ({ tag }: { tag: string }) => {
  return (
    <span className="movie-tag">{tag}</span>
  )
}


const MovieCard = ({ title, tags, synopsis }: Movie) => {
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-tags">
        {/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
        {tags.map((tag, idx) => <MovieTag key={tag+idx} tag={tag} />)}
      </div>
      <p>{synopsis}</p>
    </div>
  )
}

export default MovieCard
