const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const config = require('./config/key')

const { User } = require("./models/User")

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log("MongoDB Connected!!!"))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/register', async (req, res) => {

  const user = new User(req.body)
  try {
    await user.save();
    return res.status(200).json({success: true})
  } catch (err) {
      return res.json({ success: false, err})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
