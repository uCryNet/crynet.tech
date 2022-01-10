// Vendors
import Router from 'express'

// Components
import PostController from "../controller/post";
import UserController from "../controller/login";
import FileController from "../controller/file";

const router = new Router()


// post
router.get("/post/get-all", PostController.getAll)
router.get("/post/get-one/:id", PostController.getOne)
router.post("/post/create", PostController.create)
router.put("/post/update", PostController.update)
router.delete("/post/delete/:id", PostController.delete)
router.get("/post/filter", PostController.filter)

// user
router.post("/user/login", UserController.login)
router.post("/user/registration", UserController.registration)

// file
router.get("/static/*", FileController.get)


module.exports = router;