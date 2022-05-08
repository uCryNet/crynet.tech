// Vendors
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from "fs";

// Vars
import { IMAGE_FOLDER_NAME, API_LINK } from "../config/config";
import { HOST, PORT } from "../config/setup";

// Utils
import { imageСheck } from "../utils";


const genName = (name: string) => `${ uuid.v4() }${ path.extname(name) }`


class FileService {
  async saveImage(file) {
    try {
      if (!file.name) return ""
      if (!imageСheck(file.data)) return console.error("File is no valid")

      const currentYears = new Date().getUTCFullYear().toString()
      const folderPath = path.join(IMAGE_FOLDER_NAME, currentYears)
      const fileName = genName(file.name)

      const isExistsFolder = fs.existsSync(folderPath)
      if (!isExistsFolder) fs.mkdirSync(folderPath)

      file.mv(`${IMAGE_FOLDER_NAME}/${currentYears}/${fileName}`);

      // TODO: поправить вид ссылки
      return `http://${ HOST }:${ PORT }/${ API_LINK }/${ IMAGE_FOLDER_NAME }/${ currentYears }/${ fileName }`
    } catch (e) {
      console.error(e)
    }
  }
}

export default new FileService()