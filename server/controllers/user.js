import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const register = async (req, res) => {
    try {   
        const { fullname, email, password } = req.body;
        console.log(fullname,email,password,"fnjnsndcjnsdcnsjdncjsdnjvsdnvjsdnv");
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname: fullname, email, password:hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const login = async (req, res) => {
    try {
const { email, password } = req.body;
console.log(email,password,"ahdjabfba");
if (!email || !password) {
return res.status(400).json({ message: "Please provide email and password" });
}
const user = await User.findOne({ email });
if (!user) {
return res.status(400).json({ message: "Invalid email or password" });
}
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
return res.status(400).json({ message: "Invalid email or password" });
}
const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
// res.status(200).json({ message: `Welcome back ${user.fullname}` });
res.status(200).cookie("token", token, { httpOnly: true, sameSite:"strict", maxAge: 24*60*60*1000 })
    .json({ message: `Welcome back ${user.fullname}`,
    user:{
        id:user._id,
        fullname:user.fullname,
        email:user.email,
        token:token
    }
 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// const token = await jwt.sign({ userId: User._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
// res.status(200).cookie("token", token, { httpOnly: true, sameSite:"strict",maxAge: 24*60*60 }).json({
//     success: true ,
//     message: `Welcome back ${user.fullname}`, token });


// res.status(200).json({
//     success: true ,
//     message: `Welcome back ${user.fullname}`, token });
export const logout = async(req,res)=>{
    try{

    //    res.status(200).cookie("token",'',{httpOnly:true,sameSite:"strict",maxAge:0}).json({message:"bye bye i logged out"});

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false // production me true
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
    }catch(error){
        return res.status(500).json({message:"internal server error"});
    }
}




export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate random token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    // 🔥 for now console token
    console.log("RESET TOKEN:", token);

    res.json({
      message: "Reset token generated. Check server console."
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({
      message: "Password reset successful"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
