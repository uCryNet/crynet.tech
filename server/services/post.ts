// Components
import Post from '../models/post'


class PostService {
  async get(search = "", category = "") {
    let posts

    // TODO: переписать нормально

    if (search && category) {
      posts = await Post.find({
        category: new RegExp(category, 'ig'),
        $or:[
          {title: new RegExp(search, 'ig')},
          {text: new RegExp(search, 'ig')},
        ]
      })
    } else if (search) {
      posts = await Post.find({
        $or:[
          {title: new RegExp(search, 'ig')},
          {text: new RegExp(search, 'ig')}
        ]
      })
    } else if (category) {
      posts = await Post.find({
        $or:[
          {category: new RegExp(category, 'ig')}
        ]
      })
    } else {
      posts = await Post.find()
    }

    return posts
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
}

export default new PostService()