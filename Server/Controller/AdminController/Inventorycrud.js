const inventory= require('../../Model/Inventory/Inventorymodel');


const getinvenrory= async(req, res)=>{
    try{
        const allinventory= await inventory.find();
        return res.status(200).json({message:"All Inventory",allinventory});
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Inernal Server Error",Error});
    }
};

const inventoryid= async(req, res)=>{
    try{
        const inventorysid= await inventory.findById(req.params.id);
        if(!inventorysid){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(inventorysid);
        }
    }
    catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};



const createinventory= async(req, res)=>{
    try{
            const {itemName, itemDesc, itemQuantity, itemPrice, itemTaxRate, from, to} = req.body

            const newinventory= new inventory({itemName, itemDesc, itemQuantity, itemPrice, itemTaxRate, from, to
            });

            await newinventory.save().then((newinventory) =>{
                return res.status(200).json({message:"Registered Sucessfully",newinventory});
            });
        }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error"});
        }
};


const updateinventory= async(req, res)=>{
    try{
        const Updated= await inventory.findByIdAndUpdate(
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

const deleteinventory= async(req, res)=>{
    try{
        const deletedinventory = await inventory.findByIdAndDelete(req.params.id);
        if(!deletedinventory){
            return res.status(404).json({message:"Id Not Found"});
        }else{
            return res.status(200).json(deletedinventory);
        }
    }catch(Error){
        console.log(Error);
        return res.status(500).json({message:"Internal Server Error",Error});
    }
};


module.exports={getinvenrory, inventoryid, createinventory, updateinventory, deleteinventory};