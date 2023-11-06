const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.url;
mongoose.connect(url,{}).then(result=>console.log("Database connected successfully"))
.catch(err => console.log(err));

require('./department.model')