// Vendors
import mongoose from "mongoose";

// Types
import { IPostSchema } from "../interfaces/interfaces";


const postSchema = new mongoose.Schema<IPostSchema>({
  author: { type: String, required: true, minlength: 3, maxLength: 20 },
  title: { type: String, required: true, minlength: 3, maxLength: 100 },
  text: { type: String, required: true, minlength: 10, maxLength: 5000 },
  date: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
})

export default mongoose.model<IPostSchema>("Post", postSchema)