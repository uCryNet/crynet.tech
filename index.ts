// Vendors
import express from 'express'
import mongoose from 'mongoose'

// Var
const router = require("./routes/index.routes.ts")
const {PORT, DB_URL} = require("./config/setup")

const app = express()

mongoose.set('useCreateIndex', true);

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api', router) // http://localhost:5000/api/


async function startApp() {
  try {
    await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
  } catch (e) {
    console.log(e)
  }
}

startApp()
