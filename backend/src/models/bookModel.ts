import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/bookInterface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishedYear: { type: Number },
    genre: { type: String },
    available: { type: Boolean, default: true },
  }, {
  versionKey: false
}
);

const Book = model<IBook>("Book", bookSchema);

export { Book }