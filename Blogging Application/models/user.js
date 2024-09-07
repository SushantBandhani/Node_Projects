const {Schema,model}=require("mongoose")
const {createHmac,randomBytes}=require("node:crypto")
const userSchema= new Schema({
    firstName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageURL:{
        type:String,
        default:'/images/default.png'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})

userSchema.pre("save",function(next){
    const user=this
    if(!user.isModified("password")) return

    //salt generation
    const salt=randomBytes(16).toString()  // secret key
    const hashedPassword=createHmac('sha256',salt ).update(user.password).digest("hex")

    this.salt=salt
    this.password=hashedPassword

})

const User=model('user',userSchema)
module.exports=User