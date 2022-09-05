const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }], 

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    location: {
        type: String,  
     },

    totalPrice: {
        type: String,
     },
   
    status: {
        type: String,
     },   
     date: {
        type: String, 
    },
})


orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});



exports.Order = mongoose.model('Order',  orderSchema);
 