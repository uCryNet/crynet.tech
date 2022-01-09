// Vendors
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from "fs";

// Utils
import {checkForPicture} from "../utils";

// Vars
import {IMAGE_FOLDER_NAME} from "../config/config";


const genName = (name: string) => `${uuid.v4()}${path.extname(name)}`


class FileService {
  saveImage(file) {
    try {
      const name = file.name
      if (!name) return ""

      if (!checkForPicture(file.data)) return console.error("File is no valid")

      const currentYears = new Date().getUTCFullYear()
      const folderPath = `${IMAGE_FOLDER_NAME}/${currentYears}`
      const isExistsFolder = fs.existsSync(folderPath)

      const fileName = genName(name)

      if (!isExistsFolder) fs.mkdirSync(folderPath)

      console.log(`${IMAGE_FOLDER_NAME}/${currentYears}/${fileName}`)

      return `${IMAGE_FOLDER_NAME}/${currentYears}/${fileName}`
    } catch (e) {
      console.log(e)
    }
  }
}

export default new FileService()