import { Types } from "mongoose"
import { Book } from "../models/bookModel"
import { Request, Response } from "express"

const getAllBooks = async (req: Request, res: Response): Promise<any> => {
  try {
    const books = await Book.find()
    res.json({
      success: true,
      message: "obteniendo los libros",
      data: books
    })

  } catch (error) {
    const err = error as Error
    res.status(404).json({
      success: false,
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
        success: true,
        message: "libro encontrado correctamente",
        data: booksId
      })
    } else {
      res.status(404).json({
        success: false,
        message: "libro no encontrado"
      })
    }
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const addBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const newBookData = req.body
    const newBook = new Book(newBookData)
    await newBook.save()

    res.status(200).json({
      success: true,
      message: "libro agregado correctamente",
      data: newBook
    })


  } catch (error) {
    const err = error as Error
    console.log(err)
    res.status(500).json({
      success: false,
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

    const booksId = await Book.findByIdAndDelete(id)

    if (booksId) {
      res.status(200).json({
        success: true,
        message: "libro eliminado correctamente",
        data: booksId
      })
    } else {
      res.status(404).json({
        success: false,
        message: "libro no encontrado"
      })
    }
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const updateBook = async (req: Request, res: Response): Promise<any> => {
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

    const updateData = req.body
    const updateBook = await Book.findByIdAndUpdate(id, updateData)

    const newUpdatedBook = await Book.findById(id)

    if (updateBook) {
      res.status(200).json({
        success: true,
        message: "libro actualizado correctamente, Datos antiguos:", updateBook,
        data: "Datos nuevos", newUpdatedBook
      })
    } else {
      res.status(404).json({
        success: false,
        message: "libro no encontrado"
      })
    }
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export { getAllBooks, getBookId, addBook, deleteBook, updateBook }