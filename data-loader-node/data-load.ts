
import { ChromaClient } from "chromadb";
import csv from 'csv-parser'
import fs from 'node:fs'

const chromaClient = new ChromaClient();
const collection = await  chromaClient.getOrCreateCollection({ name: 'movies' })

type Document = {
  title: string
  tags: string
  synopsis: string
}

const ids: string[] = []
const documents: string[] = []
const metadatas: Document[] = []

fs.createReadStream('mpst_full_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    const document: Document = {
      title: row.title,
      tags: row.tags,
      synopsis: row.plot_synopsis
    }

    ids.push(row.imdb_id)
    documents.push(JSON.stringify(document))
    metadatas.push(document)
  })
  .on('end', async () => {
    let startIdx = 0

    while (startIdx < ids.length) {
      const endIdx = startIdx + 100
      console.log(`Start: ${startIdx}, End: ${endIdx}`)

      await collection.add({
        ids: ids.slice(startIdx, endIdx),
        documents: documents.slice(startIdx, endIdx),
        metadatas: metadatas.slice(startIdx, endIdx)
      })

      startIdx = endIdx
    }

    console.log('Done!')
  })