import {MAGIC_IMAGE_NUMBERS} from "../config/constant";


export default (fileBuffer) => {
  const image = fileBuffer.toString('hex', 0, 4)

  if (image === MAGIC_IMAGE_NUMBERS.jpg ||
    image === MAGIC_IMAGE_NUMBERS.jpg1 ||
    image === MAGIC_IMAGE_NUMBERS.png ||
    image === MAGIC_IMAGE_NUMBERS.gif)
    return true
}