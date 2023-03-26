const express = require('express')
const path = require('path')
const router = require('./routes/myRouter')
const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(router)
app.use(express.static(__dirname + '/public'));

app.listen(8080,()=>{
    console.log("start server at 8080")
})