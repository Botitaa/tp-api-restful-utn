import { Types } from "mongoose"
import { Book } from "../models/bookModel"
import { Request, Response } from "express"

const getAllBooks = async (req: Request, res: Response): Promise<any> => {
  try {
    const books = await Book.find()
    res.json({
      succes: true,
      message: "obteniendo los libros",
      data: books
    })

  } catch (error) {
    const err = error as Error
    res.status(404).json({
      succes: false,
      message: err.message
    })
  }
}

const getBookId = async (req: Request, res: Response): Promise<any> => {
  try {

    const { id } = req.params;

    // Validar si el id es un ObjectId válido
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "ID inválido",
      });
      return;
    }

    const booksId = await Book.findById(id)

    if (booksId) {
      res.status(200).json({
        succes: true,
        message: "libro encontrado correctamente",
        data: booksId
      })
    } else {
      res.status(404).json({
        succes: false,
        message: "libro no encontrado"
      })
    }
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      succes: false,
      message: err.message
    })
  }
}

const addBook = async (req: Request, res: Response): Promise<any> => {
  try {

    const body = req.body
    const newBook = new Book(body)
    await newBook.save()


  } catch (error) {
    const err = error as Error
    res.status(500).json({
      succes: false,
      message: err.message
    })
  }
}

const deleteBook = async (req: Request, res: Response): Promise<any> => {
  try {

    const { id } = req.params;

    // Validar si el id es un ObjectId válido
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "ID inválido",
      });
      return;
    }

    const booksId = await Book.findById(id)

    if (booksId) {

      await booksId.deleteOne()

      res.status(200).json({
        succes: true,
        message: "libro eliminado correctamente",
        data: booksId
      })
    } else {
      res.status(404).json({
        succes: false,
        message: "libro no encontrado"
      })
    }
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      succes: false,
      message: err.message
    })
  }
}

export { getAllBooks, getBookId, addBook, deleteBook }