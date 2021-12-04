// Vendors
import jwt from "jsonwebtoken"

// Component
import PostService from '../services/post'

// Var
import {SECRET_KEY} from "../config/config";
import UserService from "../services/login";

const checkLengthArticle = (res, title, description, text) => {
  if (title.length < 3 || title.length > 100) return res.status(400).json({message: "Check the length title"})
  if (description.length < 10 || description.length > 200) return res.status(400).json({message: "Check the length description"})
  if (text.length < 10 || text.length > 5000) return res.status(400).json({message: "Check the length text"})
}


class PostController {
  async getOne(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({message: "Post not found"})

      const posts = await PostService.getOne(req.params.id)

      res.json(posts)
    } catch (e) {
      res.status(400).json({message: "Failed to get the post", e})
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll()
      return res.json(posts)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.status(400).json({message: "Post create error"})

      const {token, title, description, text, image} = req.body
      const {role, id: _id} = jwt.verify(token, SECRET_KEY)

      if (!token) return res.status(400).json({message: "User is not authorized"})
      if (role !== "admin") return res.status(400).json({message: "No access"})
      if (!title || !description || !text) return res.status(400).json({message: "Fill in the required fields"})

      checkLengthArticle(res, title, description, text)

      const {name} = await UserService.getUser(_id, "id")
      await PostService.create({title, description, text, author: name})

      res.json({message: "Post create"})
    } catch (e) {
      res.status(400).json({message: "Post create failed", e})
    }
  }

  async delete(req, res) {
    try {
      const token = req?.body.token
      const id = req?.params.id
      const {role} = jwt.verify(token, SECRET_KEY)

      if (!id) return res.status(400).json({message: "Post not found"})
      if (!token) return res.status(400).json({message: "User is not authorized"})
      if (role !== "admin") return res.status(400).json({message: "No access"})

      await PostService.delete(id)

      res.json({message: "Post deleted"})
    } catch (e) {
      res.status(400).json({message: "Post delete failed", e})
    }
  }

  async update(req, res) {
    try {
      if (!req.body) return res.status(400).json({message: "Post update error"})
      const {token, title, description, text, id: postId, image} = req.body
      const {role, id: userId} = jwt.verify(token, SECRET_KEY)

      if (!token) return res.status(400).json({message: "User is not authorized"})
      if (role !== "admin" || !userId) return res.status(400).json({message: "No access"})
      if (!title || !description || !text || !postId) return res.status(400).json({message: "Fill in the required fields"})

      checkLengthArticle(res, title, description, text)

      const getCurrentPost = await PostService.getOne(postId)
      if (!getCurrentPost._id) return res.status(400).json({message: "Post not found"})

      const {name} = await UserService.getUser(userId, "id")
      const updatedPost = await PostService.update({title, description, text, author: name, id: postId})

      res.json({message: "Post updated", updatedPost})
    } catch (e) {
      res.status(400).json({message: "Post update failed", e})
    }
  }
}

export default new PostController();