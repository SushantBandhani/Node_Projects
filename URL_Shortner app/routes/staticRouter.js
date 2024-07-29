const express=require('express')
const router=express.Router()
const URL=require('../models/url')

router.get('/',async(req,res)=>{
    if(!req.user) {
        return res.redirect('/login')
    }
    const allurls=await URL.find({createdBy:req.user._id})
    return res.render('home',{
        urls:allurls
    })
})


// just to render signup page
router.get('/signup',(req,res)=>{
    return res.render('signup')
})

//Just to render login page
router.get('/login',(req,res)=>{
    return res.render('login')
})


module.exports=router