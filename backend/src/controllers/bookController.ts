import { Book } from "../models/bookModel"
import { Request, Response } from "express"

const getBooks = async (req: Request, res: Response): Promise<any> => {
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
}

export { getBooks }