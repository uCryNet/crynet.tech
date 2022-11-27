// Vendors
import bcrypt from 'bcryptjs'
import CryptoJS from "crypto-js"

// Types
import { Request, Response } from "express";
import { Types } from "mongoose"

// Components
import UserService from '../services/login'

// Variables
import { decryptedData } from "../utils";


const genToken = (id: Types.ObjectId, role: string) => {
  const payload = { id, role }

  return CryptoJS.AES.encrypt(JSON.stringify(payload), process.env.SECRET_KEY as string).toString();
}


class UserController {
  async login(req: Request, res: Response) {
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
          maxAge: 86400000, // 1 day
          httpOnly: true
        })
        .send('OK')
    } catch (e) {
      return res.status(400).json({ message: "Login error", e })
    }
  }

  async checkAccess(req: Request, res: Response) {
    try {
      const { token } = req.cookies

      if (!token) return res.status(403).json({ message: "Unregistered user" })

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

  /** Registration is fully functional. I'll leave it for better times **/
  // async registration(req: Request, res: Response) {
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
}

export default new UserController();