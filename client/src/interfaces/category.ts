export interface ICategory {
  _id: string
  subCategory: Array<{ name: string }>
  title: string
}