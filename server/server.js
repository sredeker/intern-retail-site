const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Start Express Server for API
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.listen(process.env.PORT || 8081)

// Set up connection to MongoDB
const uri = "mongodb+srv://mevnAppUser:Sapient2019@mevn-intern-app-k67yb.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Mongoose Connection Succeeded");
});
