// Vendors
import express from 'express'
import mongoose from 'mongoose'
import fileUpoad from "express-fileupload"
import helmet from "helmet";

// TODO: заменить require на import
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");

// Vars
const router = require("./routes/index.routes.ts")
import { PORT, DB_URL, ENV, API_LINK } from "./config/setup"
import { STATIC_FOLDER_NAME } from "./config/config"

const app = express()

mongoose.set('useCreateIndex', true)

app.use(helmet())
app.use(cookieParser())
// TODO bodyParser ненужен
// app.use(bodyParser.json({ extended: true }));
app.use(
  cors({
    origin: ENV,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }),
);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(STATIC_FOLDER_NAME))
app.use(fileUpoad({}))
app.use(`/${ API_LINK }`, router) // http://localhost:5000/api/


async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
  } catch (e) {
    console.log(e)
  }
}

startApp()
