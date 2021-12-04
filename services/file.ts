// Vendors
import * as uuid from 'uuid';
import * as path from 'path';

// Var
import {STATIC_FOLDER_NAME, STATIC_IMAGE_FOLDER_NAME} from "../config/config";


class FileService {
  saveImage(file) {
    try {
      const splitName = file.name.split(".")
      const format = splitName[splitName.length - 1]
      const fileName = `${uuid.v4()}.${format}`

      // TODO: добавить проверку на формат файла
      // TODO: создавать папку если её нет
      // TODO: создавать папки для картинок каждый год

      const filePath = path.resolve(`${STATIC_FOLDER_NAME}/${STATIC_IMAGE_FOLDER_NAME}`, fileName)
      file.mv(filePath)

      return fileName
    } catch (e) {
      console.log(e)
    }
  }
}

export default new FileService()