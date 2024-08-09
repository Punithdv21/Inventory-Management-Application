const admin= require('../../../Model/Admin/Adminmodel');


const getadmin= async(req, res)=>{
    try{
        const Admins= await admin.find();
        return res.status(200).json({message:"All Admins",Admins});
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Inernal Server Error",Error});
    }
};

const adminbyid= async(req, res)=>{
    try{
        const adminid= await admin.findById(req.params.id);
        if(!adminid){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(adminid);
        }
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};

const updateadmin= async(req, res)=>{
    try{
        const Updated= await admin.findByIdAndUpdate(
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

const deleteadmin = async(req, res)=>{
    try{
        const deletedadmin = await admin.findByIdAndDelete(req.params.id);
        if(!deletedadmin){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(deletedadmin);
        }
    }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};


module.exports={getadmin, adminbyid, updateadmin, deleteadmin};