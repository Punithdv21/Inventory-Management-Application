const express=require('express')
const dotenv=require('dotenv').config();
const cookieparser=require('cookie-parser')
const connectionDB = require('./db');
const adminController=require('./Controller/AdminController/Auth/Auth');
// const cors = require('cors');
const Admin= require('./Router/Admin/Adminrouter');
// const Seller=require('./router/Seller/sellerRouter');
// const Employee= require('./router/Employee/employeeRouter');
const cookieParser = require('cookie-parser');
// const path =require("path");
// const Products = require('./router/Product/productRouter');
// const User=require('./router/User/UserRouter');

// const UserProducts=require('./router/User/UserRouter');

const app=express();
const port=5000;


connectionDB();


app.use(express.json());
// app.use(cors({
//     credentials: true, 
//   origin: "http://localhost:3000"
//  }));
// app.use((req, res, next) => {
// res.locals.path = req.path;
// next();
// });
app.use(cookieparser());
adminController.adminn();
app.use(cookieParser());

app.use('/api/admin', Admin);
// app.use("/api/seller",Seller); 
// app.use("/api/products",Products);
// app.use("/api/employee",Employee);
// app.use("/api/user",User);


// app.use(express.static(path.join(__dirname,'Public')));

// app.use(express.static(path.join(__dirname,'product')));

// app.use(express.static(path.join(__dirname,'employee')));


app.listen(port, ()=> console.log("Server Connected Sucessfully",port));