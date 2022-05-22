// Vendors
import Router from 'express'

// Components
import PostController from "../controller/post";
import UserController from "../controller/login";
import FileController from "../controller/file";
import CategoryController from "../controller/category";


const router = Router()


// post
router.post("/api/post/get-all", PostController.get)
router.get("/api/post/get-one/:id", PostController.getOne)
router.post("/api/post/create", PostController.create)
router.put("/api/post/update", PostController.update)
router.delete("/api/post/delete/:id", PostController.delete)
// user
router.post("/api/user/login", UserController.login)
router.get("/api/user/check-access", UserController.checkAccess)

/**
 * Registration is fully functional. I'll leave it for better times
 * router.post("/api/user/registration", UserController.registration)
 */

// file
router.get("/static/*", FileController.get) // only for local develop. Prod works for Nginx
router.post("/api/file/upload", FileController.upload)

// category
router.get("/api/category/get-all", CategoryController.getAll)

module.exports = router;