const mongoose = require('mongoose');
const customerSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    emailAddress : String,
    password : String,
    phoneNumber : String,
    dob : String,
    department:String 
});

const customerModel = mongoose.model('Customers',customerSchema);

module.exports = customerModel;