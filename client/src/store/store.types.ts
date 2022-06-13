// Types
import { IArticle, ICategory } from "@/interfaces/interfaces";


// post START
export interface IFiltersStore {
  search: string,
  category: string
}

export interface IPostStore {
  posts: IArticle[]
  filters: IFiltersStore
  isPending: boolean
}
// post END

// category START
export interface ICategoryStore {
  category: ICategory[]
}
// category END