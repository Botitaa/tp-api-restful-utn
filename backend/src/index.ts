import express from "express"
import { bookRouter } from "./routes/bookRouter"
import { connectDb } from "./config/connectDB"

const PORT = process.env.PORT || 3000

const app = express()

app.use(bookRouter)

app.listen(PORT, () => {
  console.log(`☑️ HTTP conectando correctamente a travez del puerto: ${PORT}`)
  connectDb()
})