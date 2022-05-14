// Variables
import { MAGIC_IMAGE_NUMBERS } from "../config/magicNumbers";


export default (fileBuffer: Buffer) => {
  if (!fileBuffer) return false

  const image = fileBuffer.toString('hex', 0, 4)

  switch (image) {
    case MAGIC_IMAGE_NUMBERS.jpg:
    case MAGIC_IMAGE_NUMBERS.jpg1:
    case MAGIC_IMAGE_NUMBERS.jpg2:
    case MAGIC_IMAGE_NUMBERS.jpg3:
    case MAGIC_IMAGE_NUMBERS.png:
    case MAGIC_IMAGE_NUMBERS.gif:
    case MAGIC_IMAGE_NUMBERS.webP:
      return true
    default:
      return false
  }
}