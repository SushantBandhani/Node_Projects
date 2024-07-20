const shortid=require("shortid")

//Importing database
const URL=require("../models/url")

async function handleGenerateNewShortURL(req,res){
    const body=req.body
    if(!body.url) return res.status(401).json({error:'url is required'})
    const shortId=shortid();
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[]  
    })
    return res.render('home',{
        id:shortId
    })
}


async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId
    const result=await URL.findOne({shortId})
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    })

}



module.exports={handleGenerateNewShortURL,handleGetAnalytics}