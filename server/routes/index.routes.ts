// Vendors
import Router from 'express'

// Component
import PostController from "../controller/post";
import UserController from "../controller/login";
import FileController from "../controller/file";

const router = new Router()


// post model
router.get("/post/get-all", PostController.getAll)
router.get("/post/get-one/:id", PostController.getOne)
router.post("/post/create", PostController.create)
router.put("/post/update", PostController.update)
router.delete("/post/delete/:id", PostController.delete)

// user model
router.post("/user/login", UserController.login)
router.post("/user/registration", UserController.registration)

// file
router.get("/static/*", FileController.get)


module.exports = router;