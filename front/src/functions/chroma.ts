import { ChromaClient } from "chromadb"

export const getChromaCollection = async (collectionName: string) => {
  const chromaClient = new ChromaClient()
  const collection = await chromaClient.getOrCreateCollection({ name: collectionName })

  return collection
}