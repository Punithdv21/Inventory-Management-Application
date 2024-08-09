const mongoose=require('mongoose')

const inventorySchema=  mongoose.Schema({
    itemName:{
        type:String,
        require:true,
    },
    itemDesc:{
        type:String,
    },
    itemQuantity:{
        type:Number,
        required:true,  
    },
    itemPrice:{
        type:Number,
        required:true,  
    },
    itemTaxRate:{
        type:Number,
        required:true,  
    },
    from:{
        type:Number,
        required:true,  
    },
    to:{
        type:Number,
        required:true,  
    }
});

module.exports=mongoose.model('inventory',inventorySchema, "inventory")