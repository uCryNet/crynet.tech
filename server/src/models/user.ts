// Vendors
import mongoose from "mongoose";

// Types
import { IUserSchema } from "../interfaces/interfaces";


const userSchema = new mongoose.Schema<IUserSchema>({
  login: { type: String, required: true, unique: true, minlength: 3, maxLength: 20 },
  password: { type: String, required: true },
  mail: { type: String, required: true, minlength: 3, maxLength: 100 },
  name: { type: String, maxLength: 100 },
  avatar: { type: String },
  role: { type: String }
})

export default mongoose.model<IUserSchema>("User", userSchema)