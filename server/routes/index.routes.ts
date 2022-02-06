// Vendors
import Router from 'express'

// Components
import PostController from "../controller/post";
import UserController from "../controller/login";
import FileController from "../controller/file";
import CategoryController from "../controller/category";

const router = new Router()


// post
router.get("/post/get-all", PostController.getAll)
router.get("/post/get-one/:id", PostController.getOne)
router.post("/post/create", PostController.create)
router.put("/post/update", PostController.update)
router.delete("/post/delete/:id", PostController.delete)
router.post("/post/search", PostController.search)

// user
router.post("/user/login", UserController.login)
router.post("/user/registration", UserController.registration)
router.get("/user/check-access", UserController.checkAccess)

// file
router.get("/static/*", FileController.get)

// category
router.get("/category/get-all", CategoryController.getAll)


module.exports = router;