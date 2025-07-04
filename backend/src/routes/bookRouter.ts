import { Router } from "express"
import { getBooks } from "../controllers/bookController"

const bookRouter = Router()

bookRouter.get("/api/books", getBooks)

export { bookRouter }