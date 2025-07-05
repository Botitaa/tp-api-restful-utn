import { Router } from "express"
import { addBook, getAllBooks, getBookId } from "../controllers/bookController"

const bookRouter = Router()

bookRouter.get("/", getAllBooks)
bookRouter.get("/:id", getBookId)
bookRouter.post("/", addBook)

export { bookRouter }