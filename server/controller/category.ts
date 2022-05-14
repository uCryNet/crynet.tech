// Components
import CategoryService from "../services/category";


class CategoryController {
  async getAll(req, res) {
    try {
      const category = await CategoryService.getAll()
      return res.json(category)
    } catch (e) {
      return res.status(400).json({message: "Failed to get categories", e})
    }
  }
}

export default new CategoryController();