const siteengineer= require('../../Model/SiteEngineer/Siteengineermodel');
const bcrypt=require('bcryptjs')


const getsiteengineer= async(req, res)=>{
    try{
        const Siteengineer= await siteengineer.find();
        return res.status(200).json({message:"All Siteengineer",Siteengineer});
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Inernal Server Error",Error});
    }
};

const siteengineerid= async(req, res)=>{
    try{
        const siteEngineerid= await siteengineer.findById(req.params.id);
        if(!siteEngineerid){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(siteEngineerid);
        }
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};



const createsiteengineer= async(req, res)=>{
    try{
            const {engineerName, engineerEmail, engineerSiteLocation, engineerSpecialization, Password} = req.body
            const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(Password);

            if (!isStrongPassword) {
                return res.status(400).json({ message: "Password is not strong enough" });
            }

            const existingsiteengineer= await siteengineer.findOne({engineerEmail});
            if(existingsiteengineer){
                return res.status(400).json({message:"This Email Id is Already Exists"});
            }

            const ispassword = await bcrypt.hash(Password, 10);
            const newsiteengineer= new siteengineer({engineerName, engineerEmail, engineerSiteLocation, engineerSpecialization, Password:ispassword
            });

            await newsiteengineer.save().then((newsiteengineer) =>{
                return res.status(200).json({message:"Registered Sucessfully",newsiteengineer});
            });
        }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error"});
        }
};


const updatesiteengineer= async(req, res)=>{
    try{
        const Updated= await siteengineer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true});
            
            if(!Updated){
                return res.status(404).json({message:"Id Not Found"});
            }
            else{
                return res.status(200).json(Updated);
            }
    }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};

const deletesiteengineer= async(req, res)=>{
    try{
        const deletesite = await siteengineer.findByIdAndDelete(req.params.id);
        if(!deletesite){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(deletesite);
        }
    }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};


module.exports={getsiteengineer, siteengineerid, createsiteengineer, updatesiteengineer, deletesiteengineer};