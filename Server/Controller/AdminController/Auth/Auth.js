const admin=require('../../../Model/Admin/Adminmodel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

let adminCreated=false;
const adminn= async(req,res)=>{
    const password = process.env.adminPassword;
    const hashpassword =  bcrypt.hashSync(password);
    const adminCreated= [{ FirstName:"Girish", LastName:"P", Mobile:"1234567890", email:"girish@gmail.com", Password:hashpassword}];
    try{
       const Admin = await admin.findOne({email:"girish@gmail.com"});
       if(!Admin){
         const newAdmin= await admin.create(adminCreated);
         console.log(newAdmin);
       }
       else{
        console.log("Admin Already Created");
       }
    }
    catch(Error){
        console.log(Error);
    }
};


const signin =async(req,res)=>{
    const email=req.body.email;
    const Password=req.body.Password;
  
    const existinguser = await admin.findOne({email});
    if (!existinguser) {
      return res.status(400).json({message: "Admin Not Found Please Register"});
    }
  
    const newAdmin = await admin.findOne({ email });
    const isPassword = await bcrypt.compare(Password, newAdmin.Password);
    if (!isPassword) {
        return res.status(400).json({message: "Incorrect Email id or Password......."});
      }
      const accesstoken = jwt.sign(
        {
          id: newAdmin._id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '15m',
        }
      );
     console.log("Token is generated:\n", accesstoken);
     
      if (req.cookies[`${newAdmin._id}`]) {
        req.cookies[`${newAdmin._id}`] = " ";
      }
     
      res.cookie(String(newAdmin._id), accesstoken, {
        path: "/",
        expires: new Date(Date.now() + 1000 *9600),
        httpOnly: true,
        sameSite: "lax",
      });
      return res.status(200).json({message: "successfully logged in",newAdmin,accesstoken});
};


const currentAdmin = async(req, res)=>{
   const Admins=req.newAdmin;
   try{
    const current = await admin.findById(Admins, "-Password");
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

    jwt.verify(accesstoken, process.env.JWT_SECRET_KEY,( Error, newAdmin)=>{
        if(Error){
            return res.status(400).json({message:"Invalid Token or Empty Token"});
        }

        res.clearCookie(`${newAdmin.id}`);
        req.cookies[`${newAdmin.id}`] = "";
        return res.status(200).json({message:"Sucessfully Logout"});
    });
   }catch(Error){
    console.log(Error);
    return res.status(500).json({message:"Internal Server Error",Error})
   }
};

module.exports={adminn, signin, currentAdmin, signout};