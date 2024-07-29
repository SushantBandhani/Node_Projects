const {getUser}=require('../service/auth')

async function restrictToLoggedUserOnly(req,res,next){
    const userUid=req.cookies?.uid //cookie? mtlb agr cookie hai to chalega ni hai to error ni dega age badhega
    console.log(req)

    if(!userUid){
        console.log("yes")   
        return res.redirect("/login") 
    }
    const user=getUser(userUid)
    if(!user) {
        console.log("ok")
        return res.redirect('/login')
    }
    req.user=user
    next();

}

async function checkAuth(req,res,next){
    const userUid=req.cookies?.uid //cookie? mtlb agr cookie hai to chalega ni hai to error ni dega age badhega
    // console.log(req)
    const user=getUser(userUid)
    req.user=user
    next();

}

module.exports={
    restrictToLoggedUserOnly,
    checkAuth
}