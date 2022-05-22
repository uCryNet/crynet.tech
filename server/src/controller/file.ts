// Vendors
import * as fs from "fs";
import path from "path";

// Types
import { Request, Response } from "express";

// Components
import FileService from "../services/file";

// Variables
import { STATIC_FOLDER_NAME } from "../config/config";

// Utils
import { imageCheck, decryptedData } from "../utils";


class FileController {
  async get(req: Request, res: Response) {
    /** only for local develop. Prod works for Nginx **/

    try {
      const { base, dir } = path.parse(req.url)
      const splitUrl = dir.split("/", 4)
      const fullPath = path.join(STATIC_FOLDER_NAME, splitUrl[2], splitUrl[3], base)

      fs.readFile(path.join(__dirname, "../../../", fullPath), (err, image) => {
        if (err) return res.status(404).json({ message: err })

        if (imageCheck(image)) {
          const fileType = path.extname(req.url).substring(1)

          res
            .setHeader("Cross-Origin-Resource-Policy", "*")
            .set("Content-Type", `image/${fileType}`)
            .end(image)
        } else {
          return res.status(404).json({ message: "File not found" })
        }
      })
    } catch (e) {
      return res.status(400).json({ message: "File found error" })
    }
  }

  async upload(req: Request, res: Response) {
    try {
      const file = req.files?.file
      const token = req.cookies.token
      const { role } = decryptedData(token)

      if (!file) return res.status(400).json({ message: "File not found" })
      if (role !== "admin") return res.status(400).json({ message: "No access" })

      const fullPath = file ? await FileService.saveImage(file) : ""
      return res.json({ link: fullPath })
    } catch (e) {
      return res.status(400).json({ message: "File upload error", e })
    }
  }
}

export default new FileController()