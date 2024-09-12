const express=require("express")
const path=require("path")
require('dotenv').config()
const app=express()
const PORT=process.env.PORT || 8000
const mongoose=require('mongoose')
const userRoute=require("./routes/user")
const blogRoute=require("./routes/blog")
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')
const Blog=require('./models/blog')
const {checkForAuthenticationCookie}=require("./middlewares/authentication")
mongoose.connect(process.env.MONGO_URL).then((e)=>{
    console.log('Mongodb connected')
})


// setting views
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

//to need to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());    //To parse cookie
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get("/",async (req,res)=>{
    const allBlogs=await Blog.find({})
    res.render('home',{
        user:req.user,
        blogs:allBlogs
    })
})

app.use("/user",userRoute)
app.use("/blog",blogRoute)
app.listen(PORT,()=>{
    console.log(`server started at PORT: ${PORT}`)
})