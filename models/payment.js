const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    name :{type:String, required:'Cannot be empty'},
    surname :{type:String, required:'Cannot be empty'},
    email :{type:String, required:'Cannot be empty'},
    phone :{type:String, required:'Cannot be empty'},
    paidPrice:{type:String, required:'Cannot be empty'},
    remainingAmount:{type:String,default:0},
    productId:{type:String, required:'Cannot be empty'},
    date:{type:String, required:'Cannot be empty'}
});
module.exports = mongoose.model('Payment',paymentSchema);