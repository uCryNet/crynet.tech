// Vendors
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import CryptoJS from "crypto-js"
import AES from "crypto-js/aes"

// Components
import UserService from '../services/login'

// Vars
import { decryptedData } from "../utils";


const genToken = (id: string, role: string) => {
  const payload = { id, role }

  return CryptoJS.AES.encrypt(JSON.stringify(payload), process.env.SECRET_KEY).toString();
}


class UserController {
  async login(req, res) {
    try {
      const { login, password } = req.body

      if (!login || !password) return res.status(403).json({ message: "Fill in the login and pass fields" })
      const user = await UserService.getUser(login, "login")

      if (!user) return res.status(403).json({ message: `User ${login} was not found` })

      const passwordValidation = bcrypt.compareSync(password, user.password)
      if (!passwordValidation) return res.status(400).json({ message: "Password is wrong" })

      const token = genToken(user._id, user.role)

      return res
        .cookie('token', token, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true
        })
        .send('OK')
    } catch (e) {
      return res.status(400).json({ message: "Login error", e })
    }
  }

  // Регистрация полностью рабочая. Оставлю до лучших времен
  // async registration(req, res) {
  //   try {
  //     if (!req.body) return res.status(400).json({message: "Registration error"})
  //
  //     const {login, password, name, mail} = req.body
  //
  //     if (!login) return res.status(400).json({message: "Fill in the login"})
  //     const loginForReg = await UserService.getUser(login.toString(), "login")
  //
  //     if (loginForReg) return res.status(400).json({message: "User with that login already exists"})
  //     if (login.length < 3 || login.length > 20) return res.status(400).json({message: "Check the length login"})
  //     if (!password || !name || !mail) return res.status(400).json({message: "Fill in the required fields"})
  //     if (password.length < 5 || password.length > 20) return res.status(400).json({message: "Check the length password"})
  //
  //     const hashPassword = bcrypt.hashSync(password.toString(), 8)
  //     await UserService.registration({login, password: hashPassword, name, mail, role: "user"})
  //     res.json({message: "User is registered"})
  //   } catch (e) {
  //     res.status(400).json({message: "Registration failed", e})
  //   }
  // }

  async checkAccess(req, res) {
    try {
      const { token } = req.cookies

      if (!token) return res.status(403).json({ message: "Unregistred user" })

      const { role } = decryptedData(token)
      if (role !== "admin") return res.status(403).json({ message: "Forbidden" })

      return res.json({
        message: "Welcome to the board",
        isAdmin: true,
      })
    } catch (e) {
      return res.status(403).json({ message: "Access failed", e })
    }
  }
}

export default new UserController();