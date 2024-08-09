const siteengineer=require('../../../Model/SiteEngineer/Siteengineermodel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const signin =async(req,res)=>{
    const engineerEmail=req.body.engineerEmail;
    const Password=req.body.Password;
  
    const existinguser = await siteengineer.findOne({engineerEmail});
    if (!existinguser) {
      return res.status(400).json({message: "Siteengineer Not Found Please Register"});
    }
  
    const newsiteengineer = await siteengineer.findOne({ engineerEmail });
    const isPassword = await bcrypt.compare(Password, newsiteengineer.Password);
    if (!isPassword) {
        return res.status(400).json({message: "Incorrect Email id or Password......."});
      }
      const accesstoken = jwt.sign(
        {
          id: newsiteengineer._id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '15m',
        }
      );
     console.log("Token is generated:\n", accesstoken);
     
      if (req.cookies[`${newsiteengineer._id}`]) {
        req.cookies[`${newsiteengineer._id}`] = " ";
      }
     
      res.cookie(String(newsiteengineer._id), accesstoken, {
        path: "/",
        expires: new Date(Date.now() + 1000 *9600),
        httpOnly: true,
        sameSite: "lax",
      });
      return res.status(200).json({message: "successfully logged in",newsiteengineer,accesstoken});
};


const currentsiteengineer = async(req, res)=>{
   const siteengineers=req.newsiteengineer;
   console.log(siteengineers);
   try{
    const current = await siteengineer.findById(siteengineers, "-Password");
    if(!current){
        return res.status(404).json({message:"Admin Not Found"});
    }
    else{
        res.status(200).json(current);
    }
   }
   catch(Error){
    console.log(Error);
    return res.status(500).json({message:"Internal Server Error",Error});
   }
};


const signout = async(req, res)=>{
    try{
    const cookie = req.headers.cookie;
    const accesstoken =cookie?.split("=")[1];

    if(!accesstoken){
        return res.status(404).json({message:"Accesstoken Not Foound"});
    }

    jwt.verify(accesstoken, process.env.JWT_SECRET_KEY,( Error, newsiteengineer)=>{
        if(Error){
            return res.status(400).json({message:"Invalid Token or Empty Token"});
        }

        res.clearCookie(`${newsiteengineer.id}`);
        req.cookies[`${newsiteengineer.id}`] = "";
        return res.status(200).json({message:"Sucessfully Logout"});
    });
   }catch(Error){
    console.log(Error);
    return res.status(500).json({message:"Internal Server Error",Error})
   }
};

module.exports={ signin, currentsiteengineer, signout };