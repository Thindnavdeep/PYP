const mongoose = require('mongoose');
require('dotenv').config();
// const url = "mongodb+srv://navdeepthind1001:1001motto@cluster0.0kkab2p.mongodb.net/Get-Papers";
const url = process.env.url;
mongoose.connect(url,{}).then(result=>console.log("Database connected successfully"))
.catch(err => console.log(err));

require('./department.model')