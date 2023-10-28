// Types
import { IPostCreate, IPostUpdate } from "../interfaces/interfaces";

// Components
import Post from '../models/post'


class PostService {
  async get(search: string, category: string, page: number, limit: number) {
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

    const totalCount = await Post.countDocuments(conditions)
    const data = await Post
      .find(conditions)
      .sort({ _id: 'desc' })
      .limit(limit)
      .skip((page - 1) * limit)

    const total_pages = !!limit
      ? Math.ceil(totalCount / limit)
      : page

    return {
      data,
      meta: {
        total_pages
      }
    }
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