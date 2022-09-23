var express = require('express');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customerModel = require('../models/customers.model');
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
router.post('/add',async function(req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const dob = req.body.dob;
  const department = req.body.department;
  

  const uem =await customerModel.find({emailAddress:emailAddress});
  if(uem.length>=1){
    return res.status(400).json({message:'the user already exist'});
  }
else{                 
  let hashpassword = await bcrypt.hash(password,10);
let customersObj = new customerModel({
  firstName : firstName,                                                     
  lastName : lastName,
  emailAddress : emailAddress,
  password : hashpassword,
  phoneNumber : phoneNumber,
  dob : dob,
  department:department

})

customersObj.save(async function(err,cu){
  if(err){
   return res.send({status:500,message:'unable to save'});
  }
else{
  const payload = {emailAddress:cu.emailAddress};
  let token = await jwt.sign(payload,"uzewaweDSRE143ed");
  res.send({status:200,token:token});
}
})}
});
/* edit users . */
router.put('/update', function(req, res, next) {
  const userId = req.body.userId;

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;
  
  const phoneNumber = req.body.phoneNumber;
  const dob = req.body.dob;
  const department = req.body.department;

  let customersObj = {
    firstName : firstName,
    lastName : lastName,
    emailAddress : emailAddress,
    phoneNumber : phoneNumber,
    dob : dob,
    department:department
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
