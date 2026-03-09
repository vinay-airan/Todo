import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required : true
    },
    email:{
        required:true,
        type:String,
        match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email format"
    ]
    },
    password:{
        required:true,
        type:String,
        
    },

  resetToken: String,
  resetTokenExpiry: Date

});

const User = mongoose.model("User", userSchema);
export default User;