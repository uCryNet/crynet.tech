export interface IArticle {
  _id: string
  title: string
  text: string
  author: string
  image: string
}

export interface IGetPosts {
  text: string
  category: string
}
