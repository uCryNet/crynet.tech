export const DB_URL = `mongodb+srv://admin:admin@cluster0.8efnx.mongodb.net/blog?retryWrites=true&w=majority`

export const PORT = 5000
export const HOST = `localhost`
export const API_LINK = `api`

// TODO: прописать нормально опеременную ENV
export const ENV = process.env.NODE_ENV === "development"
  ? "http://localhost:8080"
  : "http://localhost:8080"
