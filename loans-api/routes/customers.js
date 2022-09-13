var express = require('express');
var mongoose = require('mongoose');
const customerModel = require('../models/customers.model')
var router = express.Router();

/* GET all users list. */
router.get('/list', function(req, res, next) {
  customerModel.find(function(err,customersList){
    if(err){
      res.send({status:500,message:'unable to get'});
    }
    else{
      const record = customersList.length;
  res.send({status:200,message:'successfully Executed',sum:record,Result:customersList});
    }
  });
});
/* GET one user list. */
router.get('/view', function(req, res, next) {
  const userId = req.query.userId;
  customerModel.findById(userId,function(err,customerOne){
    if(err){
      res.send({status:500,message:'unable to get'});
    }
    else{
     
  res.send({status:200,message:'successfully Executed',Result:customerOne});
    }
  });
});
/* Add users . */
router.post('/add', function(req, res, next) {
let customersObj = new customerModel({
  firstName : "morisa",
  lastName : "parento",
  emailAddress : "morisa@parento.com",
  phoneNumber : "909090",
  dob : "01-05-2021",
  department:"CRM"
})
customersObj.save(function(err,cu){
  if(err){
    res.send({status:500,message:'unable to save'});
  }
else{
  res.send({status:200,message:'successfully saved',details:cu});
}
})
});
/* edit users . */
router.put('/update', function(req, res, next) {
  const userId = req.query.userId;

  let customersObj = {
    firstName : "Lisa",
    lastName : "Jhonsen",
    emailAddress : "lisa@lisa.com",
    phoneNumber : "909090",
    dob : "01-05-2021",
    department:"CSE"
  }
  
  customerModel.findByIdAndUpdate(userId,customersObj,function(err,customerOne){
    if(err){
      res.send({status:500,message:'unable to get'});
    }
    else{
     
  res.send({status:200,message:'successfully Updated',Result:customerOne});
    }
  });
});
/* delete users . */
router.delete('/delete', function(req, res, next) {
  const userId = req.query.userId;
  customerModel.findByIdAndDelete(userId,function(err,customerOne){
    if(err){
      res.send({status:500,message:'unable to get'});
    }
    else{
     
  res.send({status:200,message:'successfully Deleted',Result:customerOne});
    }
  });

});
/* search users . */
router.get('/search', function(req, res, next) {
  res.send('customers');
});
module.exports = router;
