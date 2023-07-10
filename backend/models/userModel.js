const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        require: [true, 'Please enter your name'],

    },
    email: {
        type: 'string',
        unique: true,      
        require: [true, 'Please enter your email'],
    },
    password:{
        type: 'string',
        require: [true, 'Please enter your password'],
    },
    isAdmin:{
        type: 'boolean',
        require:true,
        default: false
    }
},
{
    timestamp:true,
})

module.exports = mongoose.model('User',userSchema);