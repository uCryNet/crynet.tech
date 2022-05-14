// Vendors
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from "fs";

// Variables
import { IMAGE_FOLDER_NAME } from "../config/config";

// Utils
import { imageCheck } from "../utils";


const genName = (name: string) => `${ uuid.v4() }${ path.extname(name) }`


class FileService {
  async saveImage(file) {

    console.log(typeof file)
    try {
      if (!file.name && !imageCheck(file.data)) return ""

      const currentYears = new Date().getUTCFullYear().toString()
      const folderPath = path.join(IMAGE_FOLDER_NAME, currentYears)
      const fileName = genName(file.name)

      const isExistsFolder = fs.existsSync(folderPath)
      if (!isExistsFolder) fs.mkdirSync(folderPath)

      // file.mv(path.join(IMAGE_FOLDER_NAME, currentYears, fileName))
      return path.join(IMAGE_FOLDER_NAME, currentYears, fileName)
    } catch (e) {
      console.error(e)
    }
  }
}

export default new FileService()