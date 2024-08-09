const jwt=require('jsonwebtoken');

const validation = async(req, res, next)=>{
    const cookie= req.headers.cookie;
    const token= cookie?.split("=")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY,(Error, newAdmin)=>{
        if(Error){
            if (Error.name === 'TokenExpiredError') {
                return res.status(400).json({message: "Token has expired",newAdmin});
              }
            return res.status(400).json({message:" Signin Please"});
        }
        console.log("Decoded Admin",newAdmin.id);
        req.newAdmin = newAdmin.id;
        next();
    });
}

module.exports=validation;