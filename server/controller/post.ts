// Components
import PostService from '../services/post'
import FileService from '../services/file'

// Vars
import { SECRET_KEY } from "../config/config";
import UserService from "../services/login";

// Utils
import { decryptedData } from "../utils";


const checkLengthArticle = (res, title, text) => {
  if (title.length < 3 || title.length > 100) return res.status(400).json({ message: "Check the length title" })
  if (text.length < 10 || text.length > 5000) return res.status(400).json({ message: "Check the length text" })
}


const stringValidate = (string: string) => {
  return string
    ? string.replace(/[.*+?^$<>{}()|[\]\\]/g, "\\$&")
    : ''
}

class PostController {
  async getOne(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ message: "Post not found" })

      const posts = await PostService.getOne(req.params.id)

      res.json(posts)
    } catch (e) {
      res.status(400).json({ message: "Failed to get the post", e })
    }
  }

  async get(req, res) {
    try {
      const { search, category } = req.body

      const searchValid = stringValidate(search)
      const categoryValid = stringValidate(category)

      const posts = await PostService.get(searchValid, categoryValid)
      return res.json(posts)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.status(400).json({ message: "Post create error" })

      const { title, text, category } = req.body
      const token = req.cookies.token
      const { role, id: _id } = decryptedData(token)

      if (!token) return res.status(400).json({ message: "User is not authorized" })
      if (role !== "admin") return res.status(400).json({ message: "No access" })
      if (!title || !text || !category) return res.status(400).json({ message: "Fill in the required fields" })

      await checkLengthArticle(res, title, text)

      const { name } = await UserService.getUser(_id, "id")
      const imageName = req.files ? await FileService.saveImage(req.files.image) : ""
      const date = new Date().toLocaleDateString("ru-RU")

      await PostService.create({ title, text, author: name, image: imageName, date, category })
      res.json({ message: "Post create" })
    } catch (e) {
      res.status(400).json({ message: "Post create failed", e })
    }
  }

  async delete(req, res) {
    try {
      const id = req?.params.id
      const token = req.cookies.token
      const { role } = decryptedData(token)

      if (!id) return res.status(400).json({ message: "Post not found" })
      if (!token) return res.status(400).json({ message: "User is not authorized" })
      if (role !== "admin") return res.status(400).json({ message: "No access" })

      // TODO: добавить возможность удалить картинку. Для начала хотя бы только из шапки
      await PostService.delete(id)

      res.json({ message: "Post deleted" })
    } catch (e) {
      res.status(400).json({ message: "Post delete failed", e })
    }
  }

  async update(req, res) {
    try {
      if (!req.body) return res.status(400).json({ message: "Post update error" })
      const { title, text, category, id: postId } = req.body

      const token = req.cookies.token
      const { role, id: userId } = decryptedData(token)

      if (!token) return res.status(400).json({ message: "User is not authorized" })
      if (role !== "admin" || !userId) return res.status(400).json({ message: "No access" })
      if (!postId && !category) return res.status(400).json({ message: "Fill in the required fields" })
      await checkLengthArticle(res, title, text)

      const getCurrentPost = await PostService.getOne(postId)
      if (!getCurrentPost._id) return res.status(400).json({ message: "Post not found" })

      // const imageName = req.files ? await FileService.saveImage(req.files.image) : ""
      const { name } = await UserService.getUser(userId, "id")

      const updatedPost = await PostService.update({ title, text, category, author: name, id: postId })

      res.json({ message: "Post updated", updatedPost })
    } catch (e) {
      res.status(400).json({ message: "Post update failed", e })
    }
  }
}

export default new PostController();