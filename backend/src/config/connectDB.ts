import { connect } from "mongoose"
process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""


const connectDb = async () => {
  try {
    await connect(URI_DB)
    console.log("☑️Conexcion a mongoDB fue exitosa")
  } catch (error) {
    console.log("❌ Error al conectarse a mongoDB")
  }
}

export { connectDb }