const mongoose=require('mongoose')

const labourSchema=  mongoose.Schema({
    laborName:{
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
    // engineerEmail:{
    //     type:String,
    //     required:[true,"Please Enter the email"],
    //     Unique: [true,"this email is already exists"],
    //     lowercase:true,
    //     trim:true,
    //     validate:{
    //         validator:function(value){
    //             return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    //         },
    //         message: props => `${props.value} is a not valid Email Address`
 
    //     },
    // },
    laborPayment:{
        type:String,
    },
    laborCount:{
        type:Number,
        required:true,  
    }
});

module.exports=mongoose.model('labour',labourSchema, "labour")