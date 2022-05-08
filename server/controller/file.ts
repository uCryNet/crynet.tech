// Vendors
import * as fs from "fs";
import path from "path";

// Vars
import { STATIC_FOLDER_NAME } from "../config/config";
import FileService from "../services/file";

// Utils
import { imageСheck, decryptedData } from "../utils";
import { HOST, PORT } from "../config/setup";


class FileController {
  async get(req, res) {
    try {
      const fullPath = req.url.substring(1)
      const filePathSplit = fullPath.split("/", 3)
      filePathSplit.shift()
      const filePath = filePathSplit.join("/")
      const fileName = path.basename(fullPath)

      fs.readFile(path.join(STATIC_FOLDER_NAME, filePath, fileName), (err, image) => {
        if (err) return res.status(404).json({ message: err })

        if (imageСheck(image)) {
          const fileType = path.extname(req.url).substring(1)

          res
            .setHeader("Cross-Origin-Resource-Policy", "*")
            .set("Content-Type", `image/${ fileType }`)
            .end(image)
        } else {
          return res.status(404).json({ message: "File not found" })
        }
      });

    } catch (e) {
      return res.status(400).json({ message: "File found error" })
    }
  }

  async upload(req, res) {
    try {
      const { file } = req.files

      const token = req.cookies.token
      const { role } = decryptedData(token)

      if (role !== "admin") return res.status(400).json({ message: "No access" })

      const imageName = file ? await FileService.saveImage(file) : ""

      //TODO проверить нужно ли тут: "http://", HOST, PORT
      const fullPath = typeof imageName === "string"
        ? path.join("http://", HOST, PORT.toString(), imageName)
        : ""

      res.json({ link: fullPath })
    } catch (e) {
      return res.status(400).json({ message: "File upload error", e })
    }
  }
}

export default new FileController()