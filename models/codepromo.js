const mongoose = require('mongoose');

const CodepromoSchema = mongoose.Schema({
    codep: {
        type: String,
     },
    isSubmitt: {
        type: Boolean,
        default: false,
     },
     pourcentage: {
        type: Number,
      },
 })

 CodepromoSchema.virtual('id').get(function () {
        return this._id.toHexString();
    });
    
    CodepromoSchema.set('toJSON', {
        virtuals: true,
    });
    
 

exports.CodePromo = mongoose.model('CodePromo',  CodepromoSchema);

