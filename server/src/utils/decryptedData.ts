// Vendors
import CryptoJS from "crypto-js"


export default (hash: string) => {
  const bytes = CryptoJS.AES.decrypt(hash, process.env.SECRET_KEY as string);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}