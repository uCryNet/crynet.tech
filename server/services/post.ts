// Vendors
import {mongo} from "mongoose";

// Components
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
    const updatedPost = Post.findByIdAndUpdate({_id: data.id}, data, {new: true})
    return updatedPost
  }

  async filter(search) {
    const posts = await Post.find({}).select({ "title": "статьи","text": "статьи"});
    console.log(posts)
    return posts
  }
}

export default new PostService()