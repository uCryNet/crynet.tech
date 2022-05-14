// Components
import Categories from "../models/category";


class CategoryService {
  async getAll() {
    const category = await Categories.find()
    return category
  }
}

export default new CategoryService()