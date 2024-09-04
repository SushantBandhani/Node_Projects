const { getUser } = require("../service/auth");

function chechForAuthentication(req,res,next){
  const tokenCookiee = req.cookies.token
  req.user=null
  if(!tokenCookiee){
    return next()
  }

 const token=tokenCookiee
 const user=getUser(token)
 req.user=user
return next()

}

function restrictTo(roles=[]){
  return function(req,res,next){
    if(!req.user){ 
      return res.redirect("/login")
    }
      if(!roles.includes(req.user.role)){
        return res.end("unauthorized") 
      }
      next();
  }

}

module.exports = {
  chechForAuthentication,
  restrictTo
};
