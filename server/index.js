require('dotenv').config()

const express = require('express')
const app = express()
const router = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose     = require('mongoose');


mongoose
//mongodb+srv://niko:<password>@cluster0-k13bi.mongodb.net/test?retryWrites=true&w=majority
  //.connect('mongodb://localhost/image-project-DB-name', {useNewUrlParser: true})
  .connect('mongodb+srv://niko:nikoniko@cluster0-k13bi.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


app.use(router)
  

  

app.listen(process.env.PORT || 5000)
