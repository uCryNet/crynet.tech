// Vendors
import * as uuid from 'uuid';
import * as path from 'path';

// Var
import {IMAGE_FOLDER_NAME} from "../config/config";
import {MAGIC_IMAGE_NUMBERS} from "../config/constant";
import * as fs from "fs";


const checkImageMagicNumbers = (fileBuffer) => {
  if (fileBuffer === MAGIC_IMAGE_NUMBERS.jpg ||
    fileBuffer === MAGIC_IMAGE_NUMBERS.jpg1 ||
    fileBuffer === MAGIC_IMAGE_NUMBERS.png ||
    fileBuffer === MAGIC_IMAGE_NUMBERS.gif)
    return true
}

const genName = (name: string) => `${uuid.v4()}${path.extname(name)}`


class FileService {
  saveImage(file) {
    try {
      const name = file.name
      if (!name) return ""

      const buffer = file.data
      const fileBuffer = buffer.toString('hex', 0, 4)
      if (!checkImageMagicNumbers(fileBuffer)) return console.error("File is no valid")

      const currentYears = new Date().getUTCFullYear()
      const folderPath = `${IMAGE_FOLDER_NAME}/${currentYears}`
      const isExistsFolder = fs.existsSync(folderPath)

      const fileName = genName(name)

      if (!isExistsFolder) fs.mkdirSync(folderPath)

      return `${IMAGE_FOLDER_NAME}/${currentYears}/${fileName}`
    } catch (e) {
      console.log(e)
    }
  }
}

export default new FileService()