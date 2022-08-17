const mongoose = require('mongoose');

const collaboraterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    location: { 
        type: String,
    },
    phone: { 
        type: String,
    },

    image:{ 

        type:String,
    }
    
     
})

   collaboraterSchema.virtual('id').get(function () {
        return this._id.toHexString();
    });
    
    collaboraterSchema.set('toJSON', {
        virtuals: true,
    });
    
 

exports.Collaborater = mongoose.model('Collaborater',  collaboraterSchema);
