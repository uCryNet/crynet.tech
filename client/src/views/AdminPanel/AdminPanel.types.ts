export interface IUpdatePost {
  _id: string
  title: string
  category: string
  image: string | File
  text: string
}

export interface ICreatePost {
  title: string
  category: string
  image: string | File
  text: string
}