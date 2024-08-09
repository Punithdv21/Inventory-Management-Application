const express=require('express')
const dotenv=require('dotenv').config();
const cookieparser=require('cookie-parser')
const connectionDB = require('./db');
const adminController=require('./Controller/AdminController/Auth/Auth');
const Admin= require('./Router/Admin/Adminrouter');
const Engineer= require('./Router/SiteEngineer/siteengineerrouter')
const cookieParser = require('cookie-parser');

const app=express();
const port=5000;


connectionDB();

app.use(express.json());

app.use(cookieparser());
adminController.adminn();
app.use(cookieParser());

app.use('/api/admin', Admin);
app.use('/api/engineer', Engineer);


app.listen(port, ()=> console.log("Server Connected Sucessfully",port));