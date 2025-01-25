const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()

//db connect
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB has been started'))

app.listen(process.env.PORT, () => console.log('Server has been started'))
