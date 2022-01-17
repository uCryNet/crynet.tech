export const PORT = 5000
export const DB_URL = `mongodb+srv://admin:admin@cluster0.8efnx.mongodb.net/blog?retryWrites=true&w=majority`
// прописать нормальн опеременную ENV
export const ENV = process.env.NODE_ENV === "development"
  ? "http://localhost:8080"
  : "http://localhost:8080"
