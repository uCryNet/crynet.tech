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

export interface IPostCreate {
  title: string
  text: string
  author: string
  image: string
  date: string
  category: string
}

export interface IPostUpdate {
  id: string
  title: string
  text: string
  category: string
  author: string
  image?: string
}