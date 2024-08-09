const mongoose=require('mongoose')

const adminSchema=  mongoose.Schema({
    FirstName:{
        type:String,
        require:true,
        lowercase:true,
    },
    LastName:{
        type:String,
        required:true,
        lowercase:true,
    },
    Mobile:{
        type:Number,
        required:true,
        Unique: [true,"This Number is already exists"],
        validate: {
            validator: function(value) {
                return /\d{10}/.test(value);
                },
                message: props => `${props.value} is not a valid phone number!`
            },

    },
    email:{
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
        
    }
});

module.exports=mongoose.model('admin',adminSchema, "admin")