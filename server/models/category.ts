// Vendors
import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
  title       :   {type : String},
  subCategories:  [
    {
      name: { type: String, required: true, trim: true}
    }
  ]
})

export default mongoose.model("Category", categorySchema)