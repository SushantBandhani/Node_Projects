const {Router}=require("express")
const router=Router()
const User=require("../models/user")

router.get('/signin',(req,res)=>{
    return res.render("signin")
})

router.post('/signin',async(req,res)=>{
    const{email,password}=req.body
  const user= User.matchpassword(email,password)
  if(!user){
    res.send({error:"Incorrect username or password"})
  }
  console.log("User",user)
    return res.redirect("/")  //redirecting to homepage
})


router.get('/signup',(req,res)=>{
    return res.render("signup")
})
router.post('/signup',async(req,res)=>{
    const{fullName,email,password}=req.body
    await User.create({
        fullName,
        email,
        password 
    })
    return res.redirect("/")  //redirecting to homepage
})


module.exports=router
