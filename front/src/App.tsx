import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import MovieRecommender from './components/MovieRecommender'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <MovieRecommender/>
    </QueryClientProvider>
  )
}

export default App
