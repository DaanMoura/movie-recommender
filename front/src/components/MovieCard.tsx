import { useState, useRef, useEffect } from 'react';
import type { Movie } from '../types';
import './MovieCard.css';

const MovieTag = ({ tag }: { tag: string }) => {
  return <span className="movie-tag">{tag}</span>;
};

const MovieCard = ({ title, tags, synopsis, id, distance = 0 }: Movie) => {
  const apiKey = import.meta.env.VITE_OMBD_API_KEY;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const synopsisRef = useRef<HTMLParagraphElement>(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const element = synopsisRef.current;
    if (element) {
      // Check if the text is overflowing
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, []);

  return (
    <div className="movie-card">

      <div className="movie-poster">
        <img src={`https://img.omdbapi.com/?apikey=${apiKey}&i=${id}`} alt={title} />
      </div>
      <div className="movie-content">
        <div className="progress-container">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${(distance || 0) * 100}%` }} />
          </div>
          <span className="progress-percentage">{`${Math.round((distance || 0) * 100)}%`}</span>
        </div>
        <a href={`https://www.imdb.com/title/${id}`} target="_blank" rel="noopener noreferrer">
          <h2>{title}</h2>
        </a>
        <div className="movie-tags">
          {tags.map((tag) => (
            <MovieTag key={`${tag}`} tag={tag} />
          ))}
        </div>
        <div className="synopsis-container">
          <p
            ref={synopsisRef}
            className={`synopsis ${isExpanded ? 'expanded' : ''}`}
          >
            {synopsis}
          </p>
          {isOverflowing && (
            <button type="button" onClick={toggleExpand} className="expand-button">
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
