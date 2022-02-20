if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const indexRouter = require('./router/index')


app.set('view engine','ejs')
app.set('views', __dirname + "/views")
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true } )
const db = mongoose.connection

db.once('open',()=>{
    console.log("mongo is running")
})
db.on('error',(err)=>{
    console.log(err)
})

app.use('/',indexRouter)

app.listen( process.env.PORT || 3000 ,()=>{
    console.log("running at port 3000")
})