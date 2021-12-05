// Vendors
import * as uuid from 'uuid';
import * as fs from "fs";

// Var
import {STATIC_FOLDER_NAME, STATIC_IMAGE_FOLDER_NAME} from "../config/config";
import {MAGIC_IMAGE_NUMBERS} from "../config/constant";


const checkImageMagicNumbers = (fileBuffer) => {
  if (fileBuffer === MAGIC_IMAGE_NUMBERS.jpg ||
    fileBuffer === MAGIC_IMAGE_NUMBERS.jpg1 ||
    fileBuffer === MAGIC_IMAGE_NUMBERS.png ||
    fileBuffer === MAGIC_IMAGE_NUMBERS.gif) return true
}

const genName = (name: string) => {
  const splitName = name.split(".")
  const format = splitName[splitName.length - 1]

  return `${uuid.v4()}.${format}`
}

class FileService {
  saveImage(file) {
    try {
      if (file.length !== 1) return ""

      const name = file.name
      if (name === "") return ""

      const buffer = file.data
      const fileBuffer = buffer.toString('hex', 0, 4)

      const fileName = genName(name)

      if (checkImageMagicNumbers(fileBuffer)) {
        fs.mkdir(`${STATIC_FOLDER_NAME}/${STATIC_IMAGE_FOLDER_NAME}`,
          (err) => {
          if (!err) {
            const wstream = fs.createWriteStream(`${STATIC_FOLDER_NAME}/${STATIC_IMAGE_FOLDER_NAME}/${fileName}`)
            wstream.write(buffer)
            return fileName
          } else {
            return console.error(err)
          }
        })
      } else {
        console.error("File is no valid")
        return false
      }

      // TODO: создавать папку если её нет
      // TODO: создавать папки для картинок каждый год
    } catch (e) {
      console.log(e)
    }
  }
}

export default new FileService()