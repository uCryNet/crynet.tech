// Types
import { Request, Response } from "express";

// Components
import PostService from '../services/post'
import FileService from '../services/file'

// Variables
import UserService from "../services/login";

// Utils
import { decryptedData } from "../utils"


const checkLengthArticle = (res: Response, title: string, text: string) => {
  if (title.length < 3 || title.length > 100) return res.status(400).json({ message: "Check the length title" })
  if (text.length < 10 || text.length > 5000) return res.status(400).json({ message: "Check the length text" })
}


const stringValidate = (string: string) => {
  return string
    ? string.replace(/[.*+?^$<>{}()|[\]\\]/g, "\\$&")
    : ''
}

class PostController {
  async getOne(req: Request, res: Response) {
    try {
      if (!req.params.id) return res.status(400).json({ message: "Post not found" })

      const posts = await PostService.getOne(req.params.id)
      return res.json(posts)
    } catch (e) {
      return res.status(400).json({ message: "Failed to get the post", e })
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { search, category } = req.body

      const searchValid = stringValidate(search)
      const categoryValid = stringValidate(category)

      const posts = await PostService.get(searchValid, categoryValid)
      return res.json(posts)
    } catch (e) {
      return res.status(400).json({ message: "Error in receiving the post", e })
    }
  }

  async create(req: Request, res: Response) {
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

      return res.send('OK')
    } catch (e) {
      return res.status(400).json({ message: "Post create failed", e })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req?.params.id
      const token = req.cookies.token
      const { role } = decryptedData(token)

      if (!id) return res.status(400).json({ message: "Post not found" })
      if (!token) return res.status(400).json({ message: "User is not authorized" })
      if (role !== "admin") return res.status(400).json({ message: "No access" })

      // TODO: добавить возможность удалить картинку. Для начала хотя бы только из шапки
      await PostService.delete(id)

      return res.send('OK')
    } catch (e) {
      return res.status(400).json({ message: "Post delete failed", e })
    }
  }

  async update(req: Request, res: Response) {
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

      // TODO: добавить обновление картинки
      // const imageName = req.files ? await FileService.saveImage(req.files.image) : ""
      const { name } = await UserService.getUser(userId, "id")

      await PostService.update({ title, text, category, author: name, id: postId })

      return res.send('OK')
    } catch (e) {
      return res.status(400).json({ message: "Post update failed", e })
    }
  }
}

export default new PostController();