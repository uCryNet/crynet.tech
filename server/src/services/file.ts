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
    if (Array.isArray(file)) return ""
    if (!file.name && !imageCheck(file.data)) return ""

    const currentYears = new Date().getUTCFullYear().toString()
    const folderPath = path.join(__dirname, "../../../", IMAGE_FOLDER_NAME, currentYears)

    const fileName = genName(file.name)

    const isExistsFolder = fs.existsSync(folderPath)
    if (!isExistsFolder) fs.mkdirSync(folderPath)

    const fileLink = path.join(IMAGE_FOLDER_NAME, currentYears, fileName)

    await file.mv(path.join(__dirname, "../../../", fileLink))
    return path.join(fileLink)
  }

  async deleteImage(file: string) {
    if (!file) return

    const absolutePath = path.resolve(__dirname,  "../../../", file)

    fs.stat(absolutePath, (err) => {
      if (err) return

      fs.unlink(absolutePath,function(err) {
        if (err) return console.log(err);
      });
    })
  }
}

export default new FileService()