const labour= require('../../Model/Labour/Labourmodel');


const getlabour= async(req, res)=>{
    try{
        const alllabours= await labour.find();
        return res.status(200).json({message:"All Labours",alllabours});
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Inernal Server Error",Error});
    }
};

const labourid= async(req, res)=>{
    try{
        const laboursid= await labour.findById(req.params.id);
        if(!laboursid){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(laboursid);
        }
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};



const createlabour= async(req, res)=>{
    try{
            const {laborName, laborCount, laborPayment} = req.body

            const newlabour= new labour({laborName, laborCount, laborPayment
            });

            await newlabour.save().then((newlabour) =>{
                return res.status(200).json({message:"Registered Sucessfully",newlabour});
            });
        }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error"});
        }
};


const updatelabour= async(req, res)=>{
    try{
        const Updated= await labour.findByIdAndUpdate(
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

const deletelabour= async(req, res)=>{
    try{
        const deletelabours = await labour.findByIdAndDelete(req.params.id);
        if(!deletelabours){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(deletelabours);
        }
    }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};


module.exports={getlabour, labourid, createlabour, updatelabour, deletelabour};