// Components
import Category from "../models/category";

class CategoryService {
  async getAll() {
    const category = await Category.find()
    console.log(category)
    return category
  }
}

export default new CategoryService()