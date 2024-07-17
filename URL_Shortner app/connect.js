const mongoose=require('mongoose')

async function connectTomongoDb(url){
    return mongoose.connect(url)
}

module.exports={
    connectTomongoDb
}