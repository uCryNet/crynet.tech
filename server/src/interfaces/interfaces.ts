export interface IPostSchema {
  author: string
  title: string
  text: string
  date: string
  category: string
  image: string
}

export interface IUserSchema {
  login: string
  password: string
  mail: string
  name: string
  avatar: string
  role: string
}