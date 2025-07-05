import { Router } from "express"
import { addBook, deleteBook, getAllBooks, getBookId, updateBook } from "../controllers/bookController"

const bookRouter = Router()

bookRouter.get("/", getAllBooks)
bookRouter.get("/:id", getBookId)
bookRouter.post("/", addBook)
bookRouter.patch("/:id", updateBook)
bookRouter.delete("/:id", deleteBook)

export { bookRouter }