const mongoose=require('mongoose');


const productSchema=new mongoose.Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,

    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
       
    },
    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default:0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }

});

module.exports=mongoose.model('Product',productSchema);