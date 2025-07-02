import type { Collection } from "chromadb";
import type { CollectionName, Movie } from "../types";
import { useQuery } from "@tanstack/react-query";
import { GoogleGenAI } from "@google/genai";

interface Props {
  collection: Collection | undefined
  queryText: string
  enabled: boolean
}

const queryWithGeminiEmbedding = async (collection: Collection, queryText: string) => {
  const genai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY })
  const response = await genai.models.embedContent({
    model: 'models/text-embedding-004',
    contents: queryText,
    config: { 'taskType': 'retrieval_document' }
  })

  const queryEmbeddings = response.embeddings?.[0].values ?? []

  return collection?.query({ queryEmbeddings: [queryEmbeddings] })
}

const queryWithDefaultEmbedding = async (collection: Collection, queryText: string) => {
  return await collection?.query({ queryTexts: [queryText] }) 
}

const queriesByCollectionName = {
  'movies_gemini': queryWithGeminiEmbedding,
  'movies': queryWithDefaultEmbedding
}

const getQueryByCollectionName = (collectionName: CollectionName) => {
  return queriesByCollectionName[collectionName] ?? queryWithDefaultEmbedding
}


const useMoviesSearch = ({ collection, queryText, enabled }: Props) => {

  const { data: movies, isPending: isLoadingQuery } = useQuery({
    queryKey: ['movies', collection?.name, queryText],
    queryFn: async () => { 
      if (!collection) return []

      // const result = await queryWithDefaultEmbedding(collection, queryInput)
      const result = await getQueryByCollectionName(collection.name as CollectionName)(collection, queryText)

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

      return movies
    },
    enabled
  })

  return {
    movies: movies ?? [],
    isLoadingQuery: enabled ? isLoadingQuery : false
  }
}

export default useMoviesSearch


