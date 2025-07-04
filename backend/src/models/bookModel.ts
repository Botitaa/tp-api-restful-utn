import { model, Schema } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  available: boolean;
}

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