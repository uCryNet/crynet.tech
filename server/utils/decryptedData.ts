// Vendors
import CryptoJS from "crypto-js"
import AES from "crypto-js/aes"

// Vars
import { SECRET_KEY } from "../config/config";


export default (hash: string) => {
  const bytes = CryptoJS.AES.decrypt(hash, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}