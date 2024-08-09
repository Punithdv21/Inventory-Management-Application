const express= require('express');
const router= express.Router();
const AdminController=require('../../Controller/AdminController/Auth/Auth');
const adminValidation= require('../../Middleware/Admin/adminvalidation');
const refreshtoken= require('../../Middleware/Admin/adminrefresh');
const adminCrud=require('../../Controller/AdminController/Auth/Register');
// const sellerCrud=require('../../controller/adminController/sellerCrud');
// const employeeCrud=require('../../controller/adminController/employeeCrud');
// const productCrud=require('../../controller/adminController/productsCrud');
// const EDashboard= require('../../controller/adminController/dashBoardadmin');

//FOR ADMIN AUTHROIZATION
router.route('/adminsignin').post(AdminController.signin);

router.route('/adminverify').get(adminValidation, AdminController.currentAdmin);

router.route('/signout').post(AdminController.signout);

router.route('/adminrefresh').get(refreshtoken,  AdminController.currentAdmin);


//FOR ADMIN CRUDS
router.route('/adminsignin').get(adminCrud.getadmin);

router.route('/adminid/:id').get(adminValidation, adminCrud.adminbyid);

router.route('/updateadmin/:id').put(adminValidation, adminCrud.updateadmin);

router.route('/deleteadmin/:id').delete(adminValidation, adminCrud.deleteadmin);

router.route('/adminsignin').get(adminCrud.getadmin);

router.route('/refreshadminid/:id').get(refreshtoken, adminCrud.adminbyid);

router.route('/refreshupdateadmin/:id').put(refreshtoken, adminCrud.updateadmin);

router.route('/refreshdeleteadmin/:id').delete(refreshtoken, adminCrud.deleteadmin);


module.exports=router;