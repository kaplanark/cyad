const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title :{type:String, required:'Cannot be empty'},
    description :{type:String, required:'Cannot be empty'},
    image :{type:String, required:'Cannot be empty'},
    date :{type:String,required:'Cannot be empty'},
    totalAmount:{type:String,required:'Cannot be empty'},
    remainingAmount:{type:String,required:'Cannot be empty'}
});

module.exports = mongoose.model('Product',productSchema);