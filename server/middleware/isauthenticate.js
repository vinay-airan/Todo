import jwt from "jsonwebtoken";

const isauthenticate = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                suceess:false,
                message:"token not found"
            });
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY); 
        if(!decode){
            return res.status(401).json({
                suceess:false,
                message:"token invalid"
            });
        }
            req.userId = decode.id;
            next();
    }catch(error){
         return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
    }
}
export default isauthenticate;