// Vendors
import * as fs from "fs";
import path from "path";
import jwt from "jsonwebtoken"

// Utils
import { checkForPicture } from "../utils";

// Vars
import { SECRET_KEY, STATIC_FOLDER_NAME } from "../config/config";
import FileService from "../services/file";


class FileController {
  async get(req, res) {
    try {
      const fullPath = req.url.substring(1)
      const filePathSplit = fullPath.split("/", 3)
      filePathSplit.shift()
      const filePath = filePathSplit.join("/")
      const baseName = path.basename(fullPath)


      // TODO: заменить строку на эту path.resolve(__dirname, 'view', fileName)
      fs.readFile(path.join(STATIC_FOLDER_NAME, filePath, baseName), (err, image) => {
        if (checkForPicture(image)) {
          const fileType = path.extname(req.url).substring(1)

          // TODO: добавить либу для получения MIME-type файла или написать функционал самому

          // TODO: тут точно нужен setHeader и set?
          // TODO: заменить на res.sendFIle(createPath("ссылка на файл"))
          res
            .setHeader("Cross-Origin-Resource-Policy", "*")
            .set("Content-Type", `image/${ fileType }`)
            .end(image)
        } else {
          return res.status(404).json({ message: "File not found" })
        }
      });

    } catch (e) {
      return res.status(400).json({ message: "File found error", e })
    }
  }

  async upload(req, res) {
    try {
      const { file } = req.files

      const token = req.cookies.token
      const { role } = jwt.verify(token, SECRET_KEY)

      if (role !== "admin") return res.status(400).json({ message: "No access" })

      const imageName = file && await FileService.saveImage(file)

      res.json({ link: imageName })
    } catch (e) {
      return res.status(400).json({ message: "File upload error", e })
    }
  }
}

export default new FileController()