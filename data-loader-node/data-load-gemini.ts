
import { ChromaClient } from "chromadb";
import csv from 'csv-parser'
import fs from 'node:fs'
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'

console.log(`API Key: ${process.env.GOOGLE_API_KEY}`)

const genai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY ?? ''
})

const chromaClient = new ChromaClient();
const collection = await  chromaClient.getOrCreateCollection({ name: 'movies_gemini' })

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

      console.log(`Embeddings documents (${startIdx}/${endIdx})`)

      const documentsToEmbed = documents.slice(startIdx, endIdx)

      const response = await genai.models.embedContent({
        model: 'models/text-embedding-004',
        contents: documentsToEmbed,
        config : { 'taskType': 'retrieval_document' }
      })

      console.log(`Adding documents (${startIdx}/${endIdx})`)

      await collection.add({
        ids: ids.slice(startIdx, endIdx),
        embeddings: response.embeddings?.map(e => e.values ?? []) ?? [],
        metadatas: metadatas.slice(startIdx, endIdx)
      })

      startIdx = endIdx
    }

    console.log('Done!')
  })