// Vendors
import 'dotenv/config'
import CryptoJS from "crypto-js"
import AES from "crypto-js/aes"


export default (hash: string) => {
  const bytes = CryptoJS.AES.decrypt(hash, process.env.SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}