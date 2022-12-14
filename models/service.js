const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
     },
    price: {
        type: Number,
        default: 0,
     },
     category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
 })

   serviceSchema.virtual('id').get(function () {
        return this._id.toHexString();
    });
    
    serviceSchema.set('toJSON', {
        virtuals: true,
    });
    
 

exports.Service = mongoose.model('Service',  serviceSchema);
