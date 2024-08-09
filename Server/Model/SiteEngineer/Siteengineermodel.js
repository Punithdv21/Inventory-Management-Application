const mongoose=require('mongoose')

const siteengineerSchema=  mongoose.Schema({
    engineerName:{
        type:String,
        require:true,
    },
    // Mobile:{
    //     type:Number,
    //     required:true,
    //     Unique: [true,"This Number is already exists"],
    //     validate: {
    //         validator: function(value) {
    //             return /\d{10}/.test(value);
    //             },
    //             message: props => `${props.value} is not a valid phone number!`
    //         },

    // },
    engineerEmail:{
        type:String,
        required:[true,"Please Enter the email"],
        Unique: [true,"this email is already exists"],
        lowercase:true,
        trim:true,
        validate:{
            validator:function(value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is a not valid Email Address`
 
        },
    },
    Password:{
        type:String,
        required:true,  
    },
    engineerSpecialization:{
        type:String,
        required:true,  
    },
    engineerSiteLocation:{
        type:String,
        required:true,  
    }
});

module.exports=mongoose.model('siteengineer',siteengineerSchema, "siteengineer")