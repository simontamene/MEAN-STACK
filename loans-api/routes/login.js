const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customerModel = require('../models/customers.model');

const router = express.Router();

router.post('/login',async(req,res)=>{
     
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;

   customerModel.findOne({emailAddress:emailAddress}).then((user)=>{
    if(user)
    {
        bcrypt.compare(password,user.password,async(err,result)=>{
           if(err)
           {
       return res.status(400).json("wrong password");
           }
           if(result)
           {
           const payload = {emailAddress:user.emailAddress};
           let token =await jwt.sign(payload,"uzewaweDSRE143ed");
           return res.status(200).json({token:token});

           }
           else
           {
            return res.status(401).json("fuck password");

           }
        })   
    }
    else
    {
       return res.status(500).json("It doesn't exist");
    }
   });
//     if(use.length>=1)  
//     {
//   res.status(200).json("It does exist"); 
//     }
//     else
//     {
//   res.status(500).json("It doesn't exist");
//     } 
})
router.get('/profile',(req,res)=>{
    const users =[
    {name:'Simon',id:03553},
    {name:'Sayat',id:03553},
    {name:'Saron',id:03553}
];
    res.status(200).json(users);
})

module.exports=router;