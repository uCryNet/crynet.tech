export interface IArticle {
  _id: string
  title: string
  text: string
  author: string
  image: string
  date: string
  category: string
}

export interface IEvent<T = EventTarget> {
  target: T;
}

export interface ICategory {
  _id: string
  subCategory: {
    name: string
  }[]
  title: string
}