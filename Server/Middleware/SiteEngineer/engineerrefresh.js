const jwt=require('jsonwebtoken')

const refreshtoken = async(req, res, next)=>{
    const cookie = req.headers.cookie;
    const token = cookie?.split("=")[1];

    if(!token){
        return res.status(400).json({message:"Token Not Found"});
    }

    jwt.verify(String(token),process.env.JWT_SITESECRET_KEY,(Error, newsiteengineer)=>{
        if(Error){
            return res.status(400).json({message:"Invalid Token"});
        }

        res.clearCookie(`${newsiteengineer.id}`);
        req.cookies[`${newsiteengineer.id}`]="";

        const retoken = jwt.sign({id:newsiteengineer.id},process.env.JWT_SITESECRET_KEY,{expiresIn:"5m"});
        console.log("Refresh Token:\n",retoken);

        res.cookie(String(newsiteengineer.id),retoken,{
            path:"/",
            expiresIn: new Date(Date.now()+1000*9600),
            httponly:true,
            sameSite:"lax"
        });

        req.newsiteengineer=newsiteengineer.id;
        next();
    })
};

module.exports=refreshtoken;