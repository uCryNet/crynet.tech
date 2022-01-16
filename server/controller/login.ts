// Vendors
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

// Components
import UserService from '../services/login'

// Vars
import {SECRET_KEY} from "../config/config";


const genToken = (id, role) => {
  const payload = {id, role}

  return jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"})
}

const setCookie = (res, token) => {

}

class UserController {
  async login(req, res) {
    try {
      const {login, password} = req.body

      if (!login || !password) return res.status(403).json({message: "Fill in the login and pass fields"})
      const user = await UserService.getUser(login, "login")

      if (!user) return res.status(403).json({message: `User ${login} was not found`})

      const passwordValidation = bcrypt.compareSync(password, user.password)
      if (!passwordValidation) return res.status(400).json({message: "Password is wrong"})

      const token = genToken(user._id, user.role)

      res
        .cookie('token', token, {
          maxAge: 86400,
          httpOnly: false
        })
        .send('OK')
      console.log(token)
    } catch (e) {
      res.status(400).json({message: "Login error", e})
    }
  }

  async registration(req, res) {
    try {
      if (!req.body) return res.status(400).json({message: "Registration error"})

      const {login, password, name, mail} = req.body

      if (!login) return res.status(400).json({message: "Fill in the login"})
      const loginForReg = await UserService.getUser(login.toString(), "login")

      if (loginForReg) return res.status(400).json({message: "User with that login already exists"})
      if (login.length < 3 || login.length > 20) return res.status(400).json({message: "Check the length login"})
      if (!password || !name || !mail) return res.status(400).json({message: "Fill in the required fields"})
      if (password.length < 5 || password.length > 20) return res.status(400).json({message: "Check the length password"})

      const hashPassword = bcrypt.hashSync(password.toString(), 8)
      await UserService.registration({login, password: hashPassword, name, mail, role: "user"})
      res.json({message: "User is registered"})
    } catch (e) {
      res.status(400).json({message: "Registration failed", e})
    }
  }
}

export default new UserController();