// Vendors
import express from 'express'
import mongoose from 'mongoose'
import fileUpload from "express-fileupload"
import 'dotenv/config'
import cors from "cors"
import cookieParser from "cookie-parser"

// Variables
const router = require("./src/routes/index.routes.ts")

import { STATIC_FOLDER_NAME } from "./src/config/config"

// origin needed because front and back works on different ports (only local develop)
const originConf = !!process.env.ORIGIN && { origin: process.env.ORIGIN }

const app = express()
app.use(
  cors({
    ...originConf,
    credentials: true, // access-control-allow-credentials: true
  }),
)
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(STATIC_FOLDER_NAME))
app.use(fileUpload({}))
app.use(router) // http://localhost:5000/api/


async function startApp() {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.DB as string)
    app.listen(process.env.PORT, () => console.log('===== SERVER WORKS ====='))
  } catch (e) {
    console.log(e)
  }
}

startApp()