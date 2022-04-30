// Vendors
import Router from 'express'

// Components
import PostController from "../controller/post";
import UserController from "../controller/login";
import FileController from "../controller/file";
import CategoryController from "../controller/category";

const router = new Router()


// post
router.post("/post/get-all", PostController.get)
router.get("/post/get-one/:id", PostController.getOne)
router.post("/post/create", PostController.create)
router.put("/post/update", PostController.update)
router.delete("/post/delete/:id", PostController.delete)
// user
router.post("/user/login", UserController.login)
router.post("/user/registration", UserController.registration)
router.get("/user/check-access", UserController.checkAccess)

// file
router.get("/static/*", FileController.get)
router.post("/file/upload", FileController.upload)

// category
router.get("/category/get-all", CategoryController.getAll)

// TODO: обработку или редирект для несуществующих страниц
// router.all((req, res) => {
//   res
//     .status(404)
//     .end("Нет такой страницы")
// })


module.exports = router;