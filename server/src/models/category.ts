// Vendors
import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
  title: { type: String },
  subCategories: [
    {
      name: { type: String },
      value: { type: String }
    }
  ]
})

export default mongoose.model("Categories", categorySchema)