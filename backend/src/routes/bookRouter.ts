import { Router } from "express"
import { getAllBooks, getBookId } from "../controllers/bookController"

const bookRouter = Router()

bookRouter.get("/", getAllBooks)
bookRouter.get("/:id", getBookId)

export { bookRouter }