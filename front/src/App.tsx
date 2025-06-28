import './App.css'
import MovieCard from './components/MovieCard'

import type { Movie } from './types'

const mockMovies: Movie[] = [
  {
    title: "The Last Horizon",
    tags: ["sci-fi", "adventure", "space"],
    synopsis: "A crew of astronauts embarks on a mission to find a new habitable planet as Earth faces an environmental collapse."
  },
  {
    title: "Midnight Heist",
    tags: ["thriller", "crime", "action"],
    synopsis: "A master thief plans one final score, but when the job goes wrong, he must outsmart both the police and his treacherous crew."
  },
  {
    title: "Whispers in the Dark",
    tags: ["horror", "supernatural", "mystery"],
    synopsis: "A journalist investigates a series of disappearances in a small town, only to uncover a terrifying secret lurking in the woods."
  },
  {
    title: "The Art of Letting Go",
    tags: ["drama", "romance", "emotional"],
    synopsis: "A heartwarming story about love, loss, and the journey of self-discovery after a life-changing event."
  },
  {
    title: "Neon Dreams",
    tags: ["cyberpunk", "action", "sci-fi"],
    synopsis: "In a dystopian future, a hacker uncovers a conspiracy that could change the balance of power in a city ruled by megacorporations."
  },
  {
    title: "The Last Laugh",
    tags: ["comedy", "drama", "heartwarming"],
    synopsis: "A retired comedian comes out of retirement for one final show, reconnecting with estranged family members along the way."
  },
  {
    title: "Frozen Memories",
    tags: ["drama", "mystery", "psychological"],
    synopsis: "A woman wakes up with no memory of the past year and must piece together the events that led to her condition."
  },
  {
    title: "Racing Hearts",
    tags: ["sports", "romance", "drama"],
    synopsis: "An underdog race car driver gets a second chance at love and the championship with the help of an unlikely mechanic."
  },
  {
    title: "The Forgotten Kingdom",
    tags: ["fantasy", "adventure", "epic"],
    synopsis: "A young prince must reclaim his stolen kingdom with the help of a band of unlikely allies in a world of magic and ancient prophecies."
  },
  {
    title: "Silent Echo",
    tags: ["thriller", "mystery", "psychological"],
    synopsis: "A detective with a troubled past investigates a series of murders that seem to be connected to a cold case from his early career."
  }
]

function App() {

  return (
    <>
      <h1>Movie Recommender</h1>
      <div className="content">

      <div className="search-container">
        <textarea />
        <button type="button">Search</button>
      </div>
      <div className="movies-container">
        {mockMovies.map((movie) => <MovieCard key={movie.title} {...movie} />)}
      </div>
      </div>
    </>
  )
}

export default App
