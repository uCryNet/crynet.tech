// Vendors
import {mongo} from "mongoose"

// Component
import User from '../models/user'


class UserService {
  async getUser(data, findBy: "id" | 'login') {
    if (findBy === "login") {
      return User.findOne({login: data});
    } else {
      return User.findOne({_id: new mongo.ObjectID(data)});
    }
  }

  async registration(data) {
    const newUser = new User(data);
    await newUser.save()

    return newUser
  }
}

export default new UserService()