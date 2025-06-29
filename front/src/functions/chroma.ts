import { ChromaClient } from "chromadb"

export const getChromaCollection = async () => {
  const chromaClient = new ChromaClient()
  const collection = await chromaClient.getOrCreateCollection({ name: 'movies' })

  return collection
}