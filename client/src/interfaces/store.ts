// Types
import { IArticle } from "@/interfaces/article";
import { ICategory } from "@/interfaces/category";


export interface IFiltersStore {
  search?: string
  category?: string
  page: number
  limit: number
}

export interface IPostStore {
  posts: IArticle[]
  filters: IFiltersStore
  meta: {
    total_pages: number
  },
  isPending: boolean
}

export interface ICategoryStore {
  category: ICategory[]
}