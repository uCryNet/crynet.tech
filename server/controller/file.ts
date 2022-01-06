// Vendors
import * as fs from "fs";


class FileController {
  async get(req, res) {
    try {
      const pathName = req.url.substring(1)

      fs.readFile(pathName, (err, image) => {
        res.end(image)
      });

    } catch (e) {
      return res.status(400).json({message: "File not found", e})
    }
  }
}

export default new FileController()