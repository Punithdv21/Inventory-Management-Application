const site= require('../../Model/Site/Sitemodel');


const getsite= async(req, res)=>{
    try{
        const Site= await site.find();
        return res.status(200).json({message:"All Sites",Site});
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Inernal Server Error",Error});
    }
};

const Siteid= async(req, res)=>{
    try{
        const siteid= await site.findById(req.params.id);
        if(!siteid){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(siteid);
        }
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};



const createsite= async(req, res)=>{
    try{
            const {siteName, siteAddress} = req.body
            const newsite= new site({siteName, siteAddress
            });

            await newsite.save().then((newsite) =>{
                return res.status(200).json({message:"Registered Sucessfully",newsite});
            });
        }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error"});
        }
};


const updatesite= async(req, res)=>{
    try{
        const Updated= await site.findByIdAndUpdate(
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

const deletesite= async(req, res)=>{
    try{
        const deletesites = await site.findByIdAndDelete(req.params.id);
        if(!deletesites){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(deletesites);
        }
    }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};


module.exports={getsite, Siteid, createsite, updatesite, deletesite};