const jwt=require('jsonwebtoken')

const refreshtoken = async(req, res, next)=>{
    const cookie = req.headers.cookie;
    const token = cookie?.split("=")[1];

    if(!token){
        return res.status(400).json({message:"Token Not Found"});
    }

    jwt.verify(String(token),process.env.JWT_SECRET_KEY,(Error, newAdmin)=>{
        if(Error){
            return res.status(400).json({message:"Invalid Token"});
        }

        res.clearCookie(`${newAdmin.id}`);
        req.cookies[`${newAdmin.id}`]="";

        const retoken = jwt.sign({id:newAdmin.id},process.env.JWT_SECRET_KEY,{expiresIn:"5m"});
        console.log("Refresh Token:\n",retoken);

        res.cookie(String(newAdmin.id),retoken,{
            path:"/",
            expiresIn: new Date(Date.now()+1000*9600),
            httponly:true,
            sameSite:"lax"
        });

        req.newAdmin=newAdmin.id;
        next();
    })
};

module.exports=refreshtoken;