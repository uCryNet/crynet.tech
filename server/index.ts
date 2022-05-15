// Vendors
import express from 'express'
import mongoose from 'mongoose'
import fileUpload from "express-fileupload"
import 'dotenv/config'
import cors from "cors"
import cookieParser from "cookie-parser"

// Variables
const router = require("./src/routes/index.routes.ts")
import { STATIC_FOLDER_NAME, API_LINK } from "./src/config/config"

const app = express()

mongoose.set('useCreateIndex', true)

app.use(
  cors({
    origin: process.env.ENV,
    credentials: true, //access-control-allow-credentials: true
    // TODO: fix this
    // @ts-ignore
    optionSuccessStatus: 200,
  }),
)
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(STATIC_FOLDER_NAME))
app.use(fileUpload({}))
app.use(API_LINK, router) // http://localhost:5000/api/


async function startApp() {
  try {
    await mongoose.connect(process.env.DB as string, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(process.env.PORT, () => console.log('SERVER STARTED ON PORT ' + process.env.PORT))
  } catch (e) {
    console.log(e)
  }
}

startApp()
