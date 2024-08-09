const express= require('express');
const router= express.Router();
const siteengineerController=require('../../Controller/SiteEngineerController/Auth/register');
const labourCrud=require('../../Controller/SiteEngineerController/labourcruds');
const inventoryCrud= require('../../Controller/SiteEngineerController/inventorycruds');
const engineerValidation= require('../../Middleware/SiteEngineer/engineervalidation');
const refreshtoken= require('../../Middleware/SiteEngineer/engineerrefresh');


//FOR ADMIN AUTHROIZATION
router.route('/engineersignin').post(siteengineerController.signin);

router.route('/engineerverify').get(engineerValidation, siteengineerController.currentsiteengineer);

router.route('/signout').post(siteengineerController.signout);

router.route('/engineerrefresh').get(refreshtoken,  siteengineerController.currentsiteengineer);


//FOR Labours CRUDS
router.route('/alllabours').get(engineerValidation, labourCrud.getlabour);

router.route('/labour/:id').get(engineerValidation, labourCrud.labourid);

router.route('/createlabour').post(engineerValidation, labourCrud.createlabour);

router.route('/updatelabour/:id').put(engineerValidation, labourCrud.updatelabour);

router.route('/deletelabour/:id').delete(engineerValidation, labourCrud.deletelabour);


//FOR INVENTORY CRUDS
router.route('/allinventory').get(engineerValidation, inventoryCrud.getinvenrory);

router.route('/inventory/:id').get(engineerValidation, inventoryCrud.inventoryid);

router.route('/createinventory').post(engineerValidation, inventoryCrud.createinventory);

router.route('/updateinventory/:id').put(engineerValidation, inventoryCrud.updateinventory);

router.route('/deleteinventory/:id').delete(engineerValidation, inventoryCrud.deleteinventory);



module.exports=router;