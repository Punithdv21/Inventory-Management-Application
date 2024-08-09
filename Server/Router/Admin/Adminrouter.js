const express= require('express');
const router= express.Router();
const AdminController=require('../../Controller/AdminController/Auth/Auth');
const adminCrud=require('../../Controller/AdminController/Auth/Register');
const siteengineerCrud=require('../../Controller/AdminController/Siteengineercrud');
const siteCrud=require('../../Controller/AdminController/Sitecrud');
const labourCrud=require('../../Controller/AdminController/Labourcrud');
const inventoryCrud= require('../../Controller/AdminController/Inventorycrud');
const adminValidation= require('../../Middleware/Admin/adminvalidation');
const refreshtoken= require('../../Middleware/Admin/adminrefresh');


//FOR ADMIN AUTHROIZATION
router.route('/adminsignin').post(AdminController.signin);

router.route('/adminverify').get(adminValidation, AdminController.currentAdmin);

router.route('/signout').post(AdminController.signout);

router.route('/adminrefresh').get(refreshtoken,  AdminController.currentAdmin);


//FOR ADMIN CRUDS
router.route('/alladmin').get(adminValidation, adminCrud.getadmin);

router.route('/adminid/:id').get(adminValidation, adminCrud.adminbyid);

router.route('/updateadmin/:id').put(adminValidation, adminCrud.updateadmin);

router.route('/deleteadmin/:id').delete(adminValidation, adminCrud.deleteadmin);

router.route('/refreshadminid/:id').get(refreshtoken, adminCrud.adminbyid);

router.route('/refreshupdateadmin/:id').put(refreshtoken, adminCrud.updateadmin);

router.route('/refreshdeleteadmin/:id').delete(refreshtoken, adminCrud.deleteadmin);


//FOR SITEENGINEER CRUDS
router.route('/allsiteengineer').get(adminValidation, siteengineerCrud.getsiteengineer);

router.route('/siteengineer/:id').get(adminValidation, siteengineerCrud.siteengineerid);

router.route('/createsiteengineer').post(adminValidation, siteengineerCrud.createsiteengineer);

router.route('/updatesiteengineer/:id').put(adminValidation, siteengineerCrud.updatesiteengineer);

router.route('/deletesiteengineer/:id').delete(adminValidation, siteengineerCrud.deletesiteengineer);


//FOR SITE CRUDS
router.route('/allsite').get(adminValidation, siteCrud.getsite);

router.route('/site/:id').get(adminValidation, siteCrud.Siteid);

router.route('/createsite').post(adminValidation, siteCrud.createsite);

router.route('/updatesite/:id').put(adminValidation, siteCrud.updatesite);

router.route('/deletesite/:id').delete(adminValidation, siteCrud.deletesite);


//FOR Labours CRUDS
router.route('/alllabours').get(adminValidation, labourCrud.getlabour);

router.route('/labour/:id').get(adminValidation, labourCrud.labourid);

router.route('/createlabour').post(adminValidation, labourCrud.createlabour);

router.route('/updatelabour/:id').put(adminValidation, labourCrud.updatelabour);

router.route('/deletelabour/:id').delete(adminValidation, labourCrud.deletelabour);


//FOR INVENTORY CRUDS
router.route('/allinventory').get(adminValidation, inventoryCrud.getinvenrory);

router.route('/inventory/:id').get(adminValidation, inventoryCrud.inventoryid);

router.route('/createinventory').post(adminValidation, inventoryCrud.createinventory);

router.route('/updateinventory/:id').put(adminValidation, inventoryCrud.updateinventory);

router.route('/deleteinventory/:id').delete(adminValidation, inventoryCrud.deleteinventory);


module.exports=router;