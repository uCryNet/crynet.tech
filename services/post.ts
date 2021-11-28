// Vendors
import {mongo} from "mongoose";

// Component
import Post from '../models/post'


class PostService {
  async getAll() {
    const post = await Post.find()
    return post
  }

  async create(data) {
    const newArticles = new Post(data)
    await newArticles.save()
    return newArticles
  }

  async getOne(id) {
    const post = await Post.findOne({_id: new mongo.ObjectID(id)})
    return post
  }

  async delete(id) {
    Post.findByIdAndDelete(id)
  }

  async update(data) {
    await Post.findByIdAndUpdate(data._id, data, {new: true})
  }
}

export default new PostService()