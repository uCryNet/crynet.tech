// Vendors
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from "fs";

// Types
import { UploadedFile } from 'express-fileupload';

// Variables
import { IMAGE_FOLDER_NAME } from "../config/config";

// Utils
import { imageCheck } from "../utils";


const genName = (name: string) => `${uuid.v4()}${path.extname(name)}`


class FileService {
  async saveImage(file: UploadedFile | UploadedFile[]) {
    try {
      if (Array.isArray(file)) return ""
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
      return ""
    }
  }
}

export default new FileService()