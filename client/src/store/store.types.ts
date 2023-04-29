// Types
import { IArticle, ICategory } from "@/interfaces/interfaces";


export interface IFiltersStore {
  search?: string,
  category?: string
}

export interface IPostStore {
  posts: IArticle[]
  filters: IFiltersStore
  isPending: boolean
}

export interface ICategoryStore {
  category: ICategory[]
}