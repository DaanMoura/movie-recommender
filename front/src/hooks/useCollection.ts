import { useQuery } from "@tanstack/react-query"
import { getChromaCollection } from "../functions/chroma"
import type { CollectionName } from "../types"

const useCollection = (collectionName: CollectionName) => {
  const { data: collection, isPending: isInitializing } = useQuery({
    queryKey: ['chroma-collection', collectionName],
    queryFn: async () => await getChromaCollection(collectionName)
  })

  return {
    collection,
    isInitializing
  }
}

export default useCollection
