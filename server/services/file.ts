// Vendors
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from "fs";

// Utils
import { checkForPicture } from "../utils";

// Vars
import { IMAGE_FOLDER_NAME } from "../config/config";
import { API_LINK, HOST, PORT } from "../config/setup";


const genName = (name: string) => `${ uuid.v4() }${ path.extname(name) }`


class FileService {
  saveImage(file) {
    try {
      const name = file.name
      if (!name) return ""

      if (!checkForPicture(file.data)) return console.error("File is no valid")

      const currentYears = new Date().getUTCFullYear()
      const folderPath = `${ IMAGE_FOLDER_NAME }/${ currentYears }`
      const fileName = genName(name)

      const isExistsFolder = fs.existsSync(folderPath)
      if (!isExistsFolder) fs.mkdirSync(folderPath)

      // file.mv(`${IMAGE_FOLDER_NAME}/${currentYears}/${fileName}`);

      return `http://${ HOST }:${ PORT }/${ API_LINK }/${ IMAGE_FOLDER_NAME }/${ currentYears }/${ fileName }`
    } catch (e) {
      console.log(e)
    }
  }
}

export default new FileService()