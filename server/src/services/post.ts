// Types
import { IPostCreate, IPostUpdate } from "../interfaces/interfaces";

// Components
import Post from '../models/post'


class PostService {
  async get(search = "", category = "") {
    const conditions: Record<string, Object> = {};

    if (category) {
      conditions.category = new RegExp(category, 'i');
    }
    if (search) {
      const regex = new RegExp(search, 'i');
      conditions.$or = [
        { title: regex },
        { text: regex },
      ];
    }
    return await Post.find(conditions).sort({ _id: 'desc' });
  }

  async create(data: IPostCreate) {
    const newArticles = new Post(data)
    await newArticles.save()
    return newArticles
  }

  async getOne(id: string) {
    const post = await Post.findOne({ _id: id })
    return post
  }

  async delete(id: string) {
    const post = await Post.findByIdAndDelete({ _id: id })
    return post
  }

  async update(data: IPostUpdate) {
    const updatedPost = Post.findByIdAndUpdate({ _id: data.id }, data, { new: true })
    return updatedPost
  }
}

export default new PostService()