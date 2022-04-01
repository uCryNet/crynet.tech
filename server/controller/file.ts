// Vendors
import * as fs from "fs";
import path from "path";

// Utils
import { checkForPicture } from "../utils";

// Vars
import { STATIC_FOLDER_NAME } from "../config/config";
import FileService from "../services/file";


class FileController {
  async get(req, res) {
    try {
      const fullPath = req.url.substring(1)
      const filePathSplit = fullPath.split("/", 3)
      filePathSplit.shift()
      const filePath = filePathSplit.join("/")
      const baseName = path.basename(fullPath)


      fs.readFile(path.join(STATIC_FOLDER_NAME, filePath, baseName), (err, image) => {
        if (checkForPicture(image)) {
          const fileType = path.extname(req.url).substring(1)

          // TODO: добавить либу для получения MIME-type файла или написать функционал самому

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

      const imageName = file && await FileService.saveImage(file)

      console.log(imageName)
    } catch (e) {
      return res.status(400).json({ message: "File upload error", e })
    }
  }
}

export default new FileController()