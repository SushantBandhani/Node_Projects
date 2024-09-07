const express=require("express")
const path=require("path")
const app=express()
const PORT=8000
const mongoose=require('mongoose')
const userRoute=require("./routes/user")
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/blogify').then((e)=>{
    console.log('Mongodb connected')
})


// setting views
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

//to need to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render('home')
})

app.use("/user",userRoute)
app.listen(PORT,()=>{
    console.log(`server started at PORT: ${PORT}`)
})