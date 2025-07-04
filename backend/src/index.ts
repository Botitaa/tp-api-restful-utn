import express from "express"
import { connect } from "mongoose"
import { Schema, model, Document } from 'mongoose';

process.loadEnvFile()

const PORT = process.env.PORT || 3000
const URI_DB = process.env.URI_DB || ""

const app = express()

const connectDb = async () => {
  try {
    await connect(URI_DB)
    console.log("☑️Conexcion a mongoDB fue exitosa")
  } catch (error) {
    console.log("❌ Error al conectarse a mongoDB")
  }
}

export interface IBook extends Document {
  title: string;
  author: string;
  publishedYear?: number;
  genre?: string;
  available: boolean;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    author: { type: String, required: true, trim: true },
    publishedYear: { type: Number },
    genre: { type: String, trim: true },
    available: { type: Boolean, default: true },
  }
);

const Book = model<IBook>("Book", bookSchema);

app.get("/api/books", async (req, res): Promise<any> => {
  try {

    const books = await Book.find()
    res.json({
      succes: true,
      data: books,
      message: "obteniendo los libros"
    })

  } catch (error) {
    const err = error as Error
    res.status(500).json({
      succes: false,
      message: err.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`☑️ HTTP conectando correctamente a travez del puerto: ${PORT}`)
  connectDb()
})