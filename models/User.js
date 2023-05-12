import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"

const schema = mongoose.Schema({
// Name type, required
name:{
    type:String,
    required:[true,"Please Enter Your Name"]
},
// Email type, required, unique, validate
email:{
    type:String,
    required:[true,"Please Enter Your Email"],
    unique:true,
    validate:validator.isEmail,
},
// Password type, required, minLength, select
password:{
     type:String,
     required:[true,"Please Enter Your Password"],
     minLength:[8,"Password Must be greater than 8 chars.."],
     select:false
},
// Role type, enum, default
role:{
    type:String,
    enum:["admin","user"],
    default:"user"
},
// Subscription id, status
subscription:{
    id:String,
    status:String
},
// Avatar public_id, url
avatar:{
    public_id:{
         type:String,
         required:true
     },
     url:{
        type:String,
        required:true
    },
},
// Playlist [ courseId,poster ]
playlist:[
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        poster:String
    }
],
// CreatedAt type, default
createdAt:{
    type:Date,
    default:Date.now
},
resetPasswordToken: String,
resetPasswordExpire: String
});

schema.pre("save", async function(next){
     if(!this.isModified("password")) return next();
     this.password = await bcrypt.hash(this.password,10);
     return next()
})


schema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
};

schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
};

schema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };


export const User = mongoose.model("User",schema);