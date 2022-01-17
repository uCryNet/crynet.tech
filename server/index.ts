// Vendors
import express from 'express'
import mongoose from 'mongoose'
import fileUpoad from "express-fileupload"
import helmet from "helmet";
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");

// Vars
const router = require("./routes/index.routes.ts")
import {PORT, DB_URL, ENV} from "./config/setup"
import {STATIC_FOLDER_NAME} from "./config/config"

const app = express()

mongoose.set('useCreateIndex', true)

app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json({ extended: true }));
app.use(
  cors({
    credentials: true,
    ENV
  }),
);
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(STATIC_FOLDER_NAME))
app.use(fileUpoad({}))
app.use('/api', router) // http://localhost:5000/api/


async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
  } catch (e) {
    console.log(e)
  }
}

startApp()
