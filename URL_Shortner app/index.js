const express=require("express")
const urlRoute=require('./routes/url')
const path=require("path")
const {connectTomongoDb}=require('./connect')
const URL=require('./models/url')
const staticRoute=require('./routes/staticRouter')
const app=express()
const PORT=8001

connectTomongoDb('mongodb://localhost:27017/short-url').then(()=>{
    console.log("Mongo Db connected")
})


app.get('/test',async(req,res)=>{
   const allUrls=await URL.find({})
   return res.render('home',{  
    urls:allUrls
   })
   })


app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))


app.use('/url',urlRoute);
app.use('/',staticRoute)
app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId
   const entry= await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
         visitHistory:{
            timestamp:Date.now()
        },   
        },
    })
    res.redirect(entry.redirectURL)
})


app.listen(8001,()=>{
    console.log(`Server started at PORT :${PORT}`)
})