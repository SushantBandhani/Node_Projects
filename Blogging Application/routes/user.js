const {Router}=require("express")
const router=Router()


router.get('/signin',(req,res)=>{
    return res.render("signin")
})
router.get('/signup',(req,res)=>{
    return res.render("signin")
})
router.post('/signup',async(req,res)=>{
    const{fullname,email,password}=req.body
    await UserActivation.create({
        fullname,email,password 
    })
    return res.redirect("/")  //redirecting to homepage
})


module.exports=router
