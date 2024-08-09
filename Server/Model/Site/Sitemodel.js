const mongoose=require('mongoose')

const siteSchema=  mongoose.Schema({
    Sitename:{
        type:String,
        require:true,
    },
    Address:{
        type:String,
        required:true,
        
    }
});

module.exports=mongoose.model('site',siteSchema, "site")