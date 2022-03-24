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
    const post = await Post.findOne({_id: id})
    return post
  }

  async delete(id) {
    const post = await Post.findByIdAndDelete({_id: id})
    return post
  }

  async update(data) {
    const updatedPost = Post.findByIdAndUpdate({_id: data.id}, data, {new: true})
    return updatedPost
  }

  async search(search, category) {
    const posts = await Post.find({
      $or:[
        {title: new RegExp(search, 'ig')},
        {text: new RegExp(search, 'ig')},
        // {category: new RegExp(category, 'ig')}
      ]
    })
    return posts
  }
}

export default new PostService()