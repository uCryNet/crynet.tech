// Vendors
import express from 'express'
import mongoose from 'mongoose'
import fileUpload from "express-fileupload"
import helmet from "helmet";
import 'dotenv/config'

// TODO: заменить require на import
import cors from "cors"
import cookieParser from "cookie-parser"

// Vars
const router = require("./routes/index.routes.ts")
import { API_LINK } from "./config/config"
import { STATIC_FOLDER_NAME } from "./config/config"

const app = express()

mongoose.set('useCreateIndex', true)

app.use(helmet())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.ENV,
    credentials: true, //access-control-allow-credentials: true
    optionSuccessStatus: 200,
  }),
);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(STATIC_FOLDER_NAME))
app.use(fileUpload({}))
app.use(`/${ API_LINK }`, router) // http://localhost:5000/api/


async function startApp() {
  try {
    await mongoose.connect(process.env.DB, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(process.env.PORT, () => console.log('SERVER STARTED ON PORT ' + process.env.PORT))
  } catch (e) {
    console.log(e)
  }
}

startApp()
